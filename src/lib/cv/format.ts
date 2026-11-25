/** Turn a profile URL into a compact, human-readable label for print. */
export const formatLinkLabel = (href: string): string => {
	try {
		const url = new URL(href);
		if (url.protocol !== 'https:' && url.protocol !== 'http:') return href;
		const host = url.host.replace(/^www\./i, '');
		const path = url.pathname.replace(/\/+$/, '');
		return `${host}${path}`;
	} catch {
		return href;
	}
};

/** Use an en dash for date ranges, the typographic convention on CVs. */
export const formatPeriod = (value: string): string => value.trim().replace(/\s+[-–—]\s+/g, ' – ');

const PHONE_DIGITS = /\D/g;

/** Human-readable French phone number, grouped by two digits. */
export const formatPhone = (value: string): string =>
	value
		.replace(PHONE_DIGITS, '')
		.replace(/(\d{2})(?=\d)/g, '$1 ')
		.trim();

/** International dialing URI for a French phone number. */
export const phoneHref = (value: string): string => {
	const digits = value.replace(PHONE_DIGITS, '');
	if (digits.startsWith('0')) return `tel:+33${digits.slice(1)}`;
	return `tel:${value.trim().startsWith('+') ? '+' : ''}${digits}`;
};
