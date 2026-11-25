import { createServer } from 'node:http';
import { createReadStream, existsSync } from 'node:fs';
import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';

const ROOT = resolve('docs');
const STATIC = resolve('static');
const PORT = 0;

const MIME = {
	'.html': 'text/html; charset=utf-8',
	'.js': 'text/javascript; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.svg': 'image/svg+xml',
	'.webp': 'image/webp',
	'.png': 'image/png',
	'.woff2': 'font/woff2',
	'.pdf': 'application/pdf',
	'.xml': 'application/xml; charset=utf-8',
	'.txt': 'text/plain; charset=utf-8'
};

const server = createServer(async (request, response) => {
	try {
		const url = new URL(request.url ?? '/', 'http://localhost');
		const pathname = decodeURIComponent(url.pathname);
		const file = resolve(ROOT, `.${normalize(pathname)}`);

		if (file !== ROOT && !file.startsWith(ROOT + sep)) {
			response.writeHead(403).end();
			return;
		}

		let target = file;
		if (existsSync(target) && (await stat(target)).isDirectory()) {
			target = join(target, 'index.html');
		}

		if (!existsSync(target)) {
			response.writeHead(404).end('Not found');
			return;
		}

		response.writeHead(200, {
			'content-type': MIME[extname(target)] ?? 'application/octet-stream'
		});
		createReadStream(target).pipe(response);
	} catch {
		response.writeHead(500).end('Internal error');
	}
});

const listen = () =>
	new Promise((resolveListen) => {
		server.listen(PORT, '127.0.0.1', () => resolveListen(server.address().port));
	});

const pdfForLocale = async (browser, baseUrl, locale) => {
	const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
	try {
		await page.goto(`${baseUrl}/cv/?lang=${locale}`, { waitUntil: 'networkidle' });
		await page.waitForSelector('[data-cv-page][data-cv-state="ready"]', { timeout: 15_000 });
		const pdf = await page.pdf({
			preferCSSPageSize: true,
			printBackground: true,
			displayHeaderFooter: false
		});
		const document = await PDFDocument.load(pdf);
		if (document.getPageCount() !== 1) {
			throw new Error(`${locale}: expected 1 page, got ${document.getPageCount()}`);
		}
		return pdf;
	} finally {
		await page.close();
	}
};

const run = async () => {
	if (!existsSync(ROOT)) throw new Error('docs/ is missing; run the build first');
	const port = await listen();
	const browser = await chromium.launch();
	await mkdir(STATIC, { recursive: true });

	try {
		for (const [locale, filename] of [
			['en', 'CV.pdf'],
			['fr', 'CV-fr.pdf']
		]) {
			const pdf = await pdfForLocale(browser, `http://127.0.0.1:${port}`, locale);
			const output = join(ROOT, filename);
			await writeFile(output, pdf);
			await copyFile(output, join(STATIC, filename));
			console.log(`[pdf] ${filename} (${pdf.byteLength} bytes)`);
		}
	} finally {
		await browser.close();
		server.close();
	}
};

run().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
