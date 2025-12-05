<script lang="ts">
	import type { CvProjectItem } from '$lib/data/cv';

	interface Props {
		project: CvProjectItem;
	}

	let { project }: Props = $props();
</script>

<article class="item-block">
	<header class="flex flex-wrap items-baseline gap-2">
		<h3 class="item-title">{project.name}</h3>
		{#if project.link}
			<a class="link" href={project.link} rel="noopener noreferrer" target="_blank">Link</a>
		{/if}
	</header>
	<p class="description">{project.description}</p>
</article>
