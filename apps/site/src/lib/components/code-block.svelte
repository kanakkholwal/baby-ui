<script lang="ts">
import IconFileCode from "@tabler/icons-svelte/icons/file-code";
import type { TrackEvent } from "$lib/analytics";
import { LANG_LABEL } from "$lib/highlight";
import CodeFrame from "./code-frame.svelte";

type Panel = { id: string; label: string; code: string; html: string; lang: string };

let {
	code = "",
	html = "",
	lang = "ts",
	filename,
	panels,
	maxHeight = "32rem",
	collapsible = false,
	analytics,
}: {
	code?: string;
	html?: string;
	lang?: string;
	filename?: string;
	/** Several sources in one frame, switched by tabs. Overrides code/html. */
	panels?: Panel[];
	maxHeight?: string;
	/** Start folded to a preview height with an expand control, for long reference blocks. */
	collapsible?: boolean;
	analytics?: TrackEvent;
} = $props();

let expanded = $state(false);
let contentHeight = $state(0);
// A tall block sweeping 3000px in 280ms reads as a snap; scale the time with the distance.
const foldMs = $derived(Math.min(600, 200 + Math.max(0, contentHeight - 288) / 8));

const all = $derived<Panel[]>(
	panels ?? [{ id: "single", label: filename ?? lang, code, html, lang }],
);
let active = $state("");
$effect(() => {
	if (!all.some((p) => p.id === active)) active = all[0]?.id ?? "";
});
const current = $derived(all.find((p) => p.id === active) ?? all[0]);
const activeIndex = $derived(all.findIndex((p) => p.id === active));
const tabs = $derived(
	panels ? panels.map((p) => ({ id: p.id, label: p.label })) : undefined,
);
const copyEvent = $derived(
	analytics && panels
		? { ...analytics, props: { ...analytics.props, file: current.label } }
		: analytics,
);

const dir = $derived(filename ? filename.split("/").slice(0, -1).join("/") : null);
const name = $derived(filename ? filename.split("/").pop() : null);
const label = (l: string) => LANG_LABEL[l] ?? l.toUpperCase();

const BODY =
	"scroll-area overflow-auto py-4 font-mono text-[13px] leading-[1.7] [&_.line]:px-5 [&_.shiki]:bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0";
</script>

<CodeFrame {tabs} bind:active copyText={current.code} analytics={copyEvent}>
	{#snippet title()}
		<div class="flex min-w-0 items-center gap-2 px-1 text-xs">
			<span
				class="inline-flex h-5 shrink-0 items-center rounded border border-border bg-background px-1.5 font-mono font-semibold text-[10px] text-muted-foreground uppercase tracking-wider"
			>
				{label(current.lang)}
			</span>
			{#if filename}
				<IconFileCode size={14} stroke={1.5} class="shrink-0 text-muted-foreground" />
				<span class="truncate font-mono text-muted-foreground"
					>{#if dir}<span>{dir}/</span>{/if}<span class="font-medium text-foreground">{name}</span
					></span
				>
			{/if}
		</div>
	{/snippet}

	{#if panels}
		<!-- Panels left of the active one rest off to the left, the rest off to the right,
		     so a switch slides the incoming text in from its own side. -->
		{#each all as panel, i (panel.id)}
			{@const shift = i === activeIndex ? 0 : i < activeIndex ? -1 : 1}
			<div
				role="tabpanel"
				id="panel-{panel.id}"
				aria-labelledby="tab-{panel.id}"
				inert={shift !== 0}
				style:max-height={maxHeight}
				style:translate="{shift * 1.25}rem 0"
				class={[
					BODY,
					"transition-[opacity,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
					shift === 0 ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0",
				]}
			>
				{@html panel.html}
			</div>
		{/each}
	{:else if collapsible}
		<!-- max-height animates between two lengths, so the open end is the measured content. -->
		<div
			style:max-height={expanded ? `${contentHeight + 72}px` : "18rem"}
			style:transition-duration="{foldMs}ms"
			class={[
				BODY,
				"overflow-hidden transition-[max-height,padding] ease-[var(--ease-in-out)] motion-reduce:transition-none",
				expanded && "pb-14",
			]}
		>
			<div bind:clientHeight={contentHeight}>{@html html}</div>
		</div>
		<div
			aria-hidden="true"
			class={[
				"pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent transition-opacity duration-[var(--duration-overlay)]",
				expanded ? "opacity-0" : "opacity-100",
			]}
		></div>
		<button
			type="button"
			aria-expanded={expanded}
			onclick={() => (expanded = !expanded)}
			class="-translate-x-1/2 absolute bottom-3 left-1/2 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-card px-3 font-medium text-foreground text-xs shadow-sm transition-colors hover:bg-foreground/[0.06]"
		>
			{expanded ? "Collapse" : "Expand code"}
			<svg
				viewBox="0 0 12 12"
				fill="none"
				aria-hidden="true"
				class={[
					"size-3 transition-[rotate] duration-[var(--duration-press)]",
					expanded && "rotate-180",
				]}
			>
				<path d="m3 4.5 3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

	{:else}
		<div style:max-height={maxHeight} class={BODY}>
			<!-- Shiki output, generated on the server from our own sources. -->
			{@html html}
		</div>
	{/if}
</CodeFrame>
