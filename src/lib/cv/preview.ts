const MIN_SCALE = 0.2;
const GUTTER_PX = 24;
const EPSILON = 0.0005;

const clamp = (value: number, min: number, max: number): number =>
	Math.min(Math.max(value, min), max);

/**
 * Scale the real A4 sheet down for narrow screens without touching its
 * layout: the CSS transform has no effect on `offsetWidth` / `scrollHeight`,
 * so print measurement stays exact.
 */
export class PreviewScaler {
	readonly #viewport: HTMLElement;
	readonly #frame: HTMLElement;
	readonly #page: HTMLElement;
	#observer: ResizeObserver | null = null;
	#frameRequest = 0;
	#lastScale = Number.NaN;

	constructor(viewport: HTMLElement, frame: HTMLElement, page: HTMLElement) {
		this.#viewport = viewport;
		this.#frame = frame;
		this.#page = page;
	}

	start(): () => void {
		if (typeof ResizeObserver === 'undefined') {
			this.update();
			return () => undefined;
		}

		this.#observer = new ResizeObserver(() => this.#schedule());
		this.#observer.observe(this.#viewport);
		this.update();

		return () => {
			this.#observer?.disconnect();
			this.#observer = null;
			cancelAnimationFrame(this.#frameRequest);
			this.#frameRequest = 0;
		};
	}

	/** Coalesce observer bursts into one layout read per frame. */
	#schedule = (): void => {
		if (this.#frameRequest !== 0) return;
		this.#frameRequest = requestAnimationFrame(() => {
			this.#frameRequest = 0;
			this.update();
		});
	};

	update = (): void => {
		const pageWidth = this.#page.offsetWidth;
		const viewportWidth = this.#viewport.clientWidth;
		if (pageWidth === 0 || viewportWidth === 0) return;

		const scale = clamp((viewportWidth - GUTTER_PX * 2) / pageWidth, MIN_SCALE, 1);
		if (Math.abs(scale - this.#lastScale) < EPSILON) return;

		this.#lastScale = scale;
		this.#frame.style.setProperty('--preview-scale', String(scale));
		this.#frame.dataset.previewScale = String(scale);
	};
}
