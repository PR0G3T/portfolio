<script lang="ts">
	import type { CvData } from '#lib/cv/types.js';
	import { formatPhone, phoneHref } from '#lib/cv/format.js';
	import { assetUrl } from '#lib/utils.js';

	interface Props {
		data: CvData;
	}

	let { data }: Props = $props();
</script>

<section class="pt-12 pb-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex min-w-[240px] flex-auto flex-wrap items-center gap-6">
			<img
				src={assetUrl('images/profile-224.webp')}
				srcset={`${assetUrl('images/profile-224.webp')} 1x, ${assetUrl('images/profile-448.webp')} 2x`}
				alt={data.name}
				width="112"
				height="112"
				class="avatar"
				decoding="async"
				fetchpriority="high"
			/>
			<div>
				<h1 class="page-title">
					{data.name}
				</h1>
				<p class="muted mt-0">{data.title}</p>
				{#if data.location}
					<p class="muted mt-0 text-xs">{data.location}</p>
				{/if}
				{#if data.email || data.phone}
					<!-- eslint-disable svelte/no-navigation-without-resolve -->
					<p class="header-contact">
						{#if data.email}
							<a href={`mailto:${data.email}`}>{data.email}</a>
						{/if}
						{#if data.phone}
							<a href={phoneHref(data.phone)}>{formatPhone(data.phone)}</a>
						{/if}
					</p>
					<!-- eslint-enable svelte/no-navigation-without-resolve -->
				{/if}
			</div>
		</div>
		<!-- eslint-disable svelte/no-navigation-without-resolve -->
		<nav class="ml-auto flex flex-wrap items-center gap-4">
			{#each data.socials.filter((s) => s.type !== 'orcid') as social (social.type)}
				<a
					href={social.href}
					class="icon-link {social.type}"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={social.label}
				>
					<span
						class="svg-icon"
						class:linkedin-mask={social.type === 'linkedin'}
						style={`--mask-url: url('${assetUrl(`icons/${social.type}.svg`)}')`}
						aria-hidden="true"
					></span>
				</a>
			{/each}
		</nav>
		<!-- eslint-enable svelte/no-navigation-without-resolve -->
	</div>
</section>

<style>
	.header-contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.15rem 0.8rem;
		margin-top: 0.35rem;
		font-size: var(--text-xs);
	}

	.header-contact a {
		color: var(--muted);
		text-decoration: none;
	}

	.header-contact a:hover {
		color: var(--text);
	}
</style>
