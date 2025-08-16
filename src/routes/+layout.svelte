<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import { base } from '$app/paths';
    const profileSrc = `${base}/images/profile.png`;

	let { children } = $props();

	const siteUrl = 'https://killian-ott.github.io/CV';
	const ogImageUrl = `${siteUrl}/images/profile.png`;

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Killian OTT',
		alternateName: 'PR0G3T',
		url: `${siteUrl}/`,
		jobTitle: 'PR0G3T',
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
			'https://www.facebook.com/PR0G3T/'
		]
	};

	const jsonLdSite = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		url: `${siteUrl}/`,
		name: 'Killian OTT — CV',
		inLanguage: 'fr-FR'
	};

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
	<meta property="og:site_name" content="Killian OTT — CV" />
	<meta property="og:locale" content="fr_FR" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta name="twitter:description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications." />
	<meta name="twitter:image" content={ogImageUrl} />
	<link rel="icon" href={favicon} />
	<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
	<script type="application/ld+json">{JSON.stringify(jsonLdSite)}</script>
</svelte:head>

<div class="paper" translate="no">
	{@render children?.()}
</div>

<button class="floating-download" onclick={generatePdf} aria-label="Download CV as PDF" disabled={generating}>
	<img src="{base}/icons/download.svg" alt="Download" />
</button>

<!-- Optional minimal profile avatar at top of layout (hidden by default) -->
<!-- <img src={profileSrc} alt="Profile" width="64" height="64" /> -->
