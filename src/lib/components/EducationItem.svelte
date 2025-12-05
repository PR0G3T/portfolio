<script lang="ts">
	import { getSchoolLogoPath, handleImgError } from '$lib/utils';
	import type { CvEducationItem } from '$lib/data/cv';

	interface Props {
		edu: CvEducationItem;
	}

	let { edu }: Props = $props();
</script>

<article class="item-block">
	<header>
		<div class="mt-[0.1rem] flex flex-wrap items-center gap-2">
			<img
				src={getSchoolLogoPath(edu.school)}
				alt={edu.school}
				width="28"
				height="28"
				onerror={handleImgError}
				class="logo"
			/>
			<h3 class="item-title">{edu.degree}</h3>
		</div>
		<p class="organisation">{edu.school}</p>
		<p class="item-meta">{edu.period}</p>
	</header>
	{#if edu.details}
		<p class="description">{edu.details}</p>
	{/if}
	{#if edu.credentials}
		<div class="cred-buttons-container mt-1">
			{#each edu.credentials as cred (cred.label)}
				<a
					class="link cred-link inline-block"
					href={cred.href}
					rel="noopener noreferrer"
					target="_blank">{cred.label}</a
				>
			{/each}
		</div>
	{:else if edu.credential}
		<a
			class="link cred-link inline-block"
			href={edu.credential}
			rel="noopener noreferrer"
			target="_blank">{edu.credentialLabel ?? 'Credential'}</a
		>
	{/if}
</article>
