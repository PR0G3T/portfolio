import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { inspectPdf } from './pdf.js';

const EXPECTED_TEXT = [
	'Killian OTT',
	'PR0G3T',
	'pr0g3t.com',
	'linkedin.com/in/killian-ott',
	'github.com/PR0G3T',
	'Instructor (Freelance)',
	'Dec 2025 – Present',
	'Sup de Vinci',
	'Team Cardinalis',
	'KÖRBER Supply Chain Software',
	'University of Helsinki',
	'MITx Courses',
	'Lycée Polyvalent Louis Armand',
	'NVIDIA Deep Learning Institute',
	'Hussard Group',
	'Hussard AI',
	'Python Computer Vision',
	'ANSSI Cybersecurity MOOC',
	'TryHackMe Top 1%',
	'Qualcomm',
	'French Sign Languages'
];

const fitState = async (page: import('@playwright/test').Page) =>
	page.evaluate(() => {
		const element = document.querySelector<HTMLElement>('[data-cv-page]');
		if (!element) throw new Error('missing page');
		return {
			state: element.dataset.cvState,
			fontPt: Number(element.dataset.fontPt),
			density: element.dataset.density,
			overflow: element.dataset.overflow,
			fill: Number(element.dataset.fill),
			pageHeight: element.clientHeight,
			pageWidth: element.clientWidth,
			sheetHeight: document.querySelector<HTMLElement>('.cv-sheet')?.scrollHeight ?? 0,
			sheetWidth: document.querySelector<HTMLElement>('.cv-sheet')?.scrollWidth ?? 0,
			sheetClientWidth: document.querySelector<HTMLElement>('.cv-sheet')?.clientWidth ?? 0
		};
	});

test('exports exactly one A4 page containing the full CV', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));

	await page.goto('/cv');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');

	const fit = await fitState(page);
	expect(fit.overflow).toBe('false');
	expect(fit.fontPt).toBeGreaterThanOrEqual(8.5);
	expect(fit.fontPt).toBeLessThanOrEqual(12);
	expect(fit.fill).toBeGreaterThan(0.85);
	expect(fit.pageHeight).toBeCloseTo((297 * 96) / 25.4, 0);
	expect(fit.pageWidth).toBeCloseTo((210 * 96) / 25.4, 0);
	expect(fit.sheetHeight).toBeLessThanOrEqual(fit.pageHeight);
	expect(fit.sheetWidth).toBeLessThanOrEqual(fit.sheetClientWidth + 1);

	const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
	const inspection = await inspectPdf(pdf);

	expect(inspection.pages).toBe(1);
	expect(inspection.width).toBeCloseTo(595.28, 0);
	expect(inspection.height).toBeCloseTo(841.89, 0);
	for (const text of EXPECTED_TEXT) expect(inspection.text).toContain(text);
	expect(errors).toEqual([]);
});

test('prints one page without JavaScript (progressive enhancement)', async ({ browser }) => {
	const context = await browser.newContext({ javaScriptEnabled: false });
	const page = await context.newPage();
	await page.goto('/cv');

	const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
	const inspection = await inspectPdf(pdf);

	expect(inspection.pages).toBe(1);
	for (const text of EXPECTED_TEXT) expect(inspection.text).toContain(text);
	await context.close();
});

test('the density policy hides only the intended content', async ({ page }) => {
	await page.goto('/cv');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');

	const firstHighlight = page.locator('.resume .highlight').first();
	await expect(firstHighlight).toBeVisible();

	await page.evaluate(() => {
		document.querySelector<HTMLElement>('[data-cv-page]')!.dataset.density = 'compact';
	});
	await expect(firstHighlight).toBeHidden();
	await expect(page.locator('.resume .summary')).toBeVisible();

	await page.evaluate(() => {
		document.querySelector<HTMLElement>('[data-cv-page]')!.dataset.density = 'minimal';
	});
	await expect(page.locator('.resume .summary')).toBeHidden();
});

test('scales the A4 preview on mobile without horizontal page overflow', async ({ page }) => {
	const errors: string[] = [];
	page.on('pageerror', (error) => errors.push(error.message));
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/cv');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');

	const metrics = await page.evaluate(() => ({
		documentWidth: document.documentElement.scrollWidth,
		viewportWidth: window.innerWidth,
		scale: Number(document.querySelector<HTMLElement>('.cv-frame')?.dataset.previewScale)
	}));

	expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
	expect(metrics.scale).toBeGreaterThan(0.2);
	expect(metrics.scale).toBeLessThan(1);

	await page.setViewportSize({ width: 1200, height: 900 });
	await expect
		.poll(() =>
			page.evaluate(() =>
				Number(document.querySelector<HTMLElement>('.cv-frame')?.dataset.previewScale)
			)
		)
		.toBe(1);

	const pdf = await page.pdf({ preferCSSPageSize: true, printBackground: true });
	expect((await inspectPdf(pdf)).pages).toBe(1);
	expect(errors).toEqual([]);
});

test('the homepage download button serves the localized one-page PDF', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('[data-locale-ready="true"]')).toBeVisible();
	const download = page.locator('a.floating-download');
	await expect(download).toHaveAttribute('href', /\/CV\.pdf$/);

	const [english] = await Promise.all([page.waitForEvent('download'), download.click()]);
	expect(english.suggestedFilename()).toBe('Killian-OTT-CV-EN.pdf');
	const englishPath = await english.path();
	expect(englishPath).not.toBeNull();
	const englishPdf = await inspectPdf(readFileSync(englishPath!));
	expect(englishPdf.pages).toBe(1);
	expect(englishPdf.text).toContain('Hussard Group');
	expect(englishPdf.text).toContain('French Sign Languages');

	await page.getByRole('button', { name: 'FR' }).click();
	await expect(download).toHaveAttribute('href', /\/CV-fr\.pdf$/);
	const [french] = await Promise.all([page.waitForEvent('download'), download.click()]);
	expect(french.suggestedFilename()).toBe('Killian-OTT-CV-FR.pdf');
	const frenchPath = await french.path();
	expect(frenchPath).not.toBeNull();
	const frenchPdf = await inspectPdf(readFileSync(frenchPath!));
	expect(frenchPdf.pages).toBe(1);
	expect(frenchPdf.text).toContain('EXPÉRIENCE');
	expect(frenchPdf.text).toContain('Président');
	expect(frenchPdf.text).toContain('Langue des signes française');
});

test('print media hides the toolbar and keeps the sheet visible', async ({ page }) => {
	await page.goto('/cv');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');
	await expect(page.locator('.cv-toolbar')).toBeVisible();

	await page.emulateMedia({ media: 'print' });
	await expect(page.locator('.cv-toolbar')).toBeHidden();
	await expect(page.locator('[data-cv-page]')).toBeVisible();
});

test('sitemap and robots expose the canonical production URLs', async ({ request }) => {
	const sitemap = await request.get('/sitemap.xml');
	expect(sitemap.status()).toBe(200);
	const sitemapBody = await sitemap.text();
	expect(sitemapBody).toContain('<loc>https://pr0g3t.com/</loc>');
	expect(sitemapBody).not.toContain('/cv');

	const robots = await request.get('/robots.txt');
	expect(robots.status()).toBe(200);
	expect(await robots.text()).toContain('Sitemap: https://pr0g3t.com/sitemap.xml');
});

test('the language selector switches the page, URL and storage', async ({ page }) => {
	await page.setViewportSize({ width: 1440, height: 900 });
	await page.goto('/');
	await expect(page.locator('[data-locale-ready="true"]')).toBeVisible();
	await expect(page.locator('#experience-title')).toHaveText('Experience');
	await expect(page.locator('html')).toHaveAttribute('lang', 'en');

	const selector = page.locator('.locale-switch');
	await expect(selector).toBeVisible();
	const box = await selector.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.x + box!.width).toBeGreaterThan(1440 - 48);
	expect(box!.y + box!.height).toBeGreaterThan(900 - 48);

	await page.getByRole('button', { name: 'FR' }).click();
	await expect(page.locator('#experience-title')).toHaveText('Expérience');
	await expect(page.locator('#education-title')).toHaveText('Formation');
	await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
	await expect(page).toHaveURL(/\?lang=fr$/);
	expect(await page.evaluate(() => localStorage.getItem('cv-locale'))).toBe('fr');

	await page.reload();
	await expect(page.locator('#experience-title')).toHaveText('Expérience');
	await expect(page.locator('html')).toHaveAttribute('lang', 'fr');

	await page.getByRole('button', { name: 'EN' }).click();
	await expect(page.locator('#experience-title')).toHaveText('Experience');
	await expect(page).not.toHaveURL(/lang=/);
	expect(await page.evaluate(() => localStorage.getItem('cv-locale'))).toBe('en');
});

test('the French print route exports one page with French content', async ({ page }) => {
	await page.goto('/cv/?lang=fr');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');
	await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
	const pdfLink = page.getByRole('link', { name: 'Enregistrer en PDF' });
	await expect(pdfLink).toBeVisible();
	await expect(pdfLink).toHaveAttribute('href', /\/CV-fr\.pdf$/);
	await expect(page.getByText('A4 · 1 page')).toBeVisible();

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
	for (const text of [
		'EXPÉRIENCE',
		'FORMATION',
		'COMPÉTENCES',
		'LANGUES',
		'Formateur (indépendant)',
		'Président',
		'Mathématiques et ingénierie des données',
		'Mathématiques et informatique',
		'5 certificats',
		'Langue des signes française'
	]) {
		expect(inspection.text).toContain(text);
	}
});

test('the print view is local, indexed correctly and uses the bundled font', async ({ page }) => {
	const external: string[] = [];
	page.on('request', (request) => {
		const host = new URL(request.url()).hostname;
		if (host !== '127.0.0.1' && host !== 'localhost' && host !== '::1')
			external.push(request.url());
	});

	await page.goto('/cv');
	await expect(page.locator('[data-cv-page]')).toHaveAttribute('data-cv-state', 'ready');

	const details = await page.evaluate(() => ({
		robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
		font: document.fonts.check('16px "Inter Display"'),
		title: document.title
	}));

	expect(details.robots).toContain('noindex');
	expect(details.font).toBe(true);
	expect(details.title).toContain('CV');
	expect(external).toEqual([]);
});
