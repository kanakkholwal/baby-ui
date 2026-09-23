<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../button/button.svelte";
import Checkbox from "../checkbox/checkbox.svelte";
import HoverCard from "../hover-card/hover-card.svelte";
import HoverCardContent from "../hover-card/hover-card-content.svelte";
import HoverCardTrigger from "../hover-card/hover-card-trigger.svelte";
import { cn } from "../lib/cn";
import Popover from "../popover/popover.svelte";
import PopoverContent from "../popover/popover-content.svelte";
import PopoverTrigger from "../popover/popover-trigger.svelte";
import Switch from "../switch/switch.svelte";
import PickerSelect from "./picker-select.svelte";
import type { RecordsColumnMeta, RecordsColumnType } from "./types";
import { TYPE_GLYPHS } from "./types";

const NEW_PROPERTY_TYPES: RecordsColumnType[] = [
	"Text",
	"File",
	"Collection",
	"Single select",
	"Multi select",
	"URL",
	"Reference",
	"JSON",
	"File splitter",
];

function typeOptions() {
	return NEW_PROPERTY_TYPES.map((type) => ({ value: type, label: type }));
}

let {
	title,
	meta,
	onMetaChange,
	inputOptions,
	selectedInputs,
	onInputsChange,
	modelOptions,
	pinned,
	onTogglePin,
	onHide,
	onCalculate,
	calculating,
}: {
	title: string;
	meta: RecordsColumnMeta;
	onMetaChange: (next: Partial<RecordsColumnMeta>) => void;
	inputOptions: string[];
	selectedInputs: string[];
	onInputsChange: (next: string[]) => void;
	modelOptions: string[];
	pinned: boolean;
	onTogglePin: () => void;
	onHide?: () => void;
	onCalculate: () => void;
	calculating: boolean;
} = $props();

let grounding = $state(false);
let moreSettingsOpen = $state(false);
let advanced = $state({ required: false, allowEmpty: true, confidence: false });
</script>

{#snippet typeIcon(type: RecordsColumnType)}
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#each TYPE_GLYPHS[type] ?? TYPE_GLYPHS.Text as shape, i (i)}
			{#if shape.kind === "circle"}
				<circle cx={shape.cx} cy={shape.cy} r={shape.r} />
			{:else if shape.kind === "ellipse"}
				<ellipse cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} />
			{:else if shape.kind === "rect"}
				<rect x={shape.x} y={shape.y} width={shape.width} height={shape.height} rx={shape.rx} />
			{:else}
				<path d={shape.d} />
			{/if}
		{/each}
	</svg>
{/snippet}

{#snippet toolIcon(kind: string)}
	{#if kind === "model"}
		<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M12 3l1.7 5.1a2 2 0 0 0 1.2 1.2L20 11l-5.1 1.7a2 2 0 0 0-1.2 1.2L12 19l-1.7-5.1a2 2 0 0 0-1.2-1.2L4 11l5.1-1.7a2 2 0 0 0 1.2-1.2z" />
		</svg>
	{:else if kind === "web"}
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3a13.5 13.5 0 0 1 3.5 9 13.5 13.5 0 0 1-3.5 9 13.5 13.5 0 0 1-3.5-9A13.5 13.5 0 0 1 12 3z" />
		</svg>
	{:else}
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="8" r="4" />
			<path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
		</svg>
	{/if}
{/snippet}

{#snippet currentTypeIcon()}
	{@render typeIcon(meta.type)}
{/snippet}

{#snippet typeItemIcon(value: string)}
	{@render typeIcon(value as RecordsColumnType)}
{/snippet}

{#snippet currentToolIcon()}
	{@render toolIcon(meta.toolKind)}
{/snippet}

{#snippet modelItemIcon(_value: string)}
	{@render toolIcon("model")}
{/snippet}

<div data-slot="records-table-config-popover">
	<div class="pb-2 font-medium text-[13.5px] text-foreground">{title}</div>

	<div class="relative flex h-8 items-center justify-between">
		<span class="text-[13px] text-muted-foreground">Type</span>
		<PickerSelect
			value={meta.type}
			options={typeOptions()}
			onChange={(v) => onMetaChange({ type: v as RecordsColumnType })}
			icon={currentTypeIcon as unknown as Snippet}
			itemIcon={typeItemIcon as unknown as Snippet<[string]>}
		/>
	</div>

	<div class="relative flex h-8 items-center justify-between">
		<span class="text-[13px] text-muted-foreground">Tool</span>
		<PickerSelect
			value={meta.tool}
			options={modelOptions.map((model) => ({ value: model, label: model }))}
			onChange={(tool) => onMetaChange({ tool, toolKind: "model" })}
			icon={currentToolIcon as unknown as Snippet}
			iconClass={meta.toolKind === "model" ? "text-primary" : "text-muted-foreground"}
			itemIcon={modelItemIcon as unknown as Snippet<[string]>}
		/>
	</div>

	<div class="relative flex h-8 items-center justify-between">
		<span class="text-[13px] text-muted-foreground">Grounding</span>
		<span class="flex items-center gap-2">
			<Switch bind:checked={grounding} />
			<HoverCard>
				<HoverCardTrigger
					aria-label="About grounding"
					class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
				>
					<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="12" cy="12" r="9" />
						<path d="M12 8h.01M11 12h1v4h1" />
					</svg>
				</HoverCardTrigger>
				<HoverCardContent side="top" class="w-56 text-[12px] leading-relaxed">
					Grounding lets the model verify generated values against connected sources.
				</HoverCardContent>
			</HoverCard>
		</span>
	</div>

	<div class="relative flex h-8 items-center justify-between">
		<span class="text-[13px] text-muted-foreground">Inputs</span>
		<Popover>
			<PopoverTrigger
				class="flex h-7 max-w-[220px] items-center gap-1.5 rounded-md px-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
			>
				{#if selectedInputs.length}
					<span class="flex min-w-0 items-center gap-1">
						{#each selectedInputs.slice(0, 2) as input (input)}
							<span class="max-w-[92px] truncate rounded-[5px] bg-primary/10 px-1.5 py-0.5 font-medium text-[12px] text-primary">
								{input}
							</span>
						{/each}
						{#if selectedInputs.length > 2}
							<span class="text-[11px] font-medium text-muted-foreground">+{selectedInputs.length - 2}</span>
						{/if}
					</span>
				{:else}
					<span>Select inputs</span>
				{/if}
			</PopoverTrigger>
			<PopoverContent align="start" class="w-56 p-1.5">
				<div class="px-1.5 pt-0.5 pb-1 font-medium text-[11.5px] text-muted-foreground">Use values from</div>
				<div class="flex flex-col gap-0.5">
					{#each inputOptions as option (option)}
						<Checkbox
							label={option}
							bind:checked={
								() => selectedInputs.includes(option),
								(next) =>
									onInputsChange(
										next
											? [...selectedInputs, option]
											: selectedInputs.filter((item) => item !== option),
									)
							}
							class="min-h-8 rounded-md px-1.5 py-1 hover:bg-foreground/[0.06]"
						/>
					{/each}
				</div>
			</PopoverContent>
		</Popover>
	</div>

	{#if meta.prompt}
		<div class="mt-2 min-h-[64px] rounded-lg border border-border bg-muted p-3 text-[13px] leading-relaxed">
			<span class="text-foreground">
				{meta.prompt.before}
				{#if meta.prompt.chip}
					<span class="rounded-[5px] bg-primary/10 px-1.5 py-0.5 font-medium text-[12px] text-primary">
						{meta.prompt.chip}
					</span>
				{/if}
				{meta.prompt.after}
			</span>
		</div>
	{/if}

	<Button variant="secondary" size="sm" disabled={calculating} onclick={onCalculate} class="mt-2.5 w-full">
		<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
		</svg>
		Go calculate
	</Button>

	<div class="mt-3 flex flex-col gap-0.5 border-border border-t pt-2">
		<button
			type="button"
			aria-pressed={pinned}
			onclick={onTogglePin}
			class="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
		>
			<span class={pinned ? "text-primary" : "text-muted-foreground"}>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M12 17v5M8 3h8l-1 7 3 3H6l3-3-1-7z" />
				</svg>
			</span>
			{pinned ? "Unpin" : "Pin"}
		</button>
		<button
			type="button"
			aria-expanded={moreSettingsOpen}
			onclick={() => (moreSettingsOpen = !moreSettingsOpen)}
			class="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
		>
			<span class="text-muted-foreground">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<circle cx="12" cy="12" r="3" />
					<path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" />
				</svg>
			</span>
			<span class="flex-1">More settings</span>
			<span class={cn("text-muted-foreground transition-transform duration-150", moreSettingsOpen && "rotate-90")}>
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
					<path d="M9 6l6 6-6 6" />
				</svg>
			</span>
		</button>
		{#if onHide}
			<button
				type="button"
				onclick={onHide}
				class="flex h-8 items-center gap-2.5 rounded-md px-1.5 text-left text-[13px] text-foreground transition-colors hover:bg-foreground/[0.06]"
			>
				<span class="text-muted-foreground">
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M10.6 5.1A9.8 9.8 0 0 1 12 5c7 0 10 7 10 7a16.3 16.3 0 0 1-2.1 3M6.6 6.6A16 16 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.4-1.6M3 3l18 18" />
						<path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
					</svg>
				</span>
				Hide from view
			</button>
		{/if}
	</div>

	{#if moreSettingsOpen}
		<div class="card-fade-up mt-2 border-border border-t pt-2">
			<div class="pb-1 font-medium text-[11.5px] text-muted-foreground">Behavior</div>
			<div class="relative flex h-8 items-center justify-between">
				<span class="text-[13px] text-muted-foreground">Required value</span>
				<Switch bind:checked={advanced.required} />
			</div>
			<div class="relative flex h-8 items-center justify-between">
				<span class="text-[13px] text-muted-foreground">Allow empty results</span>
				<Switch bind:checked={advanced.allowEmpty} />
			</div>
			<div class="relative flex h-8 items-center justify-between">
				<span class="text-[13px] text-muted-foreground">Show confidence</span>
				<Switch bind:checked={advanced.confidence} />
			</div>
		</div>
	{/if}
</div>
