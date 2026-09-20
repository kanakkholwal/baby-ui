<script lang="ts">
import IconCheck from "@tabler/icons-svelte/icons/check";
import IconCopy from "@tabler/icons-svelte/icons/copy";

let {
	text,
	iconOnly = false,
	class: classProp,
}: { text: string; iconOnly?: boolean; class?: string } = $props();

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
		"inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card font-medium text-[11px] text-muted-foreground transition-[color,transform] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:text-foreground active:scale-[var(--press-scale)]",
		iconOnly ? "w-7 justify-center" : "px-2",
		classProp,
	]}
>
	{#if copied}
		<IconCheck size={13} stroke={2} />
		{#if !iconOnly}Copied{/if}
	{:else}
		<IconCopy size={13} stroke={1.7} />
		{#if !iconOnly}Copy{/if}
	{/if}
</button>
