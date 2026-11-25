import { asset } from '$app/paths';
import type { AssetPath } from '$app/types';

const asAssetPath = (path: string): AssetPath => path as AssetPath;

/** Resolve a file from `static/` while respecting the configured base path. */
export const assetUrl = (path: string): string => asset(asAssetPath(path.replace(/^\//, '')));

/** Resolve a local URL (leading slash) or return external URLs unchanged. */
export const resolveUrl = (url: string): string => (url.startsWith('/') ? assetUrl(url) : url);

const companyLogoMap: Record<string, string> = {
	'Körber Supply Chain Software': 'korber',
	'Team Cardinalis': 'teamcardinalis',
	"Sup de Vinci - école d'informatique": 'sup-de-vinci'
};

export { displayCompany } from './cv/brand.js';

const createLogoResolver =
	(map: Record<string, string>, subfolder: 'companies' | 'schools') =>
	(name: string): string =>
		assetUrl(`images/${subfolder}/${map[name] ?? 'default'}.webp`);

export const getCompanyLogoPath = createLogoResolver(companyLogoMap, 'companies');

const schoolLogoMap: Record<string, string> = {
	'University of Helsinki': 'university-of-helsinki',
	'MITx Courses': 'mitx_courses',
	'Lycée Polyvalent Louis Armand': 'default'
};

export const getSchoolLogoPath = createLogoResolver(schoolLogoMap, 'schools');

const issuerLogoMap: Record<string, string> = {
	'Google Cloud': 'google',
	'NVIDIA Deep Learning Institute': 'nvidia',
	'NASA - National Aeronautics and Space Administration': 'nasa',
	MITx: 'mitx',
	Coursera: 'coursera',
	AMD: 'amd',
	Qualcomm: 'qualcomm'
};

export const getIssuerLogoPath = createLogoResolver(issuerLogoMap, 'companies');

export const companyLogoFallback = assetUrl('images/companies/default.webp');
export const schoolLogoFallback = assetUrl('images/schools/default.webp');

/** Replace a broken logo with the folder default, once. */
export const handleImgError = (event: Event, fallback: string): void => {
	const target = event.currentTarget as HTMLImageElement | null;
	if (!target) return;
	target.onerror = null;
	target.src = fallback;
};
