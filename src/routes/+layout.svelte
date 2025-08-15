<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    import { base } from '$app/paths';
    const profileSrc = `${base}/images/profile.png`;

	let { children } = $props();

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Killian OTT',
		alternateName: 'PR0G3T',
		url: 'https://killian-ott.github.io/CV/',
		jobTitle: 'PR0G3T',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Lyon',
			addressRegion: 'Auvergne-Rhône-Alpes',
			addressCountry: 'FR'
		},
		image: 'https://killian-ott.github.io/CV/images/profile.png',
		sameAs: [
			'https://www.linkedin.com/in/killian-ott/'
		]
	};
</script>

<svelte:head>
	<title>Killian "PR0G3T" OTT</title>
	<meta name="description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications. Design minimaliste, moderne, thème blanc." />
	<meta name="color-scheme" content="light" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#3B3B3F" />
	<meta name="robots" content="index, follow" />
	<link rel="canonical" href="https://killian-ott.github.io/CV/" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta property="og:description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications." />
	<meta property="og:url" content="https://killian-ott.github.io/CV/" />
	<meta property="og:image" content="https://killian-ott.github.io/CV/images/profile.png" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Killian &quot;PR0G3T&quot; OTT" />
	<meta name="twitter:description" content="CV/Portfolio de Killian OTT (PR0G3T). Profil, compétences, expériences, éducation et certifications." />
	<meta name="twitter:image" content="https://killian-ott.github.io/CV/images/profile.png" />
	<link rel="icon" href={favicon} />
	<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
</svelte:head>

<div class="paper">
	{@render children?.()}
</div>

<a class="floating-download" href="{base}/CV.pdf" download aria-label="Download CV">
	<img src="{base}/icons/download.svg" alt="Download" />
</a>

<!-- Optional minimal profile avatar at top of layout (hidden by default) -->
<!-- <img src={profileSrc} alt="Profile" width="64" height="64" /> -->
