// Small postbuild script to inject ISO lastmod in static sitemap
// Replaces the placeholder {LASTMOD_ISO} with current date in ISO 8601 (YYYY-MM-DD)

const fs = require('fs');
const path = require('path');

try {
	const sitemapPath = path.join(__dirname, '..', 'static', 'sitemap.xml');
	let xml = fs.readFileSync(sitemapPath, 'utf8');
	const today = new Date().toISOString().slice(0, 10);
	xml = xml.replace('{LASTMOD_ISO}', today);
	fs.writeFileSync(sitemapPath, xml, 'utf8');
	console.log(`[sitemap] lastmod updated to ${today}`);
} catch (err) {
	console.error('[sitemap] failed to update lastmod:', err?.message || err);
	process.exit(0);
}


