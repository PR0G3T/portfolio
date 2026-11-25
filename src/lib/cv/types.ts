export type CvSocialType = 'linkedin' | 'github' | 'instagram' | 'facebook' | 'orcid';

export interface CvSocialLink {
	type: CvSocialType;
	href: string;
	label: string;
}

export interface CvExperienceItem {
	company: string;
	role: string;
	period: string;
	location?: string;
	items: string[];
	link?: string;
}

export interface CvProjectItem {
	name: string;
	description: string;
	link?: string;
}

export interface CvEducationItem {
	school: string;
	degree: string;
	period: string;
	details?: string;
	link?: string;
	credential?: string;
	credentialLabel?: string;
	credentials?: Array<{
		label: string;
		href: string;
	}>;
}

export interface CvCertificationItem {
	name: string;
	issuer: string;
	year?: string;
	link?: string;
	credentialId?: string;
	featured?: boolean;
	subCertifications?: Array<{
		name: string;
		link?: string;
	}>;
}

export interface CvLanguageItem {
	language: string;
	proficiency: string;
}

export interface CvData {
	name: string;
	title: string;
	summary: string;
	location?: string;
	socials: CvSocialLink[];
	skills: string[];
	experience: CvExperienceItem[];
	projects?: CvProjectItem[];
	education?: CvEducationItem[];
	certifications?: CvCertificationItem[];
	languages?: CvLanguageItem[];
}
