<script lang="ts">
let dark = $state(true);

$effect(() => {
	const stored = localStorage.getItem("baby-ui-theme");
	dark = stored ? stored === "dark" : document.documentElement.classList.contains("dark");
});

function toggle() {
	dark = !dark;
	document.documentElement.classList.toggle("dark", dark);
	localStorage.setItem("baby-ui-theme", dark ? "dark" : "light");
}
</script>

<button
	type="button"
	onclick={toggle}
	aria-label="Switch to {dark ? 'light' : 'dark'} mode"
	class="hidden size-9 items-center justify-center rounded-2xl border border-border bg-card/20 text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:flex"
>
	{#if dark}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<path
				d="M13.5 9.4A5.8 5.8 0 0 1 6.6 2.5 5.8 5.8 0 1 0 13.5 9.4Z"
				stroke="currentColor"
				stroke-width="1.3"
				stroke-linejoin="round"
			/>
		</svg>
	{:else}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<circle cx="8" cy="8" r="3" stroke="currentColor" stroke-width="1.3" />
			<path
				d="M8 1v1.6M8 13.4V15M15 8h-1.6M2.6 8H1m11-5-1.1 1.1M5.1 10.9 4 12m8 0-1.1-1.1M5.1 5.1 4 4"
				stroke="currentColor"
				stroke-width="1.3"
				stroke-linecap="round"
			/>
		</svg>
	{/if}
</button>
