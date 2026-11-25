import { describe, expect, it } from 'vitest';
import fc from 'fast-check';
import { solveLargestFittingValue } from '../../src/lib/cv/fit.js';

const grid = (min: number, max: number, step: number): number[] => {
	const values: number[] = [];
	for (let value = min; value <= max + 1e-9; value += step) {
		values.push(Math.round(value * 1e6) / 1e6);
	}
	return values;
};

describe('solveLargestFittingValue', () => {
	it('returns max when everything fits', () => {
		const result = solveLargestFittingValue({
			min: 8,
			max: 12,
			step: 0.25,
			fits: () => true
		});
		expect(result).toEqual({ value: 12, feasible: true, measurements: 1 });
	});

	it('returns min and flags infeasibility when nothing fits', () => {
		const result = solveLargestFittingValue({
			min: 8,
			max: 12,
			step: 0.25,
			fits: () => false
		});
		expect(result).toEqual({ value: 8, feasible: false, measurements: 2 });
	});

	it('finds the exact largest value on the grid', () => {
		const result = solveLargestFittingValue({
			min: 8,
			max: 12,
			step: 0.25,
			fits: (value) => value <= 10.75
		});
		expect(result).toEqual({ value: 10.75, feasible: true, measurements: 6 });
	});

	it('supports a single-step range', () => {
		const result = solveLargestFittingValue({
			min: 9,
			max: 9,
			step: 1,
			fits: () => false
		});
		expect(result).toEqual({ value: 9, feasible: false, measurements: 2 });
	});

	it('rejects invalid grids', () => {
		expect(() => solveLargestFittingValue({ min: 9, max: 10, step: 0, fits: () => true })).toThrow(
			/step/
		);
		expect(() => solveLargestFittingValue({ min: 10, max: 9, step: 1, fits: () => true })).toThrow(
			/max/
		);
	});

	it('always returns the maximal feasible grid value (property)', () => {
		fc.assert(
			fc.property(
				fc.integer({ min: 1, max: 60 }),
				fc.integer({ min: 0, max: 60 }),
				fc.constantFrom(0.01, 0.1, 0.25, 0.5, 1),
				(maxIndex, thresholdIndex, step) => {
					const values = grid(0, maxIndex * step, step);
					const threshold = thresholdIndex * step;
					const result = solveLargestFittingValue({
						min: 0,
						max: maxIndex * step,
						step,
						fits: (value) => value <= threshold
					});
					const feasible = values.filter((value) => value <= threshold + 1e-9);
					if (feasible.length === 0) {
						expect(result.feasible).toBe(false);
						expect(result.value).toBe(0);
					} else {
						expect(result.feasible).toBe(true);
						expect(result.value).toBeCloseTo(feasible[feasible.length - 1], 9);
					}
				}
			)
		);
	});

	it('respects the logarithmic measurement bound (property)', () => {
		fc.assert(
			fc.property(fc.integer({ min: 1, max: 200 }), (steps) => {
				const result = solveLargestFittingValue({
					min: 0,
					max: steps,
					step: 1,
					fits: (value) => value <= Math.floor(steps / 2)
				});
				const bound = Math.ceil(Math.log2(steps + 1)) + 2;
				expect(result.measurements).toBeLessThanOrEqual(bound);
			})
		);
	});
});
