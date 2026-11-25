import type { CvData, CvSocialLink } from './types.js';
import { displayCompany } from './brand.js';
import { formatLinkLabel, formatPeriod } from './format.js';
import { compareByRecency } from './period.js';
import { SITE_HOST, SITE_URL } from '#lib/site.js';
import { UI, type Locale } from '#lib/i18n/ui.js';

export interface ResumeContact {
	label: string;
	display: string;
	href: string;
}

export interface ResumeExperience {
	role: string;
	company: string;
	period: string;
	location?: string;
	highlight?: string;
}

export interface ResumeProject {
	name: string;
	description?: string;
}

export interface ResumeEducation {
	degree: string;
	school: string;
	period: string;
}

export interface ResumeCertification {
	name: string;
	meta: string;
}

export interface ResumeLanguage {
	language: string;
	proficiency: string;
}

export interface ResumeModel {
	name: string;
	title: string;
	summary: string;
	location?: string;
	contacts: ResumeContact[];
	experience: ResumeExperience[];
	projects: ResumeProject[];
	education: ResumeEducation[];
	certifications: ResumeCertification[];
	skills: string[];
	languages: ResumeLanguage[];
}

const clean = (value: string): string => value.trim().replace(/^[-–•]\s*/, '');

const isHttpUrl = (value: string): boolean => {
	try {
		const url = new URL(value);
		return url.protocol === 'https:' || url.protocol === 'http:';
	} catch {
		return false;
	}
};

/** Fail the build early when the single source of truth is unusable. */
export const validateCvData = (data: CvData): string[] => {
	const issues: string[] = [];
	if (!data.name.trim()) issues.push('name is empty');
	if (!data.title.trim()) issues.push('title is empty');
	if (!data.summary.trim()) issues.push('summary is empty');
	if (data.experience.length === 0) issues.push('experience is empty');
	if (data.skills.length === 0) issues.push('skills is empty');

	data.experience.forEach((item, index) => {
		if (!item.role.trim()) issues.push(`experience[${index}].role is empty`);
		if (!item.company.trim()) issues.push(`experience[${index}].company is empty`);
		if (!item.period.trim()) issues.push(`experience[${index}].period is empty`);
	});

	data.socials.forEach((social, index) => {
		if (!social.label.trim()) issues.push(`socials[${index}].label is empty`);
		if (!isHttpUrl(social.href)) issues.push(`socials[${index}].href is not an HTTP URL`);
	});

	(data.projects ?? []).forEach((project, index) => {
		if (!project.name.trim()) issues.push(`projects[${index}].name is empty`);
	});

	(data.education ?? []).forEach((education, index) => {
		if (!education.degree.trim()) issues.push(`education[${index}].degree is empty`);
		if (!education.school.trim()) issues.push(`education[${index}].school is empty`);
		if (!education.period.trim()) issues.push(`education[${index}].period is empty`);
	});

	(data.certifications ?? []).forEach((certification, index) => {
		if (!certification.name.trim()) issues.push(`certifications[${index}].name is empty`);
		if (!certification.issuer.trim()) issues.push(`certifications[${index}].issuer is empty`);
	});

	(data.languages ?? []).forEach((language, index) => {
		if (!language.language.trim()) issues.push(`languages[${index}].language is empty`);
		if (!language.proficiency.trim()) issues.push(`languages[${index}].proficiency is empty`);
	});

	return issues;
};

const toContact = (social: CvSocialLink): ResumeContact => ({
	label: social.label,
	display: formatLinkLabel(social.href),
	href: social.href
});

const uniqueContacts = (contacts: ResumeContact[]): ResumeContact[] => {
	const seen = new Set<string>();
	return contacts.filter((contact) => {
		if (seen.has(contact.href)) return false;
		seen.add(contact.href);
		return true;
	});
};

export const buildResumeModel = (data: CvData, locale: Locale = 'en'): ResumeModel => {
	const issues = validateCvData(data);
	if (issues.length > 0) {
		throw new Error(`Invalid CV data: ${issues.join('; ')}`);
	}

	const website: ResumeContact = {
		label: 'Portfolio',
		display: SITE_HOST,
		href: SITE_URL
	};

	const contacts = uniqueContacts([website, ...data.socials.map(toContact)]);

	const experience = [...data.experience]
		.sort((a, b) => compareByRecency(a.period, b.period))
		.slice(0, 5)
		.map((item) => {
			const highlight = item.items.find((entry) => entry.trim().length > 0);
			return {
				role: item.role.trim(),
				company: displayCompany(item.company.trim()),
				period: formatPeriod(item.period),
				...(item.location?.trim() ? { location: item.location.trim() } : {}),
				...(highlight ? { highlight: clean(highlight) } : {})
			};
		});

	const projects: ResumeProject[] = (data.projects ?? [])
		.filter((project) => project.name.trim().length > 0)
		.map((project) => ({
			name: project.name.trim(),
			...(project.description.trim() ? { description: project.description.trim() } : {})
		}));

	const education: ResumeEducation[] = [...(data.education ?? [])]
		.sort((a, b) => compareByRecency(a.period, b.period))
		.slice(0, 3)
		.map((item) => ({
			degree: item.degree.trim(),
			school: item.school.trim(),
			period: formatPeriod(item.period)
		}));

	const allCertifications = data.certifications ?? [];
	const featured = allCertifications.filter((item) => item.featured);
	const selected = featured.length > 0 ? featured : allCertifications.slice(0, 8);
	const certifications: ResumeCertification[] = selected.map((item) => {
		const name = item.name.trim();
		const issuer = item.issuer.trim();
		const year = item.year?.trim();
		const count = item.subCertifications?.length ?? 0;
		const meta = [
			// Avoid repeating the issuer when it is already in the certificate name.
			name.toLowerCase().includes(issuer.toLowerCase()) ? '' : issuer,
			year ?? '',
			count > 0 ? UI[locale].certificateCount(count) : ''
		]
			.filter(Boolean)
			.join(' · ');
		return { name, meta };
	});

	return {
		name: data.name.trim(),
		title: data.title.trim(),
		summary: data.summary.trim(),
		...(data.location?.trim() ? { location: data.location.trim() } : {}),
		contacts,
		experience,
		projects,
		education,
		certifications,
		skills: [...data.skills],
		languages: (data.languages ?? []).map((language) => ({
			language: language.language.trim(),
			proficiency: language.proficiency.trim()
		}))
	};
};
