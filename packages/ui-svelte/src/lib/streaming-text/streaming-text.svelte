<script lang="ts">
import { cn } from "../lib/cn";
import type { StreamingSource, StreamingToken } from "./types";
import { type StreamingTextLayout, streamingText } from "./variants";

const WORD_DELAY = 55;

let {
	layout = "inline",
	content,
	sources = [],
	followUps = [],
	sourcesLabel,
	followUpsLabel = "Follow-ups",
	wordDelay = WORD_DELAY,
	onDone,
	onFollowUp,
	onRetry,
	onFeedback,
	class: classProp,
}: {
	layout?: StreamingTextLayout;
	content: StreamingToken[];
	sources?: StreamingSource[];
	followUps?: string[];
	sourcesLabel?: string;
	followUpsLabel?: string;
	wordDelay?: number;
	onDone?: () => void;
	onFollowUp?: (text: string, index: number) => void;
	onRetry?: () => void;
	onFeedback?: (positive: boolean) => void;
	class?: string;
} = $props();

let count = $state(0);
let sourcesOpen = $state(false);
let copied = $state(false);
const done = $derived(count >= content.length);
const slots = $derived(streamingText({ layout }));

$effect(() => {
	if (count >= content.length) return;
	const t = setTimeout(() => {
		count = Math.min(content.length, count + 1);
	}, wordDelay);
	return () => clearTimeout(t);
});

let settled = false;
$effect(() => {
	if (!done || settled) return;
	settled = true;
	onDone?.();
});

async function copyText() {
	const plain = content.map((t) => t.text).join(" ");
	try {
		await navigator.clipboard.writeText(plain);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1500);
	} catch {
		// Clipboard access can be denied outside a secure context; nothing to fall back to here.
	}
}
</script>

<div data-slot="streaming-text" class={cn(slots.root(), classProp)}>
	<p class={slots.text()}>
		{#each content.slice(0, count) as token, i (i)}
			{#if token.cite !== undefined}
				{const source = sources[token.cite]}
				{#if source}
					<a
						href={source.href}
						target="_blank"
						rel="noreferrer"
						class="pop-in mr-1 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[5px] bg-muted px-[3px] align-middle font-mono text-[10.5px] text-muted-foreground shadow-xs transition-colors duration-150 hover:bg-foreground/[0.06] hover:text-foreground"
					>
						<img src={source.image} alt="" class="size-3 rounded-[3px]" />
						<span>{source.domain}</span>
					</a>
				{/if}
			{:else}
				<span>{token.text + " "}</span>
			{/if}
		{/each}
		{#if !done}
			<span aria-hidden="true" class="stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current"></span>
		{/if}
	</p>

	<div
		class="mt-2 flex items-center gap-0.5 transition-opacity duration-400"
		style="opacity: {done ? 1 : 0}; pointer-events: {done ? 'auto' : 'none'}"
	>
		<button
			type="button"
			onclick={copyText}
			aria-label={copied ? "Copied" : "Copy"}
			class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground"
		>
			{#if copied}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path d="M3.5 8.4 6.4 11 12.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{:else}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<rect x="5.5" y="5.5" width="8" height="8" rx="1.6" stroke="currentColor" stroke-width="1.3" />
					<path d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
				</svg>
			{/if}
		</button>
		{#if onRetry}
			<button
				type="button"
				onclick={onRetry}
				aria-label="Retry"
				class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path d="M13 8a5 5 0 1 1-1.6-3.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
					<path d="M13 2.5V5h-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		{/if}
		{#if onFeedback}
			<button
				type="button"
				onclick={() => onFeedback?.(true)}
				aria-label="Good response"
				class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path d="M6 14V6.5l3-4.5 1 .8-1 3.2h4.3a1 1 0 0 1 1 1.2l-1 5a1 1 0 0 1-1 .8H6Zm0 0H3.5A1.5 1.5 0 0 1 2 12.5v-4A1.5 1.5 0 0 1 3.5 7H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
			<button
				type="button"
				onclick={() => onFeedback?.(false)}
				aria-label="Bad response"
				class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 rotate-180">
					<path d="M6 14V6.5l3-4.5 1 .8-1 3.2h4.3a1 1 0 0 1 1 1.2l-1 5a1 1 0 0 1-1 .8H6Zm0 0H3.5A1.5 1.5 0 0 1 2 12.5v-4A1.5 1.5 0 0 1 3.5 7H6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</button>
		{/if}
		{#if sources.length}
			<button
				type="button"
				aria-expanded={sourcesOpen}
				onclick={() => (sourcesOpen = !sourcesOpen)}
				class="ml-1.5 flex items-center gap-1.5 rounded-md px-1 py-0.5 text-left transition-colors duration-150 hover:bg-foreground/[0.06]"
			>
				<span class="flex -space-x-1">
					{#each sources as source (source.domain)}
						<img src={source.image} alt="" class="size-3.5 rounded-full bg-card shadow-[0_0_0_1.5px_var(--background)]" />
					{/each}
				</span>
				<span class="text-[12px] text-muted-foreground">
					{sourcesLabel ?? `${sources.length} source${sources.length === 1 ? "" : "s"}`}
				</span>
			</button>
		{/if}
	</div>

	{#if sources.length}
		<div
			class="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
			style="grid-template-rows: {done && sourcesOpen ? '1fr' : '0fr'}; opacity: {done && sourcesOpen ? 1 : 0}"
		>
			<div class="overflow-hidden">
				<div class="mt-1.5 flex flex-col rounded-[10px] bg-muted p-1 shadow-xs">
					{#each sources as source (source.domain)}
						<a
							href={source.href}
							target="_blank"
							rel="noreferrer"
							class="flex items-center gap-2 rounded-md px-1.5 py-1 text-[12px] text-muted-foreground transition-colors duration-150 hover:bg-foreground/[0.06] hover:text-foreground"
						>
							<img src={source.image} alt="" class="size-4 rounded-[4px]" />
							<span>{source.name}</span>
							<span class="ml-auto font-mono text-[10.5px] text-muted-foreground/70">{source.domain}</span>
						</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	{#if followUps.length}
		<div class="mt-2.5 transition-opacity duration-400" style="opacity: {done ? 1 : 0}; pointer-events: {done ? 'auto' : 'none'}">
			<p class="font-medium text-[12px] text-muted-foreground">{followUpsLabel}</p>
			<div class="mt-0.5 flex flex-col">
				{#each followUps as label, i (label)}
					<button
						type="button"
						onclick={() => onFollowUp?.(label, i)}
						class="-mx-1.5 flex items-center gap-2 rounded-md border-border border-b px-1.5 py-1.5 text-left text-[12.5px] text-foreground transition-colors duration-100 last:border-0 hover:bg-foreground/[0.06]"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3 shrink-0 text-muted-foreground">
							<path d="M9 10l-5 5 5 5" />
							<path d="M20 4v7a4 4 0 0 1-4 4H4" />
						</svg>
						{label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
