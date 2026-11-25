<script lang="ts">
	import {
		companyLogoFallback,
		getIssuerLogoPath,
		handleImgError,
		resolveUrl
	} from '#lib/utils.js';
	import type { CvCertificationItem } from '#lib/cv/types.js';
	import { getLocaleContext } from '#lib/i18n/locale.svelte.js';

	interface Props {
		cert: CvCertificationItem;
	}

	let { cert }: Props = $props();
	const i18n = getLocaleContext();
	const ui = $derived(i18n.ui);
</script>

<article class="item-block">
	<header>
		<div class="mt-[0.1rem] flex flex-wrap items-center gap-2">
			<img
				src={getIssuerLogoPath(cert.issuer)}
				alt={cert.issuer}
				width="28"
				height="28"
				onerror={(event) => handleImgError(event, companyLogoFallback)}
				class="logo"
				loading="lazy"
				decoding="async"
			/>
			<h3 class="item-title">{cert.name}</h3>
		</div>
		<p class="organisation">{cert.issuer}</p>
		{#if cert.year}
			<p class="item-meta">{cert.year}</p>
		{/if}
	</header>
	{#if cert.subCertifications}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<div class="cred-buttons-container">
			{#each cert.subCertifications as subCert (subCert.name)}
				{#if subCert.link}
					<a
						href={resolveUrl(subCert.link)}
						class="link cred-link inline-block"
						rel="noopener noreferrer"
						target="_blank"
					>
						{subCert.name}
					</a>
				{:else}
					<span class="link cred-link cred-static inline-block">{subCert.name}</span>
				{/if}
			{/each}
		</div>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{:else if cert.link}
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<a
			href={cert.link}
			class="link cred-link inline-block"
			rel="noopener noreferrer"
			target="_blank"
		>
			{ui.credentials}
		</a>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	{:else if cert.credentialId}
		<p class="item-meta">{ui.credentialId}: {cert.credentialId}</p>
	{/if}
</article>
