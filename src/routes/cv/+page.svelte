<script lang="ts">
	import { browser } from '$app/env';
	import { resolve } from '$app/paths';
	import Resume from '#lib/cv/Resume.svelte';
	import { ResumeFitController, type FitResult } from '#lib/cv/fit-controller.js';
	import { buildResumeModel } from '#lib/cv/model.js';
	import { PreviewScaler } from '#lib/cv/preview.js';
	import { createLocaleState } from '#lib/i18n/locale.svelte.js';
	import { assetUrl } from '#lib/utils.js';

	const i18n = createLocaleState();
	const model = $derived(buildResumeModel(i18n.cv, i18n.locale));
	const ui = $derived(i18n.ui);
	const pdfHref = $derived(assetUrl(`CV${i18n.locale === 'fr' ? '-fr' : ''}.pdf`));

	let pageEl = $state<HTMLElement>();
	let sheetEl = $state<HTMLElement>();
	let viewportEl = $state<HTMLElement>();
	let frameEl = $state<HTMLElement>();
	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let result = $state<FitResult | null>(null);
	let localeReady = $state(false);

	const statusLabel = $derived(
		status === 'loading'
			? ui.preparing
			: status === 'error'
				? ui.error
				: result?.feasible
					? ui.ready
					: ui.overflow
	);

	$effect(() => {
		if (!browser) return;
		i18n.syncFromEnvironment();
		localeReady = true;
	});

	$effect(() => {
		if (!browser || !localeReady || !pageEl || !sheetEl || !viewportEl || !frameEl) return;

		// Re-fit whenever the localized content changes.
		void model;
		status = 'loading';
		result = null;

		let disposed = false;
		const scaler = new PreviewScaler(viewportEl, frameEl, pageEl);
		const stopPreview = scaler.start();

		new ResumeFitController(pageEl, sheetEl)
			.run()
			.then((fit) => {
				if (disposed) return;
				result = fit;
				status = 'ready';
				scaler.update();
			})
			.catch((error: unknown) => {
				if (disposed) return;
				console.error('[cv] fit failed', error);
				status = 'error';
			});

		return () => {
			disposed = true;
			stopPreview();
		};
	});
</script>

<svelte:head>
	<title>CV — Killian OTT</title>
	<meta name="description" content={ui.pdfDescription} />
	<meta name="author" content="Killian OTT" />
	<meta name="robots" content="noindex, follow" />
	<link
		rel="preload"
		href={assetUrl('fonts/inter-display/print/InterDisplay-Regular.woff2')}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href={assetUrl('fonts/inter-display/print/InterDisplay-Medium.woff2')}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href={assetUrl('fonts/inter-display/print/InterDisplay-SemiBold.woff2')}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
	<link
		rel="preload"
		href={assetUrl('fonts/inter-display/print/InterDisplay-Bold.woff2')}
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="cv-shell" data-state={status}>
	<header class="cv-toolbar">
		<a class="back" href={resolve('/(portfolio)')}>← {ui.portfolio}</a>
		<div class="toolbar-actions">
			<p class="status" data-status={status} aria-live="polite">
				<span class="status-dot" aria-hidden="true"></span>
				{statusLabel}
			</p>
			<!-- eslint-disable svelte/no-navigation-without-resolve -->
			<a
				class="print"
				href={pdfHref}
				download={`Killian-OTT-CV-${i18n.locale.toUpperCase()}.pdf`}
				title={ui.printHint}
			>
				{ui.savePdf}
			</a>
			<!-- eslint-enable svelte/no-navigation-without-resolve -->
		</div>
	</header>

	<main class="cv-viewport" bind:this={viewportEl}>
		<div class="cv-frame" bind:this={frameEl}>
			<article
				class="cv-page"
				bind:this={pageEl}
				data-cv-page
				data-cv-state={status}
				aria-label={ui.cvAriaLabel}
			>
				<div class="cv-sheet" bind:this={sheetEl}>
					<Resume {model} {ui} />
				</div>
			</article>
		</div>
	</main>
</div>

<style>
	.cv-shell {
		min-height: 100svh;
		background: var(--canvas);
		color: var(--text);
	}

	.cv-toolbar {
		position: sticky;
		inset-block-start: 0;
		z-index: 10;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem clamp(1rem, 4vw, 2.5rem);
		padding: 0.75rem clamp(1rem, 4vw, 2.5rem);
		background: rgb(45 45 49 / 0.92);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgb(255 255 255 / 0.08);
		color: #f4f4f5;
	}

	.back {
		color: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.01em;
		text-decoration: none;
	}

	.back:hover {
		text-decoration: underline;
	}

	.back:focus-visible,
	.print:focus-visible {
		outline: 2px solid #a1a1aa;
		outline-offset: 3px;
	}

	.toolbar-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1.25rem;
		margin-inline-start: auto;
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		font-size: 0.78rem;
		color: #d4d4d8;
	}

	.status-dot {
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 9999px;
		background: #a1a1aa;
	}

	[data-status='ready'] .status-dot {
		background: #4ade80;
	}

	[data-status='error'] .status-dot {
		background: #f87171;
	}

	[data-state='ready'] [data-status='ready'] .status-dot {
		box-shadow: 0 0 0 3px rgb(74 222 128 / 0.15);
	}

	.print {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(255 255 255 / 0.25);
		border-radius: 9999px;
		background: #fff;
		color: #18181b;
		cursor: pointer;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 650;
		line-height: 1;
		padding: 0.62rem 1.05rem;
		text-decoration: none;
		transition:
			background-color 120ms ease,
			transform 120ms ease;
	}

	.print:hover {
		background: #f4f4f5;
	}

	.print:active {
		transform: translateY(1px);
	}

	.cv-viewport {
		overflow-x: auto;
		padding: clamp(1rem, 4vw, 3rem) 1rem 4rem;
	}

	.cv-frame {
		--preview-scale: 1;
		width: calc(210mm * var(--preview-scale));
		height: calc(297mm * var(--preview-scale));
		margin-inline: auto;
		overflow: hidden;
	}

	.cv-page {
		box-sizing: border-box;
		width: 210mm;
		height: 297mm;
		padding: 13mm 15mm;
		background: #fff;
		color: #0a0a0a;
		overflow: hidden;
		transform: scale(var(--preview-scale));
		transform-origin: top left;
		box-shadow:
			0 1px 2px rgb(0 0 0 / 0.18),
			0 24px 70px rgb(0 0 0 / 0.38);
	}

	.cv-sheet {
		height: auto;
	}

	@media (max-width: 640px) {
		.cv-toolbar {
			position: static;
		}

		.cv-viewport {
			padding: 0.75rem 0.5rem 2.5rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.print {
			transition: none;
		}
	}

	@page {
		size: 210mm 297mm;
		margin: 0;
	}

	@media print {
		:global(html),
		:global(body) {
			width: 210mm;
			height: 297mm;
			margin: 0 !important;
			padding: 0 !important;
			background: #fff !important;
			overflow: hidden;
		}

		.cv-shell {
			min-height: 0;
			background: #fff;
		}

		.cv-toolbar {
			display: none !important;
		}

		.cv-viewport {
			overflow: visible;
			padding: 0;
		}

		.cv-frame {
			width: auto;
			height: auto;
			overflow: visible;
		}

		.cv-page {
			width: 210mm;
			height: 297mm;
			margin: 0;
			transform: none;
			box-shadow: none;
		}
	}
</style>
