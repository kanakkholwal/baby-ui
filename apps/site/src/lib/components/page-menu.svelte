<script lang="ts">
let { markdownUrl, copyText }: { markdownUrl: string; copyText: string } = $props();

let open = $state(false);
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
	copied = true;
	clearTimeout(timer);
	timer = setTimeout(() => (copied = false), 1600);
}

const row =
	"flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground";
</script>

<div bind:this={root} class="relative shrink-0">
	<div class="flex items-center rounded-xl border border-border bg-card/20">
		<button
			type="button"
			onclick={copyPage}
			class="inline-flex h-8 items-center gap-1.5 rounded-l-xl px-2.5 font-medium text-foreground text-xs transition-colors hover:bg-foreground/[0.06]"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<rect x="5.5" y="5.5" width="8" height="8" rx="1.8" stroke="currentColor" stroke-width="1.3" />
				<path d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
			</svg>
			{copied ? "Copied" : "Copy Page"}
		</button>
		<button
			type="button"
			aria-label="Page options"
			aria-expanded={open}
			onclick={() => (open = !open)}
			class="grid h-8 w-7 place-items-center rounded-r-xl border-border border-l text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden="true"
				class="size-3.5 transition-transform duration-[var(--duration-dropdown)] ease-[var(--ease-out)]"
				style:transform={open ? "rotate(180deg)" : "none"}
			>
				<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	</div>

	{#if open}
		<div
			class="menu absolute top-full right-0 z-50 mt-1.5 w-52 rounded-xl border border-border bg-popover p-1 shadow-2xl"
		>

			<a href={markdownUrl} class={row}>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 shrink-0">
					<path d="M9 1.5H4A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6L9 1.5zM9 1.5V6h4.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
				</svg>
				View as Markdown
			</a>
			{#each agents as agent (agent.href)}
				<a href={agent.href} target="_blank" rel="noreferrer noopener" class={row}>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 shrink-0">
						<path d="M4 10 10 4M10 4H5.5M10 4v4.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
					{agent.label}
				</a>
			{/each}
		</div>
	{/if}
</div>


<style>
	.menu {
		transform-origin: top right;
		animation: menu-in var(--duration-dropdown) var(--ease-out);
	}

	@keyframes menu-in {
		from {
			opacity: 0;
			transform: scale(0.96);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.menu {
			animation: none;
		}
	}
</style>
