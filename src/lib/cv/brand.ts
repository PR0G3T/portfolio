const BRAND_CASE: Readonly<Record<string, string>> = {
	'Körber Supply Chain Software': 'KÖRBER Supply Chain Software'
};

/** Display a company name with its official casing when known. */
export const displayCompany = (name: string): string => BRAND_CASE[name] ?? name;
