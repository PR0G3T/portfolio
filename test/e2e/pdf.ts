import { PDFDocument } from 'pdf-lib';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';

export interface PdfInspection {
	pages: number;
	width: number;
	height: number;
	text: string;
}

export const inspectPdf = async (data: Buffer): Promise<PdfInspection> => {
	const document = await PDFDocument.load(data);
	const pages = document.getPages();
	const [first] = pages;

	const pdf = await getDocument({
		data: new Uint8Array(data),
		useWorkerFetch: false,
		useSystemFonts: false
	}).promise;

	let text = '';
	for (let index = 1; index <= pdf.numPages; index += 1) {
		const page = await pdf.getPage(index);
		const content = await page.getTextContent();
		text += content.items
			.map((item) => ('str' in item ? item.str : ''))
			.join(' ')
			.concat('\n');
	}

	return {
		pages: document.getPageCount(),
		width: first.getWidth(),
		height: first.getHeight(),
		text: text.replace(/\s+/g, ' ').trim()
	};
};
