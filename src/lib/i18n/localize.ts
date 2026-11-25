import type { CvData } from '#lib/cv/types.js';
import { formatPeriod } from '#lib/cv/format.js';
import { CV_FR } from './cv-fr.js';
import type { Locale } from './ui.js';

const translate = (value: string): string => CV_FR[value] ?? value;

/** Project the single source of truth into a locale-specific CV. */
export const localizeCv = (data: CvData, locale: Locale): CvData => {
	if (locale === 'en') return data;

	return {
		...data,
		summary: translate(data.summary),
		...(data.location ? { location: translate(data.location) } : {}),
		skills: data.skills.map((skill) => translate(skill)),
		experience: data.experience.map((item) => ({
			...item,
			role: translate(item.role),
			period: formatPeriod(translate(item.period)),
			...(item.location ? { location: translate(item.location) } : {}),
			items: item.items.map((entry) => translate(entry))
		})),
		...(data.projects
			? {
					projects: data.projects.map((project) => ({
						...project,
						name: translate(project.name),
						description: project.description.trim() ? translate(project.description) : ''
					}))
				}
			: {}),
		...(data.education
			? {
					education: data.education.map((education) => ({
						...education,
						degree: translate(education.degree),
						period: formatPeriod(translate(education.period)),
						...(education.details ? { details: translate(education.details) } : {}),
						...(education.credentialLabel
							? { credentialLabel: translate(education.credentialLabel) }
							: {}),
						...(education.credentials
							? {
									credentials: education.credentials.map((credential) => ({
										...credential,
										label: translate(credential.label)
									}))
								}
							: {})
					}))
				}
			: {}),
		...(data.certifications
			? {
					certifications: data.certifications.map((certification) => ({
						...certification,
						name: translate(certification.name),
						...(certification.year ? { year: translate(certification.year) } : {}),
						...(certification.subCertifications
							? {
									subCertifications: certification.subCertifications.map((subCertification) => ({
										...subCertification,
										name: translate(subCertification.name)
									}))
								}
							: {})
					}))
				}
			: {}),
		...(data.languages
			? {
					languages: data.languages.map((language) => ({
						...language,
						language: translate(language.language),
						proficiency: translate(language.proficiency)
					}))
				}
			: {})
	};
};

/** All strings that must exist in `CV_FR`; used by the completeness test. */
export const getTranslatableCvStrings = (data: CvData): string[] => {
	const values: string[] = [];
	const add = (value?: string): void => {
		if (value?.trim()) values.push(value);
	};

	add(data.summary);
	add(data.location);
	data.skills.forEach(add);
	data.experience.forEach((item) => {
		add(item.role);
		add(item.period);
		add(item.location);
		item.items.forEach(add);
	});
	data.projects?.forEach((project) => {
		add(project.name);
		add(project.description);
	});
	data.education?.forEach((education) => {
		add(education.degree);
		add(education.period);
		add(education.details);
		add(education.credentialLabel);
		education.credentials?.forEach((credential) => add(credential.label));
	});
	data.certifications?.forEach((certification) => {
		add(certification.name);
		add(certification.year);
		certification.subCertifications?.forEach((subCertification) => add(subCertification.name));
	});
	data.languages?.forEach((language) => {
		add(language.language);
		add(language.proficiency);
	});

	return [...new Set(values)];
};
