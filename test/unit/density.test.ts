import { describe, expect, it } from 'vitest';
import { DENSITY_FEATURES, DENSITY_LEVELS, fitAcrossDensities } from '../../src/lib/cv/density.js';

describe('density policy', () => {
	it('gets progressively leaner', () => {
		expect(DENSITY_FEATURES.full).toEqual({
			summary: true,
			highlights: true,
			projectDescriptions: true,
			projects: true
		});
		expect(DENSITY_FEATURES.compact.highlights).toBe(false);
		expect(DENSITY_FEATURES.minimal.summary).toBe(false);
		expect(DENSITY_LEVELS).toEqual(['full', 'compact', 'minimal']);
	});

	it('has an entry for every declared level', () => {
		for (const level of DENSITY_LEVELS) expect(DENSITY_FEATURES[level]).toBeDefined();
	});
});

describe('fitAcrossDensities', () => {
	it('stops at the richest feasible level', () => {
		const result = fitAcrossDensities({
			min: 8,
			max: 12,
			step: 0.5,
			fits: (density, value) => density !== 'full' && value <= 10
		});
		expect(result.density).toBe('compact');
		expect(result.value).toBe(10);
		expect(result.attempts.map((attempt) => attempt.density)).toEqual(['full', 'compact']);
	});

	it('falls back to the leanest level when nothing fits', () => {
		const result = fitAcrossDensities({
			min: 8,
			max: 12,
			step: 0.5,
			fits: () => false
		});
		expect(result.density).toBe('minimal');
		expect(result.feasible).toBe(false);
		expect(result.attempts).toHaveLength(3);
	});

	it('rejects an empty level list', () => {
		expect(() =>
			fitAcrossDensities({ min: 8, max: 12, step: 1, levels: [], fits: () => true })
		).toThrow(/levels/);
	});
});
