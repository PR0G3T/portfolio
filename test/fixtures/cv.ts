import type { CvData } from '../../src/lib/cv/types.js';

export const minimalCv: CvData = {
	name: 'Ada Lovelace',
	title: 'Analyst',
	summary: 'First programmer.',
	socials: [
		{ type: 'github', href: 'https://github.com/ada', label: 'GitHub' },
		{ type: 'orcid', href: 'https://orcid.org/0000-0002-1825-0097', label: 'ORCID' }
	],
	skills: ['Mathematics', 'Programming'],
	experience: [
		{
			company: 'Analytical Engine',
			role: 'Programmer',
			period: 'Jan 1843 - Present',
			items: ['Wrote the first algorithm.', 'Second bullet is not printed.']
		}
	],
	education: [
		{
			school: 'Home',
			degree: 'Mathematics',
			period: 'Jan 1840',
			details: 'Private tuition.'
		}
	],
	certifications: [
		{
			name: 'Certificate',
			issuer: 'Royal Society',
			year: '1843',
			subCertifications: [
				{ name: 'One', link: 'https://example.com/1' },
				{ name: 'Two', link: 'https://example.com/2' }
			]
		}
	],
	languages: [{ language: 'English', proficiency: 'Native' }]
};

export const bareCv: CvData = {
	name: 'Grace Hopper',
	title: 'Rear Admiral',
	summary: 'Compiler pioneer.',
	socials: [{ type: 'github', href: 'https://github.com/grace', label: 'GitHub' }],
	skills: ['Compilers'],
	experience: [
		{
			company: 'US Navy',
			role: 'Programmer',
			period: '1943 - 1986',
			location: 'Remote',
			items: ['- Coined the term debugging.', ' - ']
		},
		{
			company: 'Eckert–Mauchly',
			role: 'Mathematician',
			period: '1949 - 1971',
			items: []
		}
	],
	projects: [
		{ name: 'A-0', description: '   ' },
		{ name: 'FLOW-MATIC', description: 'English-like programming language.' }
	],
	certifications: [{ name: 'Presidential Medal of Freedom', issuer: 'USA' }]
};
