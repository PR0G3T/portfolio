<script lang="ts">
	let { src, onClose } = $props();

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
	onclick={handleBackdropClick}
	onkeydown={handleKeydown}
	role="dialog"
	tabindex="-1"
	aria-modal="true"
>
	<div
		class="relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
	>
		<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
			<h3 class="font-semibold text-gray-800">Credential Viewer</h3>
			<button
				onclick={onClose}
				class="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-200"
				aria-label="Close"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
					></line></svg
				>
			</button>
		</div>
		<div class="relative flex-1 bg-gray-100">
			<iframe {src} class="h-full w-full border-none" title="PDF Viewer"></iframe>
		</div>
	</div>
</div>
