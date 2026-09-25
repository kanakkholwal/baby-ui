<script lang="ts">
import IconCheck from "@tabler/icons-svelte/icons/check";
import IconCopy from "@tabler/icons-svelte/icons/copy";
import { type TrackEvent, track } from "$lib/analytics";

let {
	text,
	iconOnly = false,
	analytics = { event: "code_copied" },
	class: classProp,
}: {
	text: string;
	iconOnly?: boolean;
	analytics?: TrackEvent;
	class?: string;
} = $props();

let copied = $state(false);
let timer: ReturnType<typeof setTimeout>;

async function copy() {
	await navigator.clipboard.writeText(text);
	// The first line names the command or the import, enough to tell copies apart.
	const snippet = text.split("\n", 1)[0].slice(0, 120);
	track(analytics.event, { snippet, ...analytics.props });
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
		"inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-border bg-card font-medium text-[11px] text-muted-foreground transition-[color,transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:text-foreground active:scale-[var(--press-scale)]",
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
