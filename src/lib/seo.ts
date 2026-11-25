import cv from '#lib/data/cv.js';
import { SITE_URL } from '#lib/site.js';

export const ogImageUrl = `${SITE_URL}images/profile.webp`;

// Organization (optional) for Team Cardinalis with logo
const orgTeamCardinalis = {
	'@type': 'Organization',
	name: 'Team Cardinalis',
	logo: `${SITE_URL}images/companies/teamcardinalis.webp`
};

// Map schools to more specific schema.org types when possible
const schoolTypeMap: Record<string, string> = {
	'University of Helsinki': 'CollegeOrUniversity',
	'MITx Courses': 'EducationalOrganization',
	'Lycée Polyvalent Louis Armand': 'HighSchool'
};

// Person schema enriched from the single source of truth
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: cv.name,
	alternateName: cv.title,
	url: SITE_URL,
	jobTitle: cv.title,
	worksFor: orgTeamCardinalis,
	alumniOf: (cv.education ?? []).map((education) => ({
		'@type': schoolTypeMap[education.school] ?? 'EducationalOrganization',
		name: education.school,
		...(education.link ? { url: education.link } : {})
	})),
	knowsAbout: cv.skills,
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Lyon',
		addressRegion: 'Auvergne-Rhône-Alpes',
		addressCountry: 'FR'
	},
	image: ogImageUrl,
	sameAs: cv.socials.map((social) => social.href)
};

const jsonLdSite = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	url: SITE_URL,
	name: `${cv.name} • CV`,
	inLanguage: 'en-US',
	publisher: { '@id': `${SITE_URL}#organization` }
};

// ProfilePage schema referencing the Person as mainEntity
const jsonLdProfile = {
	'@context': 'https://schema.org',
	'@type': 'ProfilePage',
	url: SITE_URL,
	inLanguage: 'en-US',
	mainEntity: jsonLd
};

// Site Organization (publisher/owner)
const jsonLdOrg = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': `${SITE_URL}#organization`,
	name: cv.title,
	url: SITE_URL,
	logo: ogImageUrl,
	sameAs: cv.socials.filter((social) => social.type !== 'orcid').map((social) => social.href)
};

// Breadcrumb (even single level for homepage)
const jsonLdBreadcrumb = {
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{
			'@type': 'ListItem',
			position: 1,
			name: 'Home',
			item: SITE_URL
		}
	]
};

// Pre-serialize JSON-LD to ensure valid inline output in SSR
const sanitizeJson = (value: string) =>
	value.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');

export const jsonLdStr = sanitizeJson(JSON.stringify(jsonLd));
export const jsonLdOrgStr = sanitizeJson(JSON.stringify(jsonLdOrg));
export const jsonLdSiteStr = sanitizeJson(JSON.stringify(jsonLdSite));
export const jsonLdProfileStr = sanitizeJson(JSON.stringify(jsonLdProfile));
export const jsonLdBreadcrumbStr = sanitizeJson(JSON.stringify(jsonLdBreadcrumb));
