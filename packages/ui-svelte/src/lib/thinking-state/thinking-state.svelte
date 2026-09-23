<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import type { ThinkingRow } from "./types";
import { type ThinkingStateVariant, thinkingState } from "./variants";

const DOT_TONES = ["bg-accent", "bg-warning", "bg-success"];

let {
	variant = "steps",
	rows,
	activeLabel,
	doneLabel,
	thinking = false,
	query,
	icon,
	class: classProp,
}: {
	variant?: ThinkingStateVariant;
	rows: ThinkingRow[];
	activeLabel: string;
	doneLabel: string;
	thinking?: boolean;
	query?: string;
	icon?: Snippet;
	class?: string;
} = $props();

let touched = $state(false);
let manual = $state(false);
let selectedRow = $state<string | null>(null);
const expanded = $derived(touched ? manual : thinking);
const slots = $derived(thinkingState({ variant }));

let traceEl = $state<HTMLDivElement>();
let lineHeight = $state(0);
$effect(() => {
	expanded;
	rows.length;
	if (traceEl) lineHeight = traceEl.offsetHeight;
});

const uid = $props.id();
</script>

{#snippet rowContent(r: ThinkingRow, i: number)}
	{#if variant === "search"}
		<span class={cn("flex size-3.5 shrink-0 items-center justify-center rounded-full text-white", DOT_TONES[i % DOT_TONES.length] ?? "bg-accent")}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true" class="size-2.5">
				<circle cx="12" cy="12" r="9" />
				<path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
			</svg>
		</span>
	{/if}
	{#if variant === "steps"}
		{#if r.status === "active"}
			<span aria-hidden="true" class="spinner size-3 shrink-0 rounded-full border-[1.5px] border-border border-t-muted-foreground"></span>
		{:else}
			<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
				<path d="M3.5 8.4 6.4 11 12.5 4.5" />
			</svg>
		{/if}
	{/if}
	<span class={slots.label()}>{r.primary}</span>
	{#if r.secondary}
		<span class={cn("shrink-0 text-[11px] text-muted-foreground", r.mono && "font-mono")}>{r.secondary}</span>
	{/if}
	{#if r.add !== undefined}
		<span class="shrink-0 font-mono text-[11px] tabular-nums">
			<span class="text-success">+{r.add}</span> <span class="text-destructive">-{r.del}</span>
		</span>
	{/if}
{/snippet}

<div data-slot="thinking-state" class={cn("flex w-full max-w-sm flex-col", classProp)}>
	<button
		type="button"
		aria-expanded={expanded}
		aria-controls={uid}
		onclick={() => {
			touched = true;
			manual = !expanded;
		}}
		class="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-100 hover:bg-foreground/[0.06]"
	>
		<span aria-hidden="true" class="flex shrink-0 text-muted-foreground">
			{#if icon}
				{@render icon()}
			{:else}
				<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="size-4">
					<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
				</svg>
			{/if}
		</span>
		<span role="status" class="contents">
			{#if thinking}
				<span class="reasoning-shimmer whitespace-nowrap font-medium text-[13px]">{activeLabel}</span>
			{:else}
				<span class="fade-in whitespace-nowrap font-medium text-[13px] text-muted-foreground">{doneLabel}</span>
			{/if}
		</span>
		<svg
			viewBox="0 0 16 16"
			fill="none"
			stroke="currentColor"
			stroke-width="1.4"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			style="transform: {expanded ? 'rotate(180deg)' : 'none'}"
			class="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
		>
			<path d="m4 6 4 4 4-4" />
		</svg>
	</button>

	<div
		id={uid}
		class="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
		style="grid-template-rows: {expanded ? '1fr' : '0fr'}; opacity: {expanded ? 1 : 0}"
	>
		<div class="overflow-hidden">
			<div class="relative mt-1 ml-[5px] pl-4">
				<span
					aria-hidden="true"
					class="absolute left-[3px] w-px bg-border transition-[height] duration-500 ease-[var(--ease-out)]"
					style="top: -8px; height: {lineHeight ? lineHeight - 2 : 0}px"
				></span>
				<div bind:this={traceEl} class="flex flex-col gap-1 py-1">
					{#if query}
						<div class="flex h-6 items-center gap-2 px-1.5">
							<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
								<circle cx="11" cy="11" r="7" />
								<path d="M21 21l-4.3-4.3" />
							</svg>
							<span class="text-muted-foreground text-xs">{query}</span>
						</div>
					{/if}
					{#each rows as r, i (r.primary)}
						{#if variant === "search"}
							<a
								href={r.href}
								target="_blank"
								rel="noreferrer"
								style="animation-delay: {i * 80}ms"
								class={cn(slots.row(), "card-fade-up transition-colors duration-150 hover:bg-foreground/[0.06]")}
							>
								{@render rowContent(r, i)}
							</a>
						{:else if variant === "coding"}
							<button
								type="button"
								aria-pressed={selectedRow === r.primary}
								onclick={() => (selectedRow = selectedRow === r.primary ? null : r.primary)}
								style="animation-delay: {i * 80}ms"
								class={cn(slots.row(), "card-fade-up transition-colors duration-150", selectedRow === r.primary ? "bg-muted" : "hover:bg-foreground/[0.06]")}
							>
								{@render rowContent(r, i)}
							</button>
						{:else}
							<div style="animation-delay: {i * 80}ms" class={cn(slots.row(), "card-fade-up")}>
								{@render rowContent(r, i)}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
