<script lang="ts">
	import {
		companyLogoFallback,
		displayCompany,
		getCompanyLogoPath,
		handleImgError
	} from '#lib/utils.js';
	import type { CvExperienceItem } from '#lib/cv/types.js';

	interface Props {
		exp: CvExperienceItem;
	}

	let { exp }: Props = $props();
</script>

<article class="item-block">
	<header>
		<div class="mt-[0.1rem] flex flex-wrap items-center gap-2">
			<img
				src={getCompanyLogoPath(exp.company)}
				alt={exp.company}
				width="28"
				height="28"
				onerror={(event) => handleImgError(event, companyLogoFallback)}
				class="logo"
				loading="lazy"
				decoding="async"
			/>
			<h3 class="item-title">{exp.role}</h3>
		</div>
		<p class="organisation">{displayCompany(exp.company)}</p>
		<p class="item-meta">{exp.period}</p>
		{#if exp.location}
			<p class="item-meta">{exp.location}</p>
		{/if}
	</header>
	<div>
		{#each exp.items as item (item)}
			<p class="description">{item}</p>
		{/each}
	</div>
</article>
