import { describe, expect, it } from 'vitest';
import { buildResumeModel, validateCvData } from '../../src/lib/cv/model.js';
import { formatPeriod } from '../../src/lib/cv/format.js';
import cv from '../../src/lib/data/cv.js';
import { bareCv, minimalCv } from '../fixtures/cv.js';

describe('validateCvData', () => {
	it('accepts the production CV', () => {
		expect(validateCvData(cv)).toEqual([]);
	});

	it('reports every structural problem', () => {
		const broken = structuredClone(minimalCv);
		broken.name = ' ';
		broken.title = '';
		broken.summary = '';
		broken.experience = [{ company: '', role: '', period: '', items: [] }];
		broken.skills = [];
		broken.socials = [{ type: 'github', href: 'ftp://example.com', label: '' }];

		expect(validateCvData(broken).length).toBeGreaterThanOrEqual(9);
	});

	it('reports an empty experience list', () => {
		const broken = structuredClone(minimalCv);
		broken.experience = [];
		expect(validateCvData(broken)).toContain('experience is empty');
	});

	it('reports invalid optional collections', () => {
		const broken = structuredClone(minimalCv);
		broken.projects = [{ name: ' ', description: '' }];
		broken.education = [{ degree: '', school: '', period: '' }];
		broken.certifications = [{ name: '', issuer: '' }];
		broken.languages = [{ language: '', proficiency: '' }];
		const issues = validateCvData(broken);
		expect(issues).toEqual(
			expect.arrayContaining([
				'projects[0].name is empty',
				'education[0].degree is empty',
				'education[0].school is empty',
				'education[0].period is empty',
				'certifications[0].name is empty',
				'certifications[0].issuer is empty',
				'languages[0].language is empty',
				'languages[0].proficiency is empty'
			])
		);
	});

	it('rejects a model built from invalid data', () => {
		const broken = structuredClone(minimalCv);
		broken.name = '';
		expect(() => buildResumeModel(broken)).toThrow(/name is empty/);
	});
});

describe('formatPeriod', () => {
	it('uses an en dash between dates', () => {
		expect(formatPeriod('Dec 2025 - Present')).toBe('Dec 2025 – Present');
		expect(formatPeriod('May 2024 – Jul 2024')).toBe('May 2024 – Jul 2024');
	});

	it('leaves a single date untouched', () => {
		expect(formatPeriod(' Apr 2025 ')).toBe('Apr 2025');
	});
});

describe('buildResumeModel', () => {
	it('exposes the current location', () => {
		expect(buildResumeModel(cv).location).toBe('Lyon, Auvergne-Rhône-Alpes, France');
	});

	it('exposes email, phone and portfolio as the first contacts', () => {
		const model = buildResumeModel(cv);
		expect(model.contacts.slice(0, 3)).toMatchObject([
			{
				label: 'Email',
				display: 'killianott4@gmail.com',
				href: 'mailto:killianott4@gmail.com'
			},
			{ label: 'Phone', display: '07 83 63 73 98', href: 'tel:+33783637398' },
			{ label: 'Portfolio', display: 'pr0g3t.com' }
		]);
		expect(new Set(model.contacts.map((contact) => contact.href)).size).toBe(model.contacts.length);
	});

	it('orders experience by recency, open-ended roles first', () => {
		const roles = buildResumeModel(cv).experience.map((experience) => experience.role);
		expect(roles).toEqual([
			'Instructor (Freelance)',
			'Chairman & Chief Executive Officer',
			'Chairman & Chief Executive Officer',
			'Chairman & Chief Executive Officer',
			'Developer (Internship)'
		]);
	});

	it('keeps only the first non-empty highlight and normalises bullets', () => {
		const model = buildResumeModel(minimalCv);
		expect(model.experience[0].highlight).toBe('Wrote the first algorithm.');
	});

	it('keeps education compact and ordered', () => {
		const model = buildResumeModel(cv);
		expect(model.education.map((item) => item.school)).toEqual([
			'MITx Courses',
			'University of Helsinki',
			'Lycée Polyvalent Louis Armand'
		]);
		expect(model.education[0].degree).toBe('Mathematics & Data Engineering');
	});

	it('counts sub-certifications and orders by year', () => {
		const model = buildResumeModel(cv);
		expect(model.certifications.map((item) => item.name)).toEqual([
			'Python Computer Vision',
			'ANSSI Cybersecurity MOOC',
			'NVIDIA Deep Learning Institute',
			'Developer Program',
			'TryHackMe Top 1%',
			'Application Developer',
			'Wireless Academy',
			'Applied Remote Sensing Training'
		]);
		expect(
			model.certifications.find((item) => item.name === 'NVIDIA Deep Learning Institute')?.meta
		).toBe('Mar 2025 · 5 certificates');
		expect(model.certifications.find((item) => item.name === 'Wireless Academy')?.meta).toBe(
			'Qualcomm · 2025 · 2 certificates'
		);
	});

	it('uses the singular for one sub-certification', () => {
		const single = structuredClone(minimalCv);
		single.certifications![0].subCertifications = [
			{ name: 'Only', link: 'https://example.com/only' }
		];
		expect(buildResumeModel(single).certifications[0].meta).toBe(
			'Royal Society · 1843 · 1 certificate'
		);
	});

	it('preserves skills, languages and data order', () => {
		const model = buildResumeModel(cv);
		expect(model.skills).toEqual(cv.skills);
		expect(model.languages.map((item) => item.language)).toEqual([
			'English',
			'Finnish',
			'French',
			'French Sign Languages',
			'Spanish'
		]);
	});

	it('includes non-empty projects', () => {
		const withProject = structuredClone(minimalCv);
		withProject.projects = [{ name: ' Engine ', description: ' Analytical engine notes ' }];
		const model = buildResumeModel(withProject);
		expect(model.projects).toEqual([{ name: 'Engine', description: 'Analytical engine notes' }]);
	});

	it('omits optional fields instead of emitting empty strings', () => {
		const model = buildResumeModel(minimalCv);
		expect(model.location).toBeUndefined();
		expect(model.projects).toEqual([]);
	});

	it('handles a CV without optional collections', () => {
		const model = buildResumeModel(bareCv);
		expect(model.education).toEqual([]);
		expect(model.languages).toEqual([]);
		expect(model.certifications[0].meta).toBe('USA');
	});

	it('keeps location and strips bullet prefixes', () => {
		const model = buildResumeModel(bareCv);
		expect(model.experience[0].location).toBe('Remote');
		expect(model.experience[0].highlight).toBe('Coined the term debugging.');
		expect(model.experience[1].highlight).toBeUndefined();
	});

	it('omits an empty project description but keeps the project', () => {
		const model = buildResumeModel(bareCv);
		expect(model.projects).toEqual([
			{ name: 'A-0' },
			{ name: 'FLOW-MATIC', description: 'English-like programming language.' }
		]);
	});

	it('rejects a non-HTTP social URL', () => {
		const broken = structuredClone(minimalCv);
		broken.socials[0].href = 'mailto:ada@example.com';
		expect(() => buildResumeModel(broken)).toThrow(/not an HTTP URL/);
	});

	it('rejects a malformed social URL', () => {
		const broken = structuredClone(minimalCv);
		broken.socials[0].href = 'https://[';
		expect(() => buildResumeModel(broken)).toThrow(/not an HTTP URL/);
	});

	it('rejects an invalid email or phone', () => {
		const broken = structuredClone(minimalCv);
		broken.email = 'not-an-email';
		broken.phone = '12';
		const issues = validateCvData(broken);
		expect(issues).toContain('email is invalid');
		expect(issues).toContain('phone is invalid');
	});

	it('rejects an empty experience period', () => {
		const broken = structuredClone(minimalCv);
		broken.experience[0].period = '';
		expect(() => buildResumeModel(broken)).toThrow(/period is empty/);
	});

	it('rejects an empty company', () => {
		const broken = structuredClone(minimalCv);
		broken.experience[0].company = '';
		expect(() => buildResumeModel(broken)).toThrow(/company is empty/);
	});

	it('de-duplicates contacts by URL', () => {
		const duplicate = structuredClone(minimalCv);
		duplicate.socials.push({
			type: 'github',
			href: 'https://pr0g3t.com/',
			label: 'Portfolio duplicate'
		});
		const model = buildResumeModel(duplicate);
		expect(model.contacts.filter((contact) => contact.href === 'https://pr0g3t.com/')).toHaveLength(
			1
		);
	});

	it('handles a CV without certifications or location', () => {
		const lean = structuredClone(bareCv);
		delete lean.certifications;
		expect(buildResumeModel(lean).certifications).toEqual([]);
	});

	it('keeps a non-empty location', () => {
		const located = structuredClone(bareCv);
		located.location = ' Lyon ';
		expect(buildResumeModel(located).location).toBe('Lyon');
	});

	it('rejects an empty social label', () => {
		const broken = structuredClone(minimalCv);
		broken.socials[0].label = '';
		expect(() => buildResumeModel(broken)).toThrow(/label is empty/);
	});
});
