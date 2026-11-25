import {
	DENSITY_LEVELS,
	fitAcrossDensities,
	type Density,
	type DensityFitResult
} from './density.js';

export interface FitOptions {
	minPt?: number;
	maxPt?: number;
	stepPt?: number;
	tolerancePx?: number;
	safetyPx?: number;
}

export interface FitResult {
	density: Density;
	fontPt: number;
	feasible: boolean;
	measurements: number;
	fillRatio: number;
	contentPx: number;
	availablePx: number;
	attempts: DensityFitResult['attempts'];
}

const DEFAULTS = {
	minPt: 8.5,
	maxPt: 12,
	stepPt: 0.25,
	tolerancePx: 0.5,
	safetyPx: 8
} as const;

const nextFrame = (): Promise<void> =>
	new Promise((resolve) => {
		requestAnimationFrame(() => resolve());
	});

const waitForFonts = async (): Promise<void> => {
	if (!('fonts' in document)) return;
	await document.fonts.load('16px "Inter Print"').catch(() => undefined);
	await document.fonts.ready.catch(() => undefined);
};

/**
 * DOM adapter around the pure fit maths. Density is expressed as a data
 * attribute so switching it is synchronous and never triggers a Svelte
 * re-render (or an animation frame) inside the measurement loop.
 */
export class ResumeFitController {
	readonly #page: HTMLElement;
	readonly #sheet: HTMLElement;
	readonly #minPt: number;
	readonly #maxPt: number;
	readonly #stepPt: number;
	readonly #tolerancePx: number;
	readonly #safetyPx: number;

	constructor(page: HTMLElement, sheet: HTMLElement, options: FitOptions = {}) {
		this.#page = page;
		this.#sheet = sheet;
		this.#minPt = options.minPt ?? DEFAULTS.minPt;
		this.#maxPt = options.maxPt ?? DEFAULTS.maxPt;
		this.#stepPt = options.stepPt ?? DEFAULTS.stepPt;
		this.#tolerancePx = options.tolerancePx ?? DEFAULTS.tolerancePx;
		this.#safetyPx = options.safetyPx ?? DEFAULTS.safetyPx;
	}

	async run(): Promise<FitResult> {
		await waitForFonts();
		await nextFrame();

		const availablePx = this.#availableHeight();
		const limitPx = availablePx - this.#safetyPx;
		const fit = fitAcrossDensities({
			min: this.#minPt,
			max: this.#maxPt,
			step: this.#stepPt,
			levels: DENSITY_LEVELS,
			fits: (density, fontPt) => {
				this.#apply(density, fontPt);
				return this.#contentHeight() <= limitPx + this.#tolerancePx;
			}
		});

		this.#apply(fit.density, fit.value);
		let contentPx = this.#contentHeight();
		let fontPt = fit.value;

		// Sub-pixel rounding can turn a solved size into a one-pixel overflow.
		while (contentPx > limitPx + this.#tolerancePx && fontPt - this.#stepPt >= this.#minPt - 1e-9) {
			fontPt -= this.#stepPt;
			this.#apply(fit.density, fontPt);
			contentPx = this.#contentHeight();
		}

		const feasible = contentPx <= limitPx + this.#tolerancePx;
		const result: FitResult = {
			density: fit.density,
			fontPt,
			feasible,
			measurements: fit.attempts.reduce((total, attempt) => total + attempt.measurements, 0),
			fillRatio: availablePx > 0 ? contentPx / availablePx : 0,
			contentPx,
			availablePx,
			attempts: fit.attempts
		};
		this.#publish(result);
		return result;
	}

	#apply(density: Density, fontPt: number): void {
		this.#page.dataset.density = density;
		this.#page.style.setProperty('--resume-font-size', `${fontPt}pt`);
	}

	#contentHeight(): number {
		return this.#sheet.scrollHeight;
	}

	#availableHeight(): number {
		const style = getComputedStyle(this.#page);
		const padding = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
		return this.#page.clientHeight - padding;
	}

	#publish(result: FitResult): void {
		this.#page.dataset.cvState = 'ready';
		this.#page.dataset.fontPt = result.fontPt.toFixed(2);
		this.#page.dataset.density = result.density;
		this.#page.dataset.overflow = result.feasible ? 'false' : 'true';
		this.#page.dataset.fill = result.fillRatio.toFixed(4);
	}
}
