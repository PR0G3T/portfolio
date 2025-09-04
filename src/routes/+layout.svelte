<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { base } from '$app/paths';
	import cv from '$lib/data/cv';
	// Normalize base to avoid '.' which creates relative URLs in CSS
	const assetBase = base === '.' ? '' : base;
	// Helper to build asset URLs that respect paths.base
	const assetUrl = (p: string): string => {
		const clean = p.replace(/^\//, '');
		return base ? `${base}/${clean}` : `/${clean}`;
	};
	const profileSrc = `${assetBase}/images/profile.png`;

	let { children } = $props();

	const siteUrl = 'https://pr0g3t.com';
	const ogImageUrl = `${siteUrl}/images/profile.png`;

	// Organization (optional) for Team Cardinalis with logo
	const orgTeamCardinalis = {
		'@type': 'Organization',
		name: 'Team Cardinalis',
		logo: `${siteUrl}/images/companies/teamcardinalis.png`
	};

	// Map schools to more specific schema.org types when possible
	const schoolTypeMap: Record<string, string> = {
		'University of Helsinki': 'CollegeOrUniversity',
		'MITx Courses': 'EducationalOrganization',
		'Lycée Polyvalent Louis Armand': 'HighSchool',
		'LycǸe Polyvalent Louis Armand': 'HighSchool'
	};

	// Person schema enriched
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Killian OTT',
		alternateName: 'PR0G3T',
		url: `${siteUrl}/`,
		jobTitle: 'PR0G3T',
		worksFor: orgTeamCardinalis,
		alumniOf: (cv.education ?? []).map((e) => ({
			'@type': schoolTypeMap[e.school] ?? 'EducationalOrganization',
			name: e.school,
			...(e.link ? { url: e.link } : {})
		})),
		knowsAbout: cv.skills,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Lyon',
			addressRegion: 'Auvergne-Rhône-Alpes',
			addressCountry: 'FR'
		},
		image: ogImageUrl,
		sameAs: [
			'https://www.linkedin.com/in/killian-ott/',
			'https://github.com/PR0G3T',
			'https://www.instagram.com/pr0g3t/',
			'https://www.facebook.com/PR0G3T/',
			'https://orcid.org/0009-0001-2059-565X'
		]
	};

	const jsonLdSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: `${siteUrl}/`,
		name: 'Killian OTT • CV',
		inLanguage: 'en-US',
		publisher: { '@id': `${siteUrl}/#organization` }
	};

	// ProfilePage schema referencing the Person as mainEntity
	const jsonLdProfile = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `${siteUrl}/`,
		inLanguage: 'en-US',
		mainEntity: jsonLd
	};

	// Site Organization (publisher/owner)
	const jsonLdOrg = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		'@id': `${siteUrl}/#organization`,
		name: 'PR0G3T',
		url: `${siteUrl}/`,
		logo: ogImageUrl,
		sameAs: [
			'https://www.linkedin.com/in/killian-ott/',
			'https://github.com/PR0G3T',
			'https://www.instagram.com/pr0g3t/',
			'https://www.facebook.com/PR0G3T/'
		]
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
				item: `${siteUrl}/`
			}
		]
	};

	// Pre-serialize JSON-LD to ensure valid inline output in SSR
	const sanitizeJson = (s: string) => s.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
	const jsonLdStr = sanitizeJson(JSON.stringify(jsonLd));
	const jsonLdOrgStr = sanitizeJson(JSON.stringify(jsonLdOrg));
	const jsonLdSiteStr = sanitizeJson(JSON.stringify(jsonLdSite));
	const jsonLdProfileStr = sanitizeJson(JSON.stringify(jsonLdProfile));
	const jsonLdBreadcrumbStr = sanitizeJson(JSON.stringify(jsonLdBreadcrumb));

	let generating = $state(false);
	const generatePdf = async () => {
		if (generating) return;
		generating = true;
		try {
			const [{ default: html2canvas }, jspdfModule] = await Promise.all([
				import('html2canvas'),
				import('jspdf')
			]);
			const JsPDF = jspdfModule.jsPDF;
			const element = document.querySelector('.paper') as HTMLElement | null;
			if (!element) return;
			const canvas = await html2canvas(element, {
				scale: 2,
				useCORS: true,
				backgroundColor: '#ffffff'
			});
			const imgData = canvas.toDataURL('image/jpeg', 0.98);
			const pdf = new JsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
			const pageWidth = pdf.internal.pageSize.getWidth();
			const pageHeight = pdf.internal.pageSize.getHeight();
			const imgWidthPx = canvas.width;
			const imgHeightPx = canvas.height;
			const imgAspect = imgWidthPx / imgHeightPx;
			const pageAspect = pageWidth / pageHeight;
			let renderWidth = pageWidth;
			let renderHeight = pageHeight;
			if (imgAspect > pageAspect) {
				renderWidth = pageWidth;
				renderHeight = pageWidth / imgAspect;
			} else {
				renderHeight = pageHeight;
				renderWidth = pageHeight * imgAspect;
			}
			const x = (pageWidth - renderWidth) / 2;
			const y = (pageHeight - renderHeight) / 2;
			pdf.addImage(imgData, 'JPEG', x, y, renderWidth, renderHeight, undefined, 'FAST');
			pdf.save('CV-Killian-OTT.pdf');
		} finally {
			generating = false;
		}
	};
</script>

<svelte:head>
	<title>Killian "PR0G3T" OTT</title>
	<meta name="description" content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications. Minimal, modern design, light theme." />
	<meta name="color-scheme" content="light" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#3B3B3F" />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index,follow" />
	<link rel="canonical" href={`${siteUrl}/`} />
	<link rel="alternate" href={`${siteUrl}/`} hreflang="en" />
	<link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta property="og:description" content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications." />
	<meta property="og:url" content={`${siteUrl}/`} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="Resume of Killian OTT — AI, Cybersecurity" />
	<meta property="og:site_name" content="Killian OTT • CV" />
	<meta property="og:locale" content="en_US" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta name="twitter:description" content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications." />
	<meta name="twitter:image" content={ogImageUrl} />
	<!-- Optional: set your Twitter handle if available -->
	<!-- <meta name="twitter:site" content="@your_handle" /> -->
	<!-- <meta name="twitter:creator" content="@your_handle" /> -->
	<link rel="icon" href={favicon} />
	{@html `<script type="application/ld+json">${jsonLdStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdOrgStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdSiteStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdProfileStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdBreadcrumbStr}</script>`}
</svelte:head>

<div class="paper" translate="no">
	{@render children?.()}
</div>

<button class="floating-download" onclick={generatePdf} aria-label="Download CV as PDF" disabled={generating}>
	<img src={assetUrl('icons/download.svg')} alt="Download" />
</button>

<!-- Optional minimal profile avatar at top of layout (hidden by default) -->
<!-- <img src={profileSrc} alt="Profile" width="64" height="64" /> -->
