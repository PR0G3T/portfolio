import { describe, expect, it } from 'vitest';
import { formatLinkLabel, formatPhone, phoneHref } from '../../src/lib/cv/format.js';

describe('formatLinkLabel', () => {
	it.each([
		['https://www.linkedin.com/in/killian-ott/', 'linkedin.com/in/killian-ott'],
		['https://github.com/PR0G3T', 'github.com/PR0G3T'],
		['https://orcid.org/0009-0001-2059-565X', 'orcid.org/0009-0001-2059-565X'],
		['https://pr0g3t.com/', 'pr0g3t.com']
	])('turns %s into %s', (href, expected) => {
		expect(formatLinkLabel(href)).toBe(expected);
	});

	it('formats a French phone number', () => {
		expect(formatPhone('0783637398')).toBe('07 83 63 73 98');
		expect(phoneHref('0783637398')).toBe('tel:+33783637398');
		expect(phoneHref('123456')).toBe('tel:123456');
		expect(phoneHref('+33783637398')).toBe('tel:+33783637398');
	});

	it('returns non-HTTP and malformed values unchanged', () => {
		expect(formatLinkLabel('mailto:test@example.com')).toBe('mailto:test@example.com');
		expect(formatLinkLabel('not a url')).toBe('not a url');
	});
});
