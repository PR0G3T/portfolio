<script lang="ts">
	import { assetUrl } from '$lib/utils';
	import cv from '$lib/data/cv';
</script>

<section class="fade-in pt-12 pb-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div class="flex min-w-[240px] flex-auto flex-wrap items-center gap-6">
			<img
				src={assetUrl('images/profile.png')}
				alt={cv.name}
				width="112"
				height="112"
				class="avatar"
			/>
			<div>
				<h1 class="page-title">
					{cv.name}
				</h1>
				<p class="muted mt-0">{cv.title}</p>
			</div>
		</div>
		<nav class="ml-auto flex flex-wrap items-center gap-4">
			<a
				class="icon-link linkedin"
				href="https://www.linkedin.com/in/killian-ott/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="LinkedIn"
			>
				<span
					class="svg-icon linkedin-mask"
					style={`--mask-url: url('${assetUrl('icons/linkedin.svg')}')`}
					aria-hidden="true"
				></span>
			</a>
			<a
				class="icon-link github"
				href="https://github.com/PR0G3T"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="GitHub"
			>
				<span
					class="svg-icon"
					style={`--mask-url: url('${assetUrl('icons/github.svg')}')`}
					aria-hidden="true"
				></span>
			</a>
			<a
				class="icon-link instagram"
				href="https://www.instagram.com/pr0g3t/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Instagram"
			>
				<span
					class="svg-icon"
					style={`--mask-url: url('${assetUrl('icons/instagram.svg')}')`}
					aria-hidden="true"
				></span>
			</a>
			<a
				class="icon-link facebook"
				href="https://www.facebook.com/PR0G3T/"
				target="_blank"
				rel="noopener noreferrer"
				aria-label="Facebook"
			>
				<span
					class="svg-icon"
					style={`--mask-url: url('${assetUrl('icons/facebook.svg')}')`}
					aria-hidden="true"
				></span>
			</a>
		</nav>
	</div>
</section>
