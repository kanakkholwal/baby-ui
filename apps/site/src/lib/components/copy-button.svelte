<script lang="ts">
let { text, class: classProp }: { text: string; class?: string } = $props();

let copied = $state(false);
let timer: ReturnType<typeof setTimeout>;

async function copy() {
	await navigator.clipboard.writeText(text);
	copied = true;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = false), 1600);
}
</script>

<button
	type="button"
	onclick={copy}
	aria-label={copied ? "Copied" : "Copy to clipboard"}
	class={[
		"inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card px-2 font-medium text-[11px] text-muted-foreground transition-[color,transform] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:text-foreground active:scale-[var(--press-scale)]",
		classProp,
	]}
>
	{#if copied}
		<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3">
			<path
				d="M3 7.4 5.6 10 11 4.2"
				stroke="currentColor"
				stroke-width="1.6"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		Copied
	{:else}
		<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3">
			<rect x="4.5" y="4.5" width="7.5" height="7.5" rx="1.6" stroke="currentColor" stroke-width="1.3" />
			<path d="M9.5 2.5H3.1A1.6 1.6 0 0 0 1.5 4.1v6.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
		</svg>
		Copy
	{/if}
</button>
