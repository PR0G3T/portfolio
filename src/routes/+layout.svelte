<script lang="ts">
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="color-scheme" content="light" />
	<meta name="theme-color" content="#3B3B3F" />
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
