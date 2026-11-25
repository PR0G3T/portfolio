import { describe, expect, it } from 'vitest';
import { compareByRecency, parsePeriod, parseYear } from '../../src/lib/cv/period.js';

describe('parsePeriod', () => {
	it('parses an explicit range', () => {
		expect(parsePeriod('May 2024 - Jul 2024')).toEqual({
			start: 2024 * 12 + 4,
			end: 2024 * 12 + 6
		});
	});

	it('treats Present as an open-ended range', () => {
		expect(parsePeriod('Dec 2025 - Present')).toEqual({
			start: 2025 * 12 + 11,
			end: Number.POSITIVE_INFINITY
		});
	});

	it('parses a single date as a point in time', () => {
		expect(parsePeriod('Apr 2025')).toEqual({
			start: 2025 * 12 + 3,
			end: 2025 * 12 + 3
		});
	});

	it('is case insensitive and accepts dotted months', () => {
		expect(parsePeriod('Sep. 2021 – Jul. 2023')).toEqual({
			start: 2021 * 12 + 8,
			end: 2023 * 12 + 6
		});
	});

	it('parses French month names and aujourd’hui', () => {
		expect(parsePeriod('déc. 2025 - aujourd’hui')).toEqual({
			start: 2025 * 12 + 11,
			end: Number.POSITIVE_INFINITY
		});
		expect(parsePeriod('sept. 2021 - juil. 2023')).toEqual({
			start: 2021 * 12 + 8,
			end: 2023 * 12 + 6
		});
	});

	it('sorts localized French periods chronologically', () => {
		expect(
			[
				'mai 2019 - juin 2021',
				'déc. 2025 - aujourd’hui',
				'sept. 2017 - mai 2019',
				'mai 2024 - juil. 2024'
			].sort(compareByRecency)
		).toEqual([
			'déc. 2025 - aujourd’hui',
			'mai 2024 - juil. 2024',
			'mai 2019 - juin 2021',
			'sept. 2017 - mai 2019'
		]);
	});

	it('returns zero for an unparseable period', () => {
		expect(parsePeriod('unknown')).toEqual({ start: 0, end: 0 });
	});

	it('ignores unknown month names', () => {
		expect(parsePeriod('Foo 2025')).toEqual({ start: 0, end: 0 });
	});

	it('keeps an unparseable Present open-ended', () => {
		expect(parsePeriod('Present')).toEqual({
			start: 0,
			end: Number.POSITIVE_INFINITY
		});
	});
});

describe('parseYear', () => {
	it('extracts a bare year', () => {
		expect(parseYear('2025')).toBe(2025 * 12);
	});

	it('extracts a year from a month', () => {
		expect(parseYear('Mar 2025')).toBe(2025 * 12);
	});

	it('returns zero without a year', () => {
		expect(parseYear(undefined)).toBe(0);
		expect(parseYear('soon')).toBe(0);
	});
});

describe('compareByRecency', () => {
	it('orders open-ended roles before fixed ones', () => {
		expect(compareByRecency('Jul 2020 - Present', 'Jul 2024 - Aug 2024')).toBeLessThan(0);
	});

	it('orders by end date then start date', () => {
		expect(compareByRecency('May 2024 - Jul 2024', 'May 2019 - Jun 2021')).toBeLessThan(0);
		expect(compareByRecency('Jan 2024 - Jun 2024', 'Mar 2024 - Jun 2024')).toBeGreaterThan(0);
	});

	it('returns zero for equivalent periods', () => {
		expect(compareByRecency('2025', '2025')).toBe(0);
	});
});
