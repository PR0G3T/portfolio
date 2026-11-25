<script lang="ts">
	import { browser } from '$app/env';
	import { setContext } from 'svelte';
	import { createLocaleState, LOCALE_CONTEXT } from '#lib/i18n/locale.svelte.js';
	import { LOCALES } from '#lib/i18n/ui.js';
	import { assetUrl } from '#lib/utils.js';
	import {
		ogImageUrl,
		jsonLdStr,
		jsonLdOrgStr,
		jsonLdSiteStr,
		jsonLdProfileStr,
		jsonLdBreadcrumbStr
	} from '#lib/seo.js';
	import { SITE_NAME, SITE_URL } from '#lib/site.js';

	let { children } = $props();

	const i18n = createLocaleState();
	setContext(LOCALE_CONTEXT, i18n);

	let localeReady = $state(false);

	const cvPdfHref = $derived(assetUrl(`CV${i18n.locale === 'fr' ? '-fr' : ''}.pdf`));

	$effect(() => {
		if (!browser) return;
		i18n.syncFromEnvironment();
		localeReady = true;
	});
</script>

<svelte:head>
	<title>{SITE_NAME}</title>
	<meta name="description" content={i18n.ui.siteDescription} />
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta name="googlebot" content="index,follow" />
	<link rel="canonical" href={SITE_URL} />
	<link rel="alternate" href={SITE_URL} hreflang="en" />
	<link rel="alternate" hrefLang="x-default" href={SITE_URL} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={SITE_NAME} />
	<meta property="og:description" content={i18n.ui.siteDescription} />
	<meta property="og:url" content={SITE_URL} />
	<meta property="og:image" content={ogImageUrl} />
	<meta property="og:image:width" content="792" />
	<meta property="og:image:height" content="792" />
	<meta property="og:image:alt" content="Resume of Killian OTT — AI, Cybersecurity" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:locale" content={i18n.ui.ogLocale} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SITE_NAME} />
	<meta name="twitter:description" content={i18n.ui.siteDescription} />
	<meta name="twitter:image" content={ogImageUrl} />
	<link
		rel="preload"
		href={assetUrl('images/profile-224.webp')}
		imagesrcset={`${assetUrl('images/profile-224.webp')} 1x, ${assetUrl('images/profile-448.webp')} 2x`}
		as="image"
		type="image/webp"
		fetchpriority="high"
	/>
	<link
		rel="preload"
		href={assetUrl('fonts/inter-display/InterVariable.woff2')}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<!-- eslint-disable svelte/no-at-html-tags -->
	{@html `<script type="application/ld+json">${jsonLdStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdOrgStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdSiteStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdProfileStr}<` + `/script>`}
	{@html `<script type="application/ld+json">${jsonLdBreadcrumbStr}<` + `/script>`}
</svelte:head>

<div class="paper" translate="no" data-locale-ready={localeReady}>
	{@render children?.()}
</div>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
	class="floating-download"
	href={cvPdfHref}
	download={`Killian-OTT-CV-${i18n.locale.toUpperCase()}.pdf`}
	aria-label={i18n.ui.downloadCv}
	title={i18n.ui.downloadCv}
>
	<img src={assetUrl('icons/download.svg')} alt="" width="20" height="20" />
</a>

<!-- eslint-enable svelte/no-navigation-without-resolve -->

<div class="locale-switch" role="group" aria-label={i18n.ui.language}>
	{#each LOCALES as locale (locale)}
		<button
			type="button"
			class:active={i18n.locale === locale}
			aria-pressed={i18n.locale === locale}
			disabled={!localeReady}
			lang={locale}
			onclick={() => i18n.setLocale(locale)}
		>
			{locale.toUpperCase()}
		</button>
	{/each}
</div>

<style>
	.floating-download {
		position: fixed;
		inset-block-start: auto;
		inset-inline-start: 1rem;
		inset-block-end: 1rem;
		z-index: 50;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2.75rem;
		height: 2.75rem;
		border: 1px solid rgb(0 0 0 / 0.08);
		border-radius: 9999px;
		background: #fff;
	}

	.floating-download img {
		display: block;
		width: 1.25rem;
		height: 1.25rem;
	}

	.floating-download:hover {
		background: #f4f4f5;
	}

	.locale-switch {
		position: fixed;
		inset-inline-end: 1rem;
		inset-block-end: max(1rem, env(safe-area-inset-bottom));
		z-index: 50;
		display: inline-flex;
		gap: 2px;
		padding: 3px;
		border: 1px solid rgb(0 0 0 / 0.08);
		border-radius: 9999px;
		background: #fff;
		box-shadow: 0 2px 14px rgb(0 0 0 / 0.12);
	}

	.locale-switch button {
		appearance: none;
		min-width: 2.5rem;
		border: 0;
		border-radius: 9999px;
		background: transparent;
		color: #52525b;
		cursor: pointer;
		font: inherit;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		line-height: 1;
		padding: 0.55rem 0.65rem;
	}

	.locale-switch button:hover:not(:disabled) {
		background: #f4f4f5;
	}

	.locale-switch button:disabled {
		cursor: wait;
		opacity: 0.55;
	}

	.locale-switch button.active {
		background: #18181b;
		color: #fff;
	}

	.locale-switch button:focus-visible {
		outline: 2px solid #71717a;
		outline-offset: 2px;
	}

	@media print {
		.floating-download,
		.locale-switch {
			display: none;
		}
	}
</style>
