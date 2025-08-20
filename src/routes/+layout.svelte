<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import { base } from '$app/paths';
    import cv from '$lib/data/cv';
    const profileSrc = `${base}/images/profile.png`;

	let { children } = $props();

	const siteUrl = 'https://pr0g3t.com';
	const ogImageUrl = `${siteUrl}/images/profile.png`;

	// Organization (optional) for Team Cardinalis with logo
	const orgTeamCardinalis = {
		'@type': 'Organization',
		name: 'Team Cardinalis',
		logo: `${siteUrl}/images/companies/teamcardinalis.png`
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
		alumniOf: (cv.education ?? []).map((e) => ({ '@type': 'EducationalOrganization', name: e.school })),
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
		name: 'Killian OTT — CV',
		inLanguage: 'fr-FR'
	};

	// ProfilePage schema referencing the Person as mainEntity
	const jsonLdProfile = {
		'@context': 'https://schema.org',
		'@type': 'ProfilePage',
		url: `${siteUrl}/`,
		inLanguage: 'fr-FR',
		mainEntity: jsonLd
	};

	// Pre-serialize JSON-LD to ensure valid inline output in SSR
	const sanitizeJson = (s: string) => s.replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
	const jsonLdStr = sanitizeJson(JSON.stringify(jsonLd));
	const jsonLdSiteStr = sanitizeJson(JSON.stringify(jsonLdSite));
	const jsonLdProfileStr = sanitizeJson(JSON.stringify(jsonLdProfile));

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
	<meta name="description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications. Design minimaliste, moderne, thème blanc." />
	<meta name="color-scheme" content="light" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#3B3B3F" />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
	<meta name="googlebot" content="index,follow" />
	<link rel="canonical" href={`${siteUrl}/`} />
	<link rel="alternate" href={`${siteUrl}/`} hreflang="fr" />
	<link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta property="og:description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications." />
	<meta property="og:url" content={`${siteUrl}/`} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="CV de Killian OTT — IA, Cybersécurité" />
	<meta property="og:site_name" content="Killian OTT — CV" />
	<meta property="og:locale" content="fr_FR" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta name="twitter:description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications." />
	<meta name="twitter:image" content={ogImageUrl} />
	<!-- Optional: set your Twitter handle if available -->
	<!-- <meta name="twitter:site" content="@votre_handle" /> -->
	<!-- <meta name="twitter:creator" content="@votre_handle" /> -->
	<link rel="icon" href={favicon} />
	{@html `<script type="application/ld+json">${jsonLdStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdSiteStr}</script>`}
	{@html `<script type="application/ld+json">${jsonLdProfileStr}</script>`}
</svelte:head>

<div class="paper" translate="no">
	{@render children?.()}
</div>

<button class="floating-download" onclick={generatePdf} aria-label="Download CV as PDF" disabled={generating}>
	<img src="/icons/download.svg" alt="Download" />
</button>

<!-- Optional minimal profile avatar at top of layout (hidden by default) -->
<!-- <img src={profileSrc} alt="Profile" width="64" height="64" /> -->
