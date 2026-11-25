const MONTHS: Readonly<Record<string, number>> = {
	jan: 0,
	january: 0,
	janv: 0,
	janvier: 0,
	feb: 1,
	february: 1,
	févr: 1,
	fevr: 1,
	février: 1,
	fevrier: 1,
	mar: 2,
	march: 2,
	mars: 2,
	apr: 3,
	april: 3,
	avr: 3,
	avril: 3,
	may: 4,
	mai: 4,
	jun: 5,
	june: 5,
	juin: 5,
	jul: 6,
	july: 6,
	juil: 6,
	juillet: 6,
	aug: 7,
	august: 7,
	août: 7,
	aout: 7,
	sep: 8,
	sept: 8,
	september: 8,
	septembre: 8,
	oct: 9,
	october: 9,
	octobre: 9,
	nov: 10,
	november: 10,
	novembre: 10,
	dec: 11,
	december: 11,
	déc: 11,
	decembre: 11,
	décembre: 11
};

const MONTH_YEAR = /([A-Za-zÀ-ÖØ-öø-ÿ]{3,12})\.?\s+(\d{4})/g;
const PRESENT = /\b(present|current|now|présent|actuel)\b|aujourd['’]hui/i;

export interface Recency {
	start: number;
	end: number;
}

const normalizeMonth = (value: string): string => value.toLowerCase().replace(/\./g, '').trim();

/**
 * Convert a human period ("Dec 2025 - Present", "déc. 2025 - aujourd'hui")
 * into a comparable month index. Unparseable periods sort after parsed ones
 * only when they explicitly say "Present"; otherwise they sort last.
 */
export const parsePeriod = (period: string): Recency => {
	const text = period.trim();
	const points = [...text.matchAll(MONTH_YEAR)].flatMap((match) => {
		const month = MONTHS[normalizeMonth(match[1])];
		return month === undefined ? [] : [Number(match[2]) * 12 + month];
	});

	if (points.length === 0) {
		return { start: 0, end: PRESENT.test(text) ? Number.POSITIVE_INFINITY : 0 };
	}

	return {
		start: points[0],
		end: PRESENT.test(text) ? Number.POSITIVE_INFINITY : points[points.length - 1]
	};
};

const descending = (a: number, b: number): number => (a === b ? 0 : a > b ? -1 : 1);

/** Most recent first: open-ended roles, then latest end date, then latest start. */
export const compareByRecency = (a: string, b: string): number => {
	const left = parsePeriod(a);
	const right = parsePeriod(b);
	return descending(left.end, right.end) || descending(left.start, right.start);
};

const YEAR = /\b(\d{4})\b/;

/** Bare-year values such as "2025" or "Mar 2025" sort by their year. */
export const parseYear = (value?: string): number => {
	const match = value?.match(YEAR);
	return match ? Number(match[1]) * 12 : 0;
};
