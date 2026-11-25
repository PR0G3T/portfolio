export interface DiscreteFitOptions {
	min: number;
	max: number;
	step: number;
	/** Must be monotone: once false for a size, false for every larger size. */
	fits: (value: number) => boolean;
}

export interface DiscreteFitResult {
	value: number;
	feasible: boolean;
	measurements: number;
}

const roundTo = (value: number, decimals: number): number => {
	const factor = 10 ** decimals;
	return Math.round(value * factor) / factor;
};

/**
 * Find the largest value on a discrete grid that satisfies a monotone
 * predicate. The invariant is `fits(lo) && !fits(hi)`, so each probe halves
 * the remaining range: ceil(log2(steps + 1)) measurements in the worst case.
 */
export const solveLargestFittingValue = ({
	min,
	max,
	step,
	fits
}: DiscreteFitOptions): DiscreteFitResult => {
	if (!(step > 0)) throw new Error('step must be positive');
	if (!(max >= min)) throw new Error('max must be greater than or equal to min');

	const steps = Math.floor((max - min) / step + 1e-9);
	const at = (index: number): number => roundTo(min + index * step, 6);
	let measurements = 0;

	const probe = (index: number): boolean => {
		measurements += 1;
		return fits(at(index));
	};

	const maxValue = at(steps);
	if (probe(steps)) return { value: maxValue, feasible: true, measurements };

	const minValue = at(0);
	if (!probe(0)) return { value: minValue, feasible: false, measurements };

	let lo = 0;
	let hi = steps;
	while (hi - lo > 1) {
		const mid = Math.floor((lo + hi) / 2);
		if (probe(mid)) lo = mid;
		else hi = mid;
	}

	return { value: at(lo), feasible: true, measurements };
};
