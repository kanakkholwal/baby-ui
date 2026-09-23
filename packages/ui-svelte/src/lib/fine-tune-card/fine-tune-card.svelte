<script lang="ts">
import { cn } from "../lib/cn";
import ScrubField from "../scrub-field/scrub-field.svelte";
import Select from "../select/select.svelte";
import SelectContent from "../select/select-content.svelte";
import SelectItem from "../select/select-item.svelte";
import SelectTrigger from "../select/select-trigger.svelte";
import SelectValue from "../select/select-value.svelte";
import type { FineTuneCardLabels, FineTuneField, FineTuneState } from "./types";
import { type FineTuneCardSize, fineTuneCard } from "./variants";

const DEFAULT_LABELS: Required<FineTuneCardLabels> = {
	title: "Untitled",
	layout: "Layout",
	type: "Type",
	placeholder: "Select type",
	adjust: "Adjust",
	edited: "Edited",
};

const SEGMENTS = ["row", "col", "grid"] as const;

function chunk<T>(items: T[], size: number): T[][] {
	const rows: T[][] = [];
	for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size));
	return rows;
}

function freshState(fs: FineTuneField[]): FineTuneState {
	return {
		segment: 0,
		values: Object.fromEntries(fs.map((f) => [f.key, f.value])),
		type: "",
	};
}

let {
	fields,
	options = [],
	labels,
	size = "md",
	id,
	state: stateProp,
	defaultState,
	onChange,
	class: classProp,
}: {
	fields: FineTuneField[];
	options?: string[];
	labels?: FineTuneCardLabels;
	size?: FineTuneCardSize;
	/** Identifies the subject `fields` describes. Changing it resets uncontrolled edits. */
	id?: string;
	state?: FineTuneState;
	defaultState?: FineTuneState;
	onChange?: (state: FineTuneState) => void;
	class?: string;
} = $props();

// svelte-ignore state_referenced_locally -- one-time seed; freshState(fields) reruns whenever `id` changes below
let internalState = $state(defaultState ?? freshState(fields));
// svelte-ignore state_referenced_locally -- plain tracking var, updated manually inside the effect below
let seenId = id;

$effect(() => {
	if (stateProp !== undefined || id === seenId) return;
	seenId = id;
	internalState = freshState(fields);
});

const text = $derived({
	title: labels?.title ?? DEFAULT_LABELS.title,
	layout: labels?.layout ?? DEFAULT_LABELS.layout,
	type: labels?.type ?? DEFAULT_LABELS.type,
	placeholder: labels?.placeholder ?? DEFAULT_LABELS.placeholder,
	adjust: labels?.adjust ?? DEFAULT_LABELS.adjust,
	edited: labels?.edited ?? DEFAULT_LABELS.edited,
});

const classes = $derived(fineTuneCard({ size }));
const current = $derived(stateProp ?? internalState);
const changed = $derived(
	fields.some((f) => (current.values[f.key] ?? f.value) !== f.value),
);
const edited = $derived(current.segment !== 0 || changed || current.type !== "");

function update(next: FineTuneState) {
	if (stateProp === undefined) internalState = next;
	onChange?.(next);
}

function selectSeg(i: number) {
	update({ ...current, segment: i });
}

function setValue(key: string, v: number) {
	update({ ...current, values: { ...current.values, [key]: v } });
}

function selectType(value: string) {
	update({ ...current, type: value });
}
</script>

{#snippet segmentIcon(kind: (typeof SEGMENTS)[number])}
	{#if kind === "row"}
		<span class="flex gap-0.5">
			{#each [0, 1, 2] as i (i)}<span class="size-1.5 rounded-[2px] border-[1.2px] border-current"></span>{/each}
		</span>
	{:else if kind === "col"}
		<span class="flex flex-col gap-0.5">
			{#each [0, 1] as i (i)}<span class="size-1.5 rounded-[2px] border-[1.2px] border-current"></span>{/each}
		</span>
	{:else}
		<span class="grid grid-cols-2 gap-0.5">
			{#each [0, 1, 2, 3] as i (i)}<span class="size-1.5 rounded-[2px] border-[1.2px] border-current"></span>{/each}
		</span>
	{/if}
{/snippet}

<div data-slot="fine-tune-card" class={cn(classes.root(), classProp)}>
	<div class="flex items-center justify-between border-border border-b px-3 py-2">
		<span class="font-medium text-[13px] text-foreground">{text.title}</span>
		{#if edited}
			<span class="pop-in flex items-center gap-1.5 font-medium text-[12px] text-success">
				<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M20 6 9 17l-5-5" />
				</svg>
				{text.edited}
			</span>
		{:else}
			<span class="flex items-center gap-1.5">
				<span class="flex size-4.5 items-center justify-center rounded-[5px] border border-primary/30 bg-primary/10 text-primary">
					<svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
					</svg>
				</span>
				<span class="reasoning-shimmer text-[12px] font-medium">{text.adjust}</span>
			</span>
		{/if}
	</div>

	<div class="flex flex-col gap-2 border-border border-b px-3 py-2.5">
		<p class="font-medium text-[12.5px] text-foreground">{text.layout}</p>
		<div class="relative grid grid-cols-3 rounded-lg bg-input p-0.5">
			<span
				aria-hidden="true"
				class="absolute inset-y-0.5 rounded-md bg-card shadow-sm transition-transform duration-300 ease-[var(--ease-out)]"
				style="width: calc((100% - 4px) / 3); left: 2px; transform: translateX({current.segment * 100}%);"
			></span>
			{#each SEGMENTS as s, i (s)}
				<button
					type="button"
					aria-label={`${s} layout`}
					aria-pressed={i === current.segment}
					onclick={() => selectSeg(i)}
					class={cn(
						"relative z-10 flex h-6 items-center justify-center transition-colors duration-200",
						i === current.segment ? "text-primary" : "text-muted-foreground",
					)}
				>
					{@render segmentIcon(s)}
				</button>
			{/each}
		</div>
		{#each chunk(fields, 2) as pair (pair.map((f) => f.key).join("-"))}
			<div class="grid min-w-0 grid-cols-2 gap-2">
				{#each pair as field (field.key)}
					<ScrubField
						label={field.label}
						value={current.values[field.key] ?? field.value}
						onValueChange={(v) => setValue(field.key, v)}
						min={field.min}
						max={field.max}
						step={field.step}
						suffix={field.suffix}
						tone={(current.values[field.key] ?? field.value) !== field.value ? "edited" : "default"}
					/>
				{/each}
			</div>
		{/each}
	</div>

	{#if options.length > 0}
		<div class="flex items-center justify-between px-3 py-2">
			<span class="text-[12px] text-muted-foreground">{text.type}</span>
			<Select
				bind:value={() => current.type, selectType}
				items={options.map((item) => ({ value: item, label: item }))}
			>
				<SelectTrigger class="h-6.5 w-30 rounded-lg px-2 text-[12px]">
					<SelectValue placeholder={text.placeholder} />
				</SelectTrigger>
				<SelectContent align="end">
					{#each options as item (item)}
						<SelectItem value={item} label={item} />
					{/each}
				</SelectContent>
			</Select>
		</div>
	{/if}
</div>
