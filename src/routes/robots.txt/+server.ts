import { SITE_URL } from '#lib/site.js';

export const prerender = true;

export const GET = (): Response => {
	const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;

	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=3600'
		}
	});
};
