<script lang="ts">
	import { base } from '$app/paths';
	import { getIssuerLogoPath, handleImgError } from '$lib/utils';
	import type { CvCertificationItem } from '$lib/data/cv';

	interface Props {
		cert: CvCertificationItem;
	}

	let { cert }: Props = $props();

	// Resolve local paths with base prefix
	const resolveCredUrl = (url: string): string => {
		return url.startsWith('/') ? `${base}${url}` : url;
	};
</script>

<article class="item-block">
	<header>
		<div class="mt-[0.1rem] flex flex-wrap items-center gap-2">
			<img
				src={getIssuerLogoPath(cert.issuer)}
				alt={cert.issuer}
				width="28"
				height="28"
				onerror={handleImgError}
				class="logo"
			/>
			<h3 class="item-title">{cert.name}</h3>
		</div>
		<p class="organisation">{cert.issuer}</p>
		{#if cert.year}
			<p class="item-meta">{cert.year}</p>
		{/if}
	</header>
	{#if cert.subCertifications}
		<div class="cred-buttons-container">
			{#each cert.subCertifications as subCert (subCert.name)}
				<a
					class="link cred-link inline-block"
					href={resolveCredUrl(subCert.link)}
					rel="noopener noreferrer"
					target="_blank">{subCert.name}</a
				>
			{/each}
		</div>
	{:else if cert.link}
		<a
			class="link cred-link inline-block"
			href={cert.link}
			rel="noopener noreferrer"
			target="_blank">Credentials</a
		>
	{:else if cert.credentialId}
		<p class="item-meta">Credential ID: {cert.credentialId}</p>
	{/if}
</article>
