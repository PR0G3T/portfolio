export const LOCALES = ['fr', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface UiStrings {
	experience: string;
	education: string;
	certifications: string;
	profile: string;
	about: string;
	skills: string;
	languages: string;
	contact: string;
	projects: string;
	lastUpdated: (year: number) => string;
	certificateCount: (count: number) => string;
	downloadCv: string;
	credentialViewer: string;
	close: string;
	credential: string;
	credentials: string;
	credentialId: string;
	pdfViewer: string;
	portfolio: string;
	savePdf: string;
	preparing: string;
	ready: string;
	overflow: string;
	error: string;
	printHint: string;
	language: string;
	pdfDescription: string;
	cvAriaLabel: string;
	siteDescription: string;
	ogLocale: string;
}

export const UI: Readonly<Record<Locale, UiStrings>> = {
	en: {
		experience: 'Experience',
		education: 'Education',
		certifications: 'Licenses & certifications',
		profile: 'Profile',
		about: 'About',
		skills: 'Skills',
		languages: 'Languages',
		contact: 'Contact',
		projects: 'Projects',
		lastUpdated: (year) => `Last updated ${year}`,
		certificateCount: (count) => (count === 1 ? '1 certificate' : `${count} certificates`),
		downloadCv: 'Download CV as PDF',
		credentialViewer: 'Credential Viewer',
		close: 'Close',
		credential: 'Credential',
		credentials: 'Credentials',
		credentialId: 'Credential ID',
		pdfViewer: 'PDF Viewer',
		portfolio: 'Portfolio',
		savePdf: 'Save as PDF',
		preparing: 'Preparing A4 document…',
		ready: 'A4 · 1 page',
		overflow: 'Content exceeds one page',
		error: 'Unable to prepare the document',
		printHint: 'Download the generated A4 PDF',
		language: 'Language',
		pdfDescription:
			'One-page A4 resume of Killian OTT (PR0G3T): experience, education, certifications, skills and languages.',
		cvAriaLabel: 'Curriculum vitae, A4, one page',
		siteDescription:
			'Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications. Minimal, modern design, light theme.',
		ogLocale: 'en_US'
	},
	fr: {
		experience: 'Expérience',
		education: 'Formation',
		certifications: 'Licences et certifications',
		profile: 'Profil',
		about: 'À propos',
		skills: 'Compétences',
		languages: 'Langues',
		contact: 'Contact',
		projects: 'Projets',
		lastUpdated: (year) => `Dernière mise à jour ${year}`,
		certificateCount: (count) => (count === 1 ? '1 certificat' : `${count} certificats`),
		downloadCv: 'Télécharger le CV en PDF',
		credentialViewer: 'Aperçu du justificatif',
		close: 'Fermer',
		credential: 'Justificatif',
		credentials: 'Justificatifs',
		credentialId: 'Identifiant du justificatif',
		pdfViewer: 'Visionneuse PDF',
		portfolio: 'Portfolio',
		savePdf: 'Enregistrer en PDF',
		preparing: 'Préparation du document A4…',
		ready: 'A4 · 1 page',
		overflow: 'Le contenu dépasse une page',
		error: 'Impossible de préparer le document',
		printHint: 'Télécharger le PDF A4 généré',
		language: 'Langue',
		pdfDescription:
			'CV A4 d’une page de Killian OTT (PR0G3T) : expérience, formation, certifications, compétences et langues.',
		cvAriaLabel: 'Curriculum vitae, format A4, une page',
		siteDescription:
			'CV et portfolio de Killian OTT (PR0G3T). Profil, compétences, expérience, formation et certifications. Design minimaliste, moderne et clair.',
		ogLocale: 'fr_FR'
	}
};
