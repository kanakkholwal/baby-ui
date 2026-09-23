<script lang="ts">
import Checkbox from "../checkbox/checkbox.svelte";
import DropdownMenu from "../dropdown-menu/dropdown-menu.svelte";
import DropdownMenuContent from "../dropdown-menu/dropdown-menu-content.svelte";
import DropdownMenuItem from "../dropdown-menu/dropdown-menu-item.svelte";
import DropdownMenuTrigger from "../dropdown-menu/dropdown-menu-trigger.svelte";
import { cn } from "../lib/cn";
import Popover from "../popover/popover.svelte";
import PopoverContent from "../popover/popover-content.svelte";
import PopoverTrigger from "../popover/popover-trigger.svelte";
import ConfigPopover from "./config-popover.svelte";
import TagList from "./tag-list.svelte";
import type {
	ColumnKey,
	RecordRow,
	RecordSortKey,
	RecordsColumnMeta,
	RecordsTableLabels,
} from "./types";
import { TYPE_GLYPHS } from "./types";
import { type RecordsDensity, recordsTable, strengthDot } from "./variants";

const COMFORTABLE_WIDTHS: Record<ColumnKey, number> = {
	company: 270,
	categories: 275,
	last: 190,
	strength: 210,
	links: 175,
	ai: 240,
};

const COMPACT_WIDTHS: Record<ColumnKey, number> = {
	company: 220,
	categories: 220,
	last: 155,
	strength: 180,
	links: 160,
	ai: 200,
};

const STRENGTH_LABEL: Record<string, string> = {
	strong: "Very strong",
	weak: "Weak",
	veryweak: "Very weak",
	none: "No communication",
};

const DEFAULT_LABELS: RecordsTableLabels = {
	company: "Company",
	categories: "Categories",
	last: "Last interaction",
	strength: "Connection strength",
	links: "Links",
	ai: "AI column",
};

function defaultMeta(): Record<ColumnKey, RecordsColumnMeta> {
	return {
		company: { type: "Text", tool: "User input", toolKind: "user" },
		categories: {
			type: "Multi select",
			tool: "User input",
			toolKind: "user",
			inputs: "Company",
			prompt: {
				before: "Tag each ",
				chip: "Company",
				after: " with its market categories.",
			},
		},
		last: { type: "Date", tool: "User input", toolKind: "user" },
		strength: {
			type: "Single select",
			tool: "User input",
			toolKind: "user",
			inputs: "Last interaction",
			prompt: {
				before: "Score the relationship from ",
				chip: "Last interaction",
				after: ".",
			},
		},
		links: {
			type: "URL",
			tool: "Web search",
			toolKind: "web",
			inputs: "Company",
			prompt: { before: "Find the website for ", chip: "Company", after: "." },
		},
		ai: { type: "Text", tool: "Web search", toolKind: "web", inputs: "Company" },
	};
}

function strengthRank(strength: RecordRow["strength"]) {
	return strength === "strong"
		? 3
		: strength === "weak"
			? 2
			: strength === "veryweak"
				? 1
				: 0;
}

let {
	rows,
	labels,
	fill = false,
	density = "comfortable",
	modelOptions = [],
	calculatingColumn = null,
	resolvedCount = 0,
	onCalculate,
	class: classProp,
}: {
	rows: RecordRow[];
	labels?: Partial<RecordsTableLabels>;
	fill?: boolean;
	density?: RecordsDensity;
	modelOptions?: string[];
	/** Column currently revealing computed values row by row. `null`/omitted shows none. */
	calculatingColumn?: string | null;
	/** Row count already resolved for `calculatingColumn`. */
	resolvedCount?: number;
	/** Fired when "Go calculate" is pressed; the caller owns the reveal timing. */
	onCalculate?: (column: ColumnKey) => void;
	class?: string;
} = $props();

const text: RecordsTableLabels = $derived({ ...DEFAULT_LABELS, ...labels });
let selected = $state<Set<string>>(new Set());
let sort = $state<{ key: RecordSortKey; dir: 1 | -1 }>({ key: "name", dir: 1 });
// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useState(initialValue)
let columnWidths = $state<Record<ColumnKey, number>>(
	density === "compact" ? { ...COMPACT_WIDTHS } : { ...COMFORTABLE_WIDTHS },
);
let resizingColumn = $state<ColumnKey | null>(null);
let openColumn = $state<ColumnKey | null>(null);
let columnOverrides = $state<Partial<Record<ColumnKey, Partial<RecordsColumnMeta>>>>({});
let inputSelections = $state<Partial<Record<ColumnKey, string[]>>>({});
let pinnedColumns = $state<Set<ColumnKey>>(new Set());
let aiAdded = $state(false);
const meta = defaultMeta();

const visibleRows = $derived(
	[...rows].sort((a, b) => {
		const value =
			sort.key === "name"
				? a.name.localeCompare(b.name)
				: sort.key === "last"
					? a.last.localeCompare(b.last)
					: strengthRank(a.strength) - strengthRank(b.strength);
		return value * sort.dir;
	}),
);

function columnMeta(key: ColumnKey): RecordsColumnMeta {
	return { ...meta[key], ...columnOverrides[key] };
}

function updateMeta(key: ColumnKey, next: Partial<RecordsColumnMeta>) {
	columnOverrides = { ...columnOverrides, [key]: { ...columnOverrides[key], ...next } };
}

function isCalc(col: ColumnKey, index: number) {
	return calculatingColumn === col && index >= resolvedCount;
}

const allSelected = $derived(
	visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id)),
);
const partiallySelected = $derived(
	!allSelected && visibleRows.some((row) => selected.has(row.id)),
);

function toggleSort(key: RecordSortKey) {
	sort = sort.key === key ? { key, dir: (sort.dir * -1) as 1 | -1 } : { key, dir: 1 };
}

function toggleRow(id: string) {
	const next = new Set(selected);
	if (next.has(id)) next.delete(id);
	else next.add(id);
	selected = next;
}

function toggleAll() {
	const next = new Set(selected);
	if (allSelected) for (const row of visibleRows) next.delete(row.id);
	else for (const row of visibleRows) next.add(row.id);
	selected = next;
}

function startColumnResize(key: ColumnKey, minWidth = 120) {
	return (event: PointerEvent) => {
		event.preventDefault();
		event.stopPropagation();
		openColumn = null;

		const startX = event.clientX;
		const startWidth = columnWidths[key];
		document.body.style.cursor = "col-resize";
		document.body.style.userSelect = "none";
		resizingColumn = key;

		function move(moveEvent: PointerEvent) {
			const width = Math.max(minWidth, startWidth + moveEvent.clientX - startX);
			columnWidths = { ...columnWidths, [key]: width };
		}
		function finish() {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", finish);
			window.removeEventListener("pointercancel", finish);
			document.body.style.cursor = "";
			document.body.style.userSelect = "";
			resizingColumn = null;
		}

		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", finish);
		window.addEventListener("pointercancel", finish);
	};
}

const tableWidth = $derived(
	columnWidths.company +
		columnWidths.categories +
		columnWidths.last +
		columnWidths.strength +
		columnWidths.links +
		(aiAdded ? columnWidths.ai : 0) +
		56,
);

function inputOptionsFor(exclude: ColumnKey) {
	return (["company", "categories", "last", "strength", "links"] as ColumnKey[])
		.filter((key) => key !== exclude)
		.map((key) => text[key]);
}

function selectedInputsFor(key: ColumnKey) {
	return inputSelections[key] ?? (meta[key].inputs ? [meta[key].inputs as string] : []);
}

function togglePin(key: ColumnKey) {
	const next = new Set(pinnedColumns);
	if (next.has(key)) next.delete(key);
	else next.add(key);
	pinnedColumns = next;
}

const classes = $derived(recordsTable({ density }));
</script>

{#snippet sortIcon(sortKey: RecordSortKey, label: string)}
	<button
		type="button"
		aria-label={`Sort by ${label}`}
		onclick={(event) => {
			event.stopPropagation();
			toggleSort(sortKey);
		}}
		class={cn(
			"shrink-0 cursor-pointer text-muted-foreground transition-opacity",
			sort.key === sortKey ? "opacity-100" : "opacity-0 hover:opacity-60",
		)}
		style:transform={sort.key === sortKey && sort.dir === -1 ? "rotate(180deg)" : undefined}
	>
		<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M12 5v14M5 12l7 7 7-7" />
		</svg>
	</button>
{/snippet}

{#snippet resizeHandle(key: ColumnKey, label: string, minWidth?: number)}
	<!-- svelte-ignore a11y_no_static_element_interactions -- pointer drag handle, not a real separator control -->
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -- a column resize handle can't be a semantic <hr> -->
	<span
		role="separator"
		aria-orientation="vertical"
		aria-label={`Resize ${label} column`}
		onpointerdown={startColumnResize(key, minWidth)}
		class={cn(
			"-right-0.5 absolute inset-y-0 w-1 cursor-col-resize touch-none",
			resizingColumn === key && "bg-primary/40",
		)}
	></span>
{/snippet}

{#snippet typeIcon(key: ColumnKey)}
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
		{#each TYPE_GLYPHS[columnMeta(key).type] ?? TYPE_GLYPHS.Text as shape, i (i)}
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

{#snippet headerCell(key: ColumnKey, label: string, sortKey: RecordSortKey | undefined, minWidth?: number)}
	<th
		class={cn(
			classes.headerCell(),
			"relative border-border border-r border-b bg-card text-left font-medium text-[12.5px] text-muted-foreground",
			openColumn === key && "bg-primary/[0.04]",
		)}
	>
		<div class="flex min-w-0 items-center gap-1.5">
			<Popover bind:open={() => openColumn === key, (v) => (openColumn = v ? key : null)}>
				<PopoverTrigger
					class="min-w-0 items-center gap-1.5 truncate rounded-md px-1 hover:bg-foreground/[0.06]"
					aria-label={`Configure ${label}`}
				>
					{@render typeIcon(key)}
					<span class="truncate">{label}</span>
				</PopoverTrigger>
				<PopoverContent align="start" class="w-80 p-3">
					<ConfigPopover
						title={text[key]}
						meta={columnMeta(key)}
						onMetaChange={(next) => updateMeta(key, next)}
						inputOptions={inputOptionsFor(key)}
						selectedInputs={selectedInputsFor(key)}
						onInputsChange={(next) => (inputSelections = { ...inputSelections, [key]: next })}
						{modelOptions}
						pinned={pinnedColumns.has(key)}
						onTogglePin={() => togglePin(key)}
						calculating={calculatingColumn != null}
						onCalculate={() => {
							onCalculate?.(key);
							openColumn = null;
						}}
					/>
				</PopoverContent>
			</Popover>
			{#if sortKey}
				{@render sortIcon(sortKey, label)}
			{/if}
		</div>
		{@render resizeHandle(key, label, minWidth)}
	</th>
{/snippet}

{#snippet calcCell()}
	<span class="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
		Calculating…
		<span class="size-1.5 animate-pulse rounded-full bg-muted-foreground"></span>
	</span>
{/snippet}

<div data-slot="records-table" class={cn(classes.root(), fill ? "w-full" : "w-fit max-w-full", classProp)}>
	<div data-slot="records-table-scroll" class="overflow-auto rounded-2xl border border-border" style="scrollbar-width: thin;">
		<table class="border-collapse text-[13px]" style="width: {fill ? '100%' : `${tableWidth}px`}; min-width: {tableWidth}px;">
			<colgroup>
				<col style="width: {columnWidths.company}px;" />
				<col style="width: {columnWidths.categories}px;" />
				<col style="width: {columnWidths.last}px;" />
				<col style="width: {columnWidths.strength}px;" />
				<col style="width: {columnWidths.links}px;" />
				{#if aiAdded}<col style="width: {columnWidths.ai}px;" />{/if}
				<col style="width: 56px;" />
			</colgroup>
			<thead>
				<tr>
					<th class={cn(classes.headerCell(), "border-border border-r border-b bg-card text-left", openColumn === "company" && "bg-primary/[0.04]")}>
						<div class="flex items-center gap-2">
							<Checkbox
								bind:checked={() => allSelected, () => toggleAll()}
								indeterminate={partiallySelected}
								label=""
								class="shrink-0"
							/>
							<Popover bind:open={() => openColumn === "company", (v) => (openColumn = v ? "company" : null)}>
								<PopoverTrigger class="min-w-0 truncate rounded-md px-1 font-medium text-[12.5px] text-muted-foreground hover:bg-foreground/[0.06]">
									{text.company}
								</PopoverTrigger>
								<PopoverContent align="start" class="w-80 p-3">
									<ConfigPopover
										title={text.company}
										meta={columnMeta("company")}
										onMetaChange={(next) => updateMeta("company", next)}
										inputOptions={inputOptionsFor("company")}
										selectedInputs={selectedInputsFor("company")}
										onInputsChange={(next) => (inputSelections = { ...inputSelections, company: next })}
										{modelOptions}
										pinned={pinnedColumns.has("company")}
										onTogglePin={() => togglePin("company")}
										calculating={calculatingColumn != null}
										onCalculate={() => {
											onCalculate?.("company");
											openColumn = null;
										}}
									/>
								</PopoverContent>
							</Popover>
						</div>
					</th>
					{@render headerCell("categories", text.categories, undefined)}
					{@render headerCell("last", text.last, "last")}
					{@render headerCell("strength", text.strength, "strength")}
					{@render headerCell("links", text.links, undefined)}
					{#if aiAdded}
						<th class={cn(classes.headerCell(), "border-border border-r border-b bg-card text-left", openColumn === "ai" && "bg-primary/[0.04]")}>
							<Popover bind:open={() => openColumn === "ai", (v) => (openColumn = v ? "ai" : null)}>
								<PopoverTrigger class="min-w-0 truncate rounded-md px-1 font-medium text-[12.5px] text-muted-foreground hover:bg-foreground/[0.06]">
									{text.ai}
								</PopoverTrigger>
								<PopoverContent align="start" class="w-80 p-3">
									<ConfigPopover
										title={text.ai}
										meta={columnMeta("ai")}
										onMetaChange={(next) => updateMeta("ai", next)}
										inputOptions={inputOptionsFor("ai")}
										selectedInputs={selectedInputsFor("ai")}
										onInputsChange={(next) => (inputSelections = { ...inputSelections, ai: next })}
										{modelOptions}
										pinned={pinnedColumns.has("ai")}
										onTogglePin={() => togglePin("ai")}
										onHide={() => {
											aiAdded = false;
											openColumn = null;
										}}
										calculating={calculatingColumn != null}
										onCalculate={() => {
											onCalculate?.("ai");
											openColumn = null;
										}}
									/>
								</PopoverContent>
							</Popover>
						</th>
					{/if}
					<th class={cn(classes.headerCell(), "border-border border-b bg-card px-2")}>
						<div class="flex items-center gap-1">
							<DropdownMenu>
								<DropdownMenuTrigger
									aria-label="New property"
									class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
								>
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M12 5v14M5 12h14" />
									</svg>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem
										onclick={() => {
											aiAdded = true;
											openColumn = "ai";
										}}
									>
										{text.ai}
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
							<DropdownMenu>
								<DropdownMenuTrigger
									aria-label="Table options"
									class="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
								>
									<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
										<circle cx="5" cy="12" r="1.6" />
										<circle cx="12" cy="12" r="1.6" />
										<circle cx="19" cy="12" r="1.6" />
									</svg>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onclick={() => (aiAdded = true)}>Add property</DropdownMenuItem>
									<DropdownMenuItem onclick={() => (columnWidths = { ...COMPACT_WIDTHS })}>Compact columns</DropdownMenuItem>
									<DropdownMenuItem
										onclick={() => (columnWidths = density === "compact" ? { ...COMPACT_WIDTHS } : { ...COMFORTABLE_WIDTHS })}
									>
										Reset column widths
									</DropdownMenuItem>
									<DropdownMenuItem onclick={() => (selected = new Set())}>Clear selection</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each visibleRows as row, index (row.id)}
					{@const isSelected = selected.has(row.id)}
					<tr data-slot="records-table-row" class={cn("transition-colors", isSelected && "bg-primary/[0.04]")}>
						<td class={cn(classes.cell(), "border-border border-r border-b")}>
							<div class="flex min-w-0 items-center gap-2">
								<span class="w-4 shrink-0 text-[11px] text-muted-foreground tabular-nums">{index + 1}</span>
								<Checkbox
									bind:checked={() => isSelected, () => toggleRow(row.id)}
									label=""
									class="shrink-0"
								/>
								<a
									href={row.website ? `https://${row.website}` : undefined}
									onclick={(event) => {
										if (!row.website) event.preventDefault();
									}}
									title={row.name}
									class={cn("min-w-0 truncate font-medium text-foreground", row.website && "hover:underline")}
								>
									{row.name}
								</a>
							</div>
						</td>
						<td class={cn(classes.cell(), "border-border border-r border-b")}>
							{#if isCalc("categories", index)}
								{@render calcCell()}
							{:else}
								<TagList tags={row.tags} />
							{/if}
						</td>
						<td class={cn(classes.cell(), "border-border border-r border-b", row.last === "No contact" && "text-muted-foreground")}>
							{#if isCalc("last", index)}
								{@render calcCell()}
							{:else}
								{row.last}
							{/if}
						</td>
						<td class={cn(classes.cell(), "border-border border-r border-b")}>
							{#if isCalc("strength", index)}
								{@render calcCell()}
							{:else}
								<span class="inline-flex items-center gap-1.5">
									<span class={strengthDot({ strength: row.strength })}></span>
									{STRENGTH_LABEL[row.strength]}
								</span>
							{/if}
						</td>
						<td class={cn(classes.cell(), "border-border border-r border-b")}>
							{#if isCalc("links", index)}
								{@render calcCell()}
							{:else if row.website}
								<a class="inline-flex min-w-0 items-center gap-1 text-primary hover:underline" href={`https://${row.website}`} title={row.website} target="_blank" rel="noreferrer">
									<span class="min-w-0 truncate">{row.website}</span>
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
										<path d="M14 5h5v5M19 5l-8 8" />
									</svg>
								</a>
							{:else}
								<span class="text-muted-foreground">—</span>
							{/if}
						</td>
						{#if aiAdded}
							<td class={cn(classes.cell(), "border-border border-r border-b")}>
								{#if isCalc("ai", index)}
									{@render calcCell()}
								{:else}
									<span class={row.aiValue ? undefined : "text-muted-foreground"}>{row.aiValue ?? "—"}</span>
								{/if}
							</td>
						{/if}
						<td class={cn(classes.cell(), "border-border border-b px-2")}></td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<td class={cn(classes.cell(), "border-border border-r text-muted-foreground text-xs")}>
						<span class="tabular-nums">{rows.length}</span> count
					</td>
					<td class={cn(classes.cell(), "border-border border-r")}></td>
					<td class={cn(classes.cell(), "border-border border-r text-muted-foreground text-xs")}>—</td>
					<td class={cn(classes.cell(), "border-border border-r text-muted-foreground text-xs tabular-nums")}>
						{rows.length
							? `${Math.round((rows.reduce((sum, row) => sum + strengthRank(row.strength), 0) / rows.length / 3) * 100)}% average`
							: "—"}
					</td>
					<td class={cn(classes.cell(), "border-border border-r text-muted-foreground text-xs")}>
						{rows.filter((row) => row.website).length} links
					</td>
					{#if aiAdded}
						<td class={cn(classes.cell(), "border-border border-r text-muted-foreground text-xs")}>
							{rows.filter((row) => row.aiValue).length} filled
						</td>
					{/if}
					<td class={cn(classes.cell(), "px-2")}></td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
