<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconChevronDown from "@tabler/icons-svelte/icons/chevron-down";
import IconCopy from "@tabler/icons-svelte/icons/copy";
import IconMarkdown from "@tabler/icons-svelte/icons/markdown";
import { track } from "$lib/analytics";

let { markdownUrl, copyText }: { markdownUrl: string; copyText: string } = $props();

let open = $state(false);
// Kept mounted after the first open so the menu can scale out as well as in.
let mounted = $state(false);
let copied = $state(false);
let root = $state<HTMLDivElement>();
let timer: ReturnType<typeof setTimeout>;

const absolute = $derived(
	typeof location === "undefined"
		? markdownUrl
		: new URL(markdownUrl, location.origin).href,
);
const ask = $derived(
	encodeURIComponent(`Read ${absolute} and help me use this component.`),
);

const agents = $derived([
	{
		label: "Open in v0",
		href: `https://v0.dev/chat/api/open?url=${encodeURIComponent(absolute)}`,
	},
	{ label: "Open in ChatGPT", href: `https://chatgpt.com/?hints=search&q=${ask}` },
	{ label: "Open in Claude", href: `https://claude.ai/new?q=${ask}` },
]);

$effect(() => {
	if (!open) return;
	mounted = true;
	const onPointer = (e: PointerEvent) => {
		if (root && !root.contains(e.target as Node)) open = false;
	};
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") open = false;
	};
	window.addEventListener("pointerdown", onPointer);
	window.addEventListener("keydown", onKey);
	return () => {
		window.removeEventListener("pointerdown", onPointer);
		window.removeEventListener("keydown", onKey);
	};
});

async function copyPage() {
	await navigator.clipboard.writeText(copyText);
	track("page_copied");
	copied = true;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = false), 1600);
}

const row =
	"flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";
</script>

<div bind:this={root} class="relative shrink-0 self-start">
	<div class="flex items-center rounded-xl border border-border bg-card/20">
		<button
			type="button"
			onclick={copyPage}
			class="inline-flex h-8 items-center gap-1.5 rounded-l-xl px-2.5 font-medium text-foreground text-xs transition-colors hover:bg-foreground/[0.06]"
		>
			<IconCopy size={14} stroke={1.6} />
			{copied ? "Copied" : "Copy Page"}
		</button>
		<button
			type="button"
			aria-label="Page options"
			aria-expanded={open}
			onclick={() => (open = !open)}
			class="grid h-8 w-7 place-items-center rounded-r-xl border-border border-l text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
		>
			<IconChevronDown
				size={14}
				stroke={1.6}
				class="transition-[transform,scale,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)]"
				style={open ? "transform: rotate(180deg)" : undefined}
			/>
		</button>
	</div>

	{#if mounted}
		<div
			data-state={open ? "open" : "closed"}
			inert={!open}
			class="absolute top-full left-0 z-50 mt-1.5 w-52 origin-top-left rounded-xl border border-border bg-popover p-1 shadow-2xl transition-[opacity,scale] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] starting:scale-[var(--enter-scale)] starting:opacity-0 data-[state=closed]:scale-[var(--enter-scale)] data-[state=closed]:opacity-0 data-[state=closed]:duration-[var(--duration-exit)] motion-reduce:transition-none sm:right-0 sm:left-auto sm:origin-top-right"
		>
			<a href={markdownUrl} class={row}>
				<IconMarkdown size={14} stroke={1.5} class="shrink-0" />
				View as Markdown
			</a>
			{#each agents as agent (agent.href)}
				<a href={agent.href} target="_blank" rel="noreferrer noopener" class={row}>
					<IconArrowUpRight size={14} stroke={1.6} class="shrink-0" />
					{agent.label}
				</a>
			{/each}
		</div>
	{/if}
</div>

