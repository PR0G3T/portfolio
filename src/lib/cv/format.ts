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
