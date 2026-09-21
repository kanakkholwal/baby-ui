<script lang="ts">
import IconFileCode from "@tabler/icons-svelte/icons/file-code";
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
}: {
	code?: string;
	html?: string;
	lang?: string;
	filename?: string;
	/** Several sources in one frame, switched by tabs. Overrides code/html. */
	panels?: Panel[];
	maxHeight?: string;
} = $props();

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

const dir = $derived(filename ? filename.split("/").slice(0, -1).join("/") : null);
const name = $derived(filename ? filename.split("/").pop() : null);
const label = (l: string) => LANG_LABEL[l] ?? l.toUpperCase();

const BODY =
	"scroll-area overflow-auto py-4 font-mono text-[13px] leading-[1.7] [&_.line]:px-5 [&_.shiki]:bg-transparent [&_pre]:!bg-transparent [&_pre]:!p-0";
</script>

<CodeFrame {tabs} bind:active copyText={current.code}>
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
	{:else}
		<div style:max-height={maxHeight} class={BODY}>
			<!-- Shiki output, generated on the server from our own sources. -->
			{@html html}
		</div>
	{/if}
</CodeFrame>
