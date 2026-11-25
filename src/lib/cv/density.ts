import { solveLargestFittingValue, type DiscreteFitResult } from './fit.js';

export const DENSITY_LEVELS = ['full', 'compact', 'minimal'] as const;

export type Density = (typeof DENSITY_LEVELS)[number];

export interface DensityFeatures {
	summary: boolean;
	highlights: boolean;
	projectDescriptions: boolean;
	projects: boolean;
}

/** Progressive content shedding, never visual tricks: each level is a real document. */
export const DENSITY_FEATURES: Readonly<Record<Density, DensityFeatures>> = {
	full: {
		summary: true,
		highlights: true,
		projectDescriptions: true,
		projects: true
	},
	compact: {
		summary: true,
		highlights: false,
		projectDescriptions: false,
		projects: true
	},
	minimal: {
		summary: false,
		highlights: false,
		projectDescriptions: false,
		projects: false
	}
};

export interface DensityFitOptions {
	min: number;
	max: number;
	step: number;
	levels?: readonly Density[];
	fits: (density: Density, value: number) => boolean;
}

export interface DensityFitAttempt extends DiscreteFitResult {
	density: Density;
}

export interface DensityFitResult extends DensityFitAttempt {
	attempts: DensityFitAttempt[];
}

/**
 * Prefer the richest document, then shrink type, then shed optional content.
 * This is a lexicographic optimisation: content richness > type size.
 */
export const fitAcrossDensities = ({
	min,
	max,
	step,
	levels = DENSITY_LEVELS,
	fits
}: DensityFitOptions): DensityFitResult => {
	if (levels.length === 0) throw new Error('levels must not be empty');

	const attempts: DensityFitAttempt[] = [];
	for (const density of levels) {
		const result = solveLargestFittingValue({
			min,
			max,
			step,
			fits: (value) => fits(density, value)
		});
		const attempt = { density, ...result };
		attempts.push(attempt);
		if (result.feasible) return { ...attempt, attempts };
	}

	const last = attempts[attempts.length - 1];
	return { ...last, attempts };
};
