<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { assetUrl } from '$lib/utils';

	import {
		siteUrl,
		ogImageUrl,
		jsonLdStr,
		jsonLdOrgStr,
		jsonLdSiteStr,
		jsonLdProfileStr,
		jsonLdBreadcrumbStr
	} from '$lib/seo';

	let { children } = $props();

	const generatePdf = () => {
		window.print();
	};
</script>

<svelte:head>
	<title>Killian "PR0G3T" OTT</title>
	<meta
		name="description"
		content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications. Minimal, modern design, light theme."
	/>
	<meta name="color-scheme" content="light" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#3B3B3F" />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta name="googlebot" content="index,follow" />
	<link rel="canonical" href={`${siteUrl}/`} />
	<link rel="alternate" href={`${siteUrl}/`} hreflang="en" />
	<link rel="alternate" hrefLang="x-default" href={`${siteUrl}/`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta
		property="og:description"
		content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications."
	/>
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
	<meta
		name="twitter:description"
		content="Resume/Portfolio of Killian OTT (PR0G3T). Profile, skills, experience, education and certifications."
	/>
	<meta name="twitter:image" content={ogImageUrl} />
	<!-- Optional: set your Twitter handle if available -->
	<!-- <meta name="twitter:site" content="@your_handle" /> -->
	<!-- <meta name="twitter:creator" content="@your_handle" /> -->
	<link rel="icon" href={favicon} />
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLdStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdOrgStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdSiteStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdProfileStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdBreadcrumbStr}<` + `/script>`}
</svelte:head>

<div class="paper" translate="no">
	{@render children?.()}
</div>

<button class="floating-download" onclick={generatePdf} aria-label="Download CV as PDF">
	<img src={assetUrl('icons/download.svg')} alt="Download" />
</button>

<!-- Optional minimal profile avatar at top of layout (hidden by default) -->
<!-- <img src={profileSrc} alt="Profile" width="64" height="64" /> -->
