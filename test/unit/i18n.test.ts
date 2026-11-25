import { describe, expect, it } from 'vitest';
import cv from '../../src/lib/data/cv.js';
import { buildResumeModel } from '../../src/lib/cv/model.js';
import { CV_FR } from '../../src/lib/i18n/cv-fr.js';
import { getTranslatableCvStrings, localizeCv } from '../../src/lib/i18n/localize.js';
import { LOCALES, UI } from '../../src/lib/i18n/ui.js';
import { bareCv, minimalCv } from '../fixtures/cv.js';

describe('UI dictionary', () => {
	it('has the same keys in every locale', () => {
		const reference = Object.keys(UI.en).sort();
		for (const locale of LOCALES) expect(Object.keys(UI[locale]).sort()).toEqual(reference);
	});

	it('has no empty labels', () => {
		for (const locale of LOCALES) {
			for (const [key, value] of Object.entries(UI[locale])) {
				expect(typeof value === 'function' ? value(1) : value, `${locale}.${key}`).toBeTruthy();
			}
		}
	});

	it('pluralizes certificates in both languages', () => {
		expect(UI.en.certificateCount(1)).toBe('1 certificate');
		expect(UI.en.certificateCount(3)).toBe('3 certificates');
		expect(UI.fr.certificateCount(1)).toBe('1 certificat');
		expect(UI.fr.certificateCount(3)).toBe('3 certificats');
	});

	it('formats the update line', () => {
		expect(UI.en.lastUpdated(2026)).toBe('Last updated 2026');
		expect(UI.fr.lastUpdated(2026)).toBe('Dernière mise à jour 2026');
	});
});

describe('French CV translation', () => {
	it('contains every translatable production string', () => {
		const missing = getTranslatableCvStrings(cv).filter((value) => !CV_FR[value]);
		expect(missing).toEqual([]);
	});

	it('returns the exact source object for English', () => {
		expect(localizeCv(cv, 'en')).toBe(cv);
	});

	it('translates every user-visible content area', () => {
		const french = localizeCv(cv, 'fr');
		expect(french.summary).toContain('potentiel humain');
		expect(french.skills).toContain('Intelligence artificielle (IA)');
		expect(french.experience.map((item) => item.role)).toContain('Formateur (indépendant)');
		expect(french.experience.map((item) => item.period)).toContain('déc. 2025 – aujourd’hui');
		expect(french.experience.map((item) => item.location)).toContain('France - À distance');
		expect(french.experience.flatMap((item) => item.items).join(' ')).toContain(
			'Établissement d’enseignement supérieur'
		);
		expect(french.education?.map((item) => item.degree)).toContain('Mathématiques et informatique');
		const helsinki = french.education?.find((item) => item.school === 'University of Helsinki');
		expect(helsinki?.details).toContain('université ouverte');
		const mitx = french.education?.find((item) => item.school === 'MITx Courses');
		expect(mitx?.credentials?.[0].label).toBe('Algèbre linéaire et systèmes N×N');
		const nvidia = french.certifications?.find((item) => item.name === 'NVIDIA Academy');
		expect(nvidia?.subCertifications?.[0].name).toBe('Introduction aux réseaux');
		expect(french.languages?.map((item) => item.language)).toContain('Français');
		expect(french.languages?.map((item) => item.proficiency)).toContain(
			'Langue maternelle ou bilingue'
		);
	});

	it('leaves proper nouns, URLs and identifiers intact', () => {
		const french = localizeCv(cv, 'fr');
		expect(french.name).toBe(cv.name);
		expect(french.title).toBe(cv.title);
		expect(french.socials).toEqual(cv.socials);
		expect(french.experience.map((item) => item.company)).toEqual(
			cv.experience.map((item) => item.company)
		);
		expect(french.education?.map((item) => item.school)).toEqual(
			cv.education?.map((item) => item.school)
		);
		expect(french.certifications?.[0].issuer).toBe(cv.certifications?.[0].issuer);
		expect(french.certifications?.[0].subCertifications?.[0].link).toBe(
			cv.certifications?.[0].subCertifications?.[0].link
		);
	});

	it('handles optional collections and projects', () => {
		const french = localizeCv(bareCv, 'fr');
		expect(french.projects?.[0]).toEqual({ name: 'A-0', description: '' });
		expect(french.projects?.[1].description).toBe('English-like programming language.');
		expect(french.education).toBeUndefined();
		expect(french.languages).toBeUndefined();
		expect(french.certifications?.[0].year).toBeUndefined();

		const lean = structuredClone(minimalCv);
		delete lean.education;
		delete lean.certifications;
		delete lean.languages;
		delete lean.projects;
		expect(localizeCv(lean, 'fr').education).toBeUndefined();
	});

	it('translates a top-level location and tolerates missing details', () => {
		const located = structuredClone(minimalCv);
		located.location = 'Lyon';
		delete located.education![0].details;
		const french = localizeCv(located, 'fr');
		expect(french.location).toBe('Lyon');
		expect(french.education?.[0].details).toBeUndefined();
	});

	it('omits a falsey project description during projection', () => {
		const project = structuredClone(bareCv);
		project.projects![0].description = '';
		expect(localizeCv(project, 'fr').projects?.[0].description).toBe('');
	});

	it('collects project strings for completeness checks', () => {
		const strings = getTranslatableCvStrings(bareCv);
		expect(strings).toContain('A-0');
		expect(strings).toContain('FLOW-MATIC');
	});

	it('falls back to the source string when a key is missing', () => {
		const custom = structuredClone(minimalCv);
		custom.summary = 'Untranslated sentence';
		expect(localizeCv(custom, 'fr').summary).toBe('Untranslated sentence');
	});

	it('deduplicates strings for the completeness test', () => {
		const strings = getTranslatableCvStrings(minimalCv);
		expect(new Set(strings).size).toBe(strings.length);
	});
});

describe('localized print model', () => {
	it('orders French dates correctly and formats them as ranges', () => {
		const model = buildResumeModel(localizeCv(cv, 'fr'), 'fr');
		expect(model.experience.map((item) => item.role)).toEqual([
			'Formateur (indépendant)',
			'Président',
			'Président',
			'Président',
			'Développeur (stage)'
		]);
		expect(model.experience[0].period).toBe('déc. 2025 – aujourd’hui');
		expect(model.education.map((item) => item.school)).toEqual([
			'MITx Courses',
			'University of Helsinki',
			'Lycée Polyvalent Louis Armand'
		]);
	});

	it('localizes certificate counts and keeps issuer deduplication', () => {
		const model = buildResumeModel(localizeCv(cv, 'fr'), 'fr');
		const nvidia = model.certifications.find(
			(item) => item.name === 'NVIDIA Deep Learning Institute'
		);
		expect(nvidia?.meta).toBe('mars 2025 · 5 certificats');
		const qualcomm = model.certifications.find((item) => item.name === 'Qualcomm Wireless Academy');
		expect(qualcomm?.meta).toBe('2025 · 2 certificats');
	});
});
