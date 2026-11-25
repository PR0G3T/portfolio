import { expect, test } from '@playwright/test';
import { inspectPdf } from '../e2e/pdf.js';

test('serves clean URLs, canonical metadata and the production CV', async ({ page, request }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	const redirect = await request.get('/cv', { maxRedirects: 0 });
	expect(redirect.status()).toBe(308);
	expect(redirect.headers()['location']).toContain('/cv/');

	const home = await page.goto('/');
	expect(home?.status()).toBe(200);
	await expect(page.locator('h1')).toHaveText('Killian OTT');
	const download = page.locator('a.floating-download');
	await expect(download).toHaveAttribute('href', /\/CV\.pdf$/);
	await expect(page.locator('[data-locale-ready="true"]')).toBeVisible();
	await page.getByRole('button', { name: 'FR' }).click();
	await expect(page.locator('#experience-title')).toHaveText('Expérience');
	await expect(page).toHaveURL(/\?lang=fr$/);
	await expect(download).toHaveAttribute('href', /\/CV-fr\.pdf$/);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://pr0g3t.com/'
	);

	const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
	expect(structuredData).toHaveLength(5);
	for (const block of structuredData) expect(() => JSON.parse(block)).not.toThrow();

	const font = await request.get('/fonts/inter-display/print/InterDisplay-Regular.woff2');
	expect(font.status()).toBe(200);
	expect(font.headers()['content-type']).toContain('font/woff2');

	for (const file of ['/CV.pdf', '/CV-fr.pdf']) {
		const response = await request.get(file);
		expect(response.status()).toBe(200);
		expect(response.headers()['content-type']).toContain('application/pdf');
	}

	const sitemap = await (await request.get('/sitemap.xml')).text();
	expect(sitemap).toContain('<loc>https://pr0g3t.com/</loc>');

	const robots = await (await request.get('/robots.txt')).text();
	expect(robots).toContain('Sitemap: https://pr0g3t.com/sitemap.xml');
	expect(errors).toEqual([]);
});

test('the built print route still exports exactly one A4 page', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));

	await page.goto('/cv/');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready', {
		timeout: 10_000
	});
	const fit = await page.evaluate(() => {
		const element = document.querySelector<HTMLElement>('[data-cv-page]')!;
		return { ...element.dataset };
	});
	expect(fit.overflow).toBe('false');
	expect(Number(fit.fontPt)).toBeGreaterThanOrEqual(8.5);
	expect(Number(fit.fontPt)).toBeLessThanOrEqual(12);

	const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
	const inspection = await inspectPdf(pdf);

	expect(inspection.pages).toBe(1);
	expect(inspection.width).toBeCloseTo(595.28, 0);
	expect(inspection.height).toBeCloseTo(841.89, 0);
	expect(inspection.text).toContain('Killian OTT');
	expect(inspection.text).toContain('Instructor (Freelance)');
	expect(inspection.text).toContain('French Sign Languages');
	expect(errors).toEqual([]);
});

test('the built French print route exports one A4 page', async ({ page }) => {
	await page.goto('/cv/?lang=fr');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready', {
		timeout: 10_000
	});
	await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

	const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
	const inspection = await inspectPdf(pdf);
	expect(inspection.pages).toBe(1);
	expect(inspection.text).toContain('EXPÉRIENCE');
	expect(inspection.text).toContain('Mathématiques et ingénierie des données');
	expect(inspection.text).toContain('Président');
	expect(inspection.text).toContain('5 certificats');
});
