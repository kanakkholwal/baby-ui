"use client";

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react";
import { useMemo, useRef, useState } from "react";
import { Checkbox } from "../checkbox/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../dropdown-menu/dropdown-menu";
import { cn } from "../lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../popover/popover";
import { ConfigPopover, TYPE_GLYPHS } from "./config-popover";
import { TagList } from "./tag-list";
import type {
	RecordRow,
	RecordSortKey,
	RecordsColumnMeta,
	RecordsTableLabels,
} from "./types";
import { type RecordsDensity, recordsTable, strengthDot } from "./variants";

export type {
	RecordRow,
	RecordSortKey,
	RecordsColumnMeta,
	RecordsColumnType,
	RecordsPrompt,
	RecordsTableLabels,
	RecordsToolKind,
} from "./types";
export type { RecordStrength, RecordsDensity } from "./variants";

type ColumnKey = "company" | "categories" | "last" | "strength" | "links" | "ai";

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

function Icon({ children, size = 14 }: { children: ReactNode; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.8"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden
		>
			{children}
		</svg>
	);
}

function CalcCell() {
	return (
		<span className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground">
			Calculating…
			<span className="size-1.5 animate-pulse rounded-full bg-muted-foreground" />
		</span>
	);
}

function HeaderCell({
	label,
	sortKey,
	sort,
	onSort,
	onResizeStart,
	resizing,
	selected,
	onPick,
	paddingClassName,
}: {
	label: string;
	sortKey?: RecordSortKey;
	sort: { key: RecordSortKey; dir: 1 | -1 };
	onSort: (key: RecordSortKey) => void;
	onResizeStart: (event: ReactPointerEvent<HTMLSpanElement>) => void;
	resizing?: boolean;
	selected?: boolean;
	onPick?: ReactNode;
	paddingClassName: string;
}) {
	return (
		<th
			className={cn(
				"relative border-border border-r border-b bg-card text-left font-medium text-[12.5px] text-muted-foreground",
				paddingClassName,
				selected && "bg-primary/[0.04]",
			)}
		>
			<div className="flex min-w-0 items-center gap-1.5">
				{onPick}
				{sortKey ? (
					<button
						type="button"
						aria-label={`Sort by ${label}`}
						onClick={(event) => {
							event.stopPropagation();
							onSort(sortKey);
						}}
						className={cn(
							"shrink-0 cursor-pointer text-muted-foreground transition-opacity",
							sort.key === sortKey ? "opacity-100" : "opacity-0 hover:opacity-60",
						)}
						style={{
							transform:
								sort.key === sortKey && sort.dir === -1 ? "rotate(180deg)" : undefined,
						}}
					>
						<Icon size={12}>
							<path d="M12 5v14M5 12l7 7 7-7" />
						</Icon>
					</button>
				) : null}
			</div>
			{/* biome-ignore lint/a11y/useSemanticElements: a drag handle can't be a semantic <hr> */}
			<span
				role="separator"
				aria-orientation="vertical"
				aria-label={`Resize ${label} column`}
				onPointerDown={onResizeStart}
				className={cn(
					"-right-0.5 absolute inset-y-0 w-1 cursor-col-resize touch-none",
					resizing && "bg-primary/40",
				)}
			/>
		</th>
	);
}

export interface RecordsTableProps {
	/** Every company row shown. Required: this table has no sample data of its own. */
	rows: RecordRow[];
	labels?: Partial<RecordsTableLabels>;
	/** Stretches to fill its container instead of sizing to its own columns. */
	fill?: boolean;
	density?: RecordsDensity;
	/** Real model names offered by the Tool picker; empty hides no UI, it just offers nothing. */
	modelOptions?: string[];
	/** Column currently revealing computed values row by row. `null`/omitted shows none. */
	calculatingColumn?: string | null;
	/** Row count already resolved for `calculatingColumn`; drives which rows still show "Calculating…". */
	resolvedCount?: number;
	/** Fired when "Go calculate" is pressed for a column; the caller owns the reveal timing. */
	onCalculate?: (column: string) => void;
	className?: string;
}

/** An AI-spreadsheet grid. Columns are configurable properties: click a header to open its
 * config (type, tool, inputs), add a new AI column, and reveal it row-by-row on calculate. */
export function RecordsTable({
	rows,
	labels,
	fill = false,
	density = "comfortable",
	modelOptions = [],
	calculatingColumn = null,
	resolvedCount = 0,
	onCalculate,
	className,
}: RecordsTableProps) {
	const text: RecordsTableLabels = { ...DEFAULT_LABELS, ...labels };
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [sort, setSort] = useState<{ key: RecordSortKey; dir: 1 | -1 }>({
		key: "name",
		dir: 1,
	});
	const [columnWidths, setColumnWidths] = useState<Record<ColumnKey, number>>(
		density === "compact" ? COMPACT_WIDTHS : COMFORTABLE_WIDTHS,
	);
	const [resizingColumn, setResizingColumn] = useState<ColumnKey | null>(null);
	const [openColumn, setOpenColumn] = useState<ColumnKey | null>(null);
	const [columnOverrides, setColumnOverrides] = useState<
		Partial<Record<ColumnKey, Partial<RecordsColumnMeta>>>
	>({});
	const [inputSelections, setInputSelections] = useState<
		Partial<Record<ColumnKey, string[]>>
	>({});
	const [pinnedColumns, setPinnedColumns] = useState<Set<ColumnKey>>(new Set());
	const [aiAdded, setAiAdded] = useState(false);
	const aiThRef = useRef<HTMLTableCellElement>(null);
	const { root, cell, headerCell } = recordsTable({ density });
	const meta = useMemo(() => defaultMeta(), []);

	const visibleRows = useMemo(() => {
		return [...rows].sort((a, b) => {
			const value =
				sort.key === "name"
					? a.name.localeCompare(b.name)
					: sort.key === "last"
						? a.last.localeCompare(b.last)
						: strengthRank(a.strength) - strengthRank(b.strength);
			return value * sort.dir;
		});
	}, [rows, sort]);

	function columnMeta(key: ColumnKey): RecordsColumnMeta {
		return { ...meta[key], ...columnOverrides[key] };
	}

	function updateMeta(key: ColumnKey, next: Partial<RecordsColumnMeta>) {
		setColumnOverrides((current) => ({
			...current,
			[key]: { ...current[key], ...next },
		}));
	}

	function isCalc(col: ColumnKey, index: number) {
		return calculatingColumn === col && index >= resolvedCount;
	}

	const allSelected =
		visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id));
	const partiallySelected =
		!allSelected && visibleRows.some((row) => selected.has(row.id));

	function toggleSort(key: RecordSortKey) {
		setSort((current) =>
			current.key === key ? { key, dir: (current.dir * -1) as 1 | -1 } : { key, dir: 1 },
		);
	}

	function toggleRow(id: string) {
		setSelected((current) => {
			const next = new Set(current);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	}

	function toggleAll() {
		setSelected((current) => {
			const next = new Set(current);
			if (allSelected) for (const row of visibleRows) next.delete(row.id);
			else for (const row of visibleRows) next.add(row.id);
			return next;
		});
	}

	function startColumnResize(key: ColumnKey, minWidth = 120) {
		return (event: ReactPointerEvent<HTMLSpanElement>) => {
			event.preventDefault();
			event.stopPropagation();
			setOpenColumn(null);

			const startX = event.clientX;
			const startWidth = columnWidths[key];
			document.body.style.cursor = "col-resize";
			document.body.style.userSelect = "none";
			setResizingColumn(key);

			function move(moveEvent: PointerEvent) {
				const width = Math.max(minWidth, startWidth + moveEvent.clientX - startX);
				setColumnWidths((current) => ({ ...current, [key]: width }));
			}
			function finish() {
				window.removeEventListener("pointermove", move);
				window.removeEventListener("pointerup", finish);
				window.removeEventListener("pointercancel", finish);
				document.body.style.cursor = "";
				document.body.style.userSelect = "";
				setResizingColumn(null);
			}

			window.addEventListener("pointermove", move);
			window.addEventListener("pointerup", finish);
			window.addEventListener("pointercancel", finish);
		};
	}

	const tableWidth =
		columnWidths.company +
		columnWidths.categories +
		columnWidths.last +
		columnWidths.strength +
		columnWidths.links +
		(aiAdded ? columnWidths.ai : 0) +
		56;

	function inputOptionsFor(exclude: ColumnKey) {
		return (["company", "categories", "last", "strength", "links"] as ColumnKey[])
			.filter((key) => key !== exclude)
			.map((key) => text[key]);
	}

	function selectedInputsFor(key: ColumnKey) {
		return inputSelections[key] ?? (meta[key].inputs ? [meta[key].inputs as string] : []);
	}

	function configPopoverFor(key: ColumnKey, onHide?: () => void) {
		return (
			<ConfigPopover
				title={text[key]}
				meta={columnMeta(key)}
				onMetaChange={(next) => updateMeta(key, next)}
				inputOptions={inputOptionsFor(key)}
				selectedInputs={selectedInputsFor(key)}
				onInputsChange={(next) =>
					setInputSelections((current) => ({ ...current, [key]: next }))
				}
				modelOptions={modelOptions}
				pinned={pinnedColumns.has(key)}
				onTogglePin={() =>
					setPinnedColumns((current) => {
						const next = new Set(current);
						if (next.has(key)) next.delete(key);
						else next.add(key);
						return next;
					})
				}
				onHide={onHide}
				calculating={calculatingColumn != null}
				onCalculate={() => {
					onCalculate?.(key);
					setOpenColumn(null);
				}}
			/>
		);
	}

	return (
		<div
			data-slot="records-table"
			className={cn(root(), fill ? "w-full" : "w-fit max-w-full", className)}
		>
			<div
				data-slot="records-table-scroll"
				className="overflow-auto rounded-2xl border border-border"
				style={{ scrollbarWidth: "thin" }}
			>
				<table
					className="border-collapse text-[13px]"
					style={{ width: fill ? "100%" : tableWidth, minWidth: tableWidth }}
				>
					<colgroup>
						<col style={{ width: columnWidths.company }} />
						<col style={{ width: columnWidths.categories }} />
						<col style={{ width: columnWidths.last }} />
						<col style={{ width: columnWidths.strength }} />
						<col style={{ width: columnWidths.links }} />
						{aiAdded ? <col style={{ width: columnWidths.ai }} /> : null}
						<col style={{ width: 56 }} />
					</colgroup>
					<thead>
						<tr>
							<th
								className={cn(
									headerCell(),
									"border-border border-r border-b bg-card text-left",
									openColumn === "company" && "bg-primary/[0.04]",
								)}
							>
								<div className="flex items-center gap-2">
									<Checkbox
										checked={allSelected}
										indeterminate={partiallySelected}
										onCheckedChange={toggleAll}
										label=""
										className="shrink-0"
									/>
									<Popover
										open={openColumn === "company"}
										onOpenChange={(o) => setOpenColumn(o ? "company" : null)}
									>
										<PopoverTrigger className="min-w-0 truncate rounded-md px-1 font-medium text-[12.5px] text-muted-foreground hover:bg-foreground/[0.06]">
											{text.company}
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("company")}
										</PopoverContent>
									</Popover>
								</div>
							</th>
							<HeaderCell
								label={text.categories}
								paddingClassName={headerCell()}
								sort={sort}
								onSort={toggleSort}
								onResizeStart={startColumnResize("categories")}
								resizing={resizingColumn === "categories"}
								selected={openColumn === "categories"}
								onPick={
									<Popover
										open={openColumn === "categories"}
										onOpenChange={(o) => setOpenColumn(o ? "categories" : null)}
									>
										<PopoverTrigger
											className="min-w-0 items-center gap-1.5 truncate rounded-md px-1 hover:bg-foreground/[0.06]"
											aria-label={`Configure ${text.categories}`}
										>
											<Icon size={14}>{TYPE_GLYPHS[columnMeta("categories").type]}</Icon>
											<span className="truncate">{text.categories}</span>
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("categories")}
										</PopoverContent>
									</Popover>
								}
							/>
							<HeaderCell
								label={text.last}
								paddingClassName={headerCell()}
								sortKey="last"
								sort={sort}
								onSort={toggleSort}
								onResizeStart={startColumnResize("last")}
								resizing={resizingColumn === "last"}
								selected={openColumn === "last"}
								onPick={
									<Popover
										open={openColumn === "last"}
										onOpenChange={(o) => setOpenColumn(o ? "last" : null)}
									>
										<PopoverTrigger
											className="min-w-0 items-center gap-1.5 truncate rounded-md px-1 hover:bg-foreground/[0.06]"
											aria-label={`Configure ${text.last}`}
										>
											<Icon size={14}>{TYPE_GLYPHS[columnMeta("last").type]}</Icon>
											<span className="truncate">{text.last}</span>
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("last")}
										</PopoverContent>
									</Popover>
								}
							/>
							<HeaderCell
								label={text.strength}
								paddingClassName={headerCell()}
								sortKey="strength"
								sort={sort}
								onSort={toggleSort}
								onResizeStart={startColumnResize("strength")}
								resizing={resizingColumn === "strength"}
								selected={openColumn === "strength"}
								onPick={
									<Popover
										open={openColumn === "strength"}
										onOpenChange={(o) => setOpenColumn(o ? "strength" : null)}
									>
										<PopoverTrigger
											className="min-w-0 items-center gap-1.5 truncate rounded-md px-1 hover:bg-foreground/[0.06]"
											aria-label={`Configure ${text.strength}`}
										>
											<Icon size={14}>{TYPE_GLYPHS[columnMeta("strength").type]}</Icon>
											<span className="truncate">{text.strength}</span>
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("strength")}
										</PopoverContent>
									</Popover>
								}
							/>
							<HeaderCell
								label={text.links}
								paddingClassName={headerCell()}
								sort={sort}
								onSort={toggleSort}
								onResizeStart={startColumnResize("links")}
								resizing={resizingColumn === "links"}
								selected={openColumn === "links"}
								onPick={
									<Popover
										open={openColumn === "links"}
										onOpenChange={(o) => setOpenColumn(o ? "links" : null)}
									>
										<PopoverTrigger
											className="min-w-0 items-center gap-1.5 truncate rounded-md px-1 hover:bg-foreground/[0.06]"
											aria-label={`Configure ${text.links}`}
										>
											<Icon size={14}>{TYPE_GLYPHS[columnMeta("links").type]}</Icon>
											<span className="truncate">{text.links}</span>
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("links")}
										</PopoverContent>
									</Popover>
								}
							/>
							{aiAdded ? (
								<th
									ref={aiThRef}
									className={cn(
										headerCell(),
										"border-border border-r border-b bg-card text-left",
										openColumn === "ai" && "bg-primary/[0.04]",
									)}
								>
									<Popover
										open={openColumn === "ai"}
										onOpenChange={(o) => setOpenColumn(o ? "ai" : null)}
									>
										<PopoverTrigger className="min-w-0 truncate rounded-md px-1 font-medium text-[12.5px] text-muted-foreground hover:bg-foreground/[0.06]">
											{text.ai}
										</PopoverTrigger>
										<PopoverContent align="start" className="w-80 p-3">
											{configPopoverFor("ai", () => {
												setAiAdded(false);
												setOpenColumn(null);
											})}
										</PopoverContent>
									</Popover>
								</th>
							) : null}
							<th className={cn(headerCell(), "border-border border-b bg-card px-2")}>
								<div className="flex items-center gap-1">
									<DropdownMenu>
										<DropdownMenuTrigger
											aria-label="New property"
											className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
										>
											<Icon size={15}>
												<path d="M12 5v14M5 12h14" />
											</Icon>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem
												onClick={() => {
													setAiAdded(true);
													setOpenColumn("ai");
												}}
											>
												{text.ai}
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<DropdownMenu>
										<DropdownMenuTrigger
											aria-label="Table options"
											className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
										>
											<svg
												width="15"
												height="15"
												viewBox="0 0 24 24"
												fill="currentColor"
												aria-hidden
											>
												<circle cx="5" cy="12" r="1.6" />
												<circle cx="12" cy="12" r="1.6" />
												<circle cx="19" cy="12" r="1.6" />
											</svg>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem onClick={() => setAiAdded(true)}>
												Add property
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setColumnWidths(COMPACT_WIDTHS)}>
												Compact columns
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() =>
													setColumnWidths(
														density === "compact" ? COMPACT_WIDTHS : COMFORTABLE_WIDTHS,
													)
												}
											>
												Reset column widths
											</DropdownMenuItem>
											<DropdownMenuItem onClick={() => setSelected(new Set())}>
												Clear selection
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</th>
						</tr>
					</thead>
					<tbody>
						{visibleRows.map((row, index) => {
							const isSelected = selected.has(row.id);
							return (
								<tr
									key={row.id}
									data-slot="records-table-row"
									className={cn("transition-colors", isSelected && "bg-primary/[0.04]")}
								>
									<td className={cn(cell(), "border-border border-r border-b")}>
										<div className="flex min-w-0 items-center gap-2">
											<span className="w-4 shrink-0 text-[11px] text-muted-foreground tabular-nums">
												{index + 1}
											</span>
											<Checkbox
												checked={isSelected}
												onCheckedChange={() => toggleRow(row.id)}
												label=""
												className="shrink-0"
											/>
											<a
												href={row.website ? `https://${row.website}` : undefined}
												onClick={(event) => {
													if (!row.website) event.preventDefault();
												}}
												title={row.name}
												className={cn(
													"min-w-0 truncate font-medium text-foreground",
													row.website && "hover:underline",
												)}
											>
												{row.name}
											</a>
										</div>
									</td>
									<td className={cn(cell(), "border-border border-r border-b")}>
										{isCalc("categories", index) ? (
											<CalcCell />
										) : (
											<TagList tags={row.tags} />
										)}
									</td>
									<td
										className={cn(
											cell(),
											"border-border border-r border-b",
											row.last === "No contact" && "text-muted-foreground",
										)}
									>
										{isCalc("last", index) ? <CalcCell /> : row.last}
									</td>
									<td className={cn(cell(), "border-border border-r border-b")}>
										{isCalc("strength", index) ? (
											<CalcCell />
										) : (
											<span className="inline-flex items-center gap-1.5">
												<span className={strengthDot({ strength: row.strength })} />
												{STRENGTH_LABEL[row.strength]}
											</span>
										)}
									</td>
									<td className={cn(cell(), "border-border border-r border-b")}>
										{isCalc("links", index) ? (
											<CalcCell />
										) : row.website ? (
											<a
												className="inline-flex min-w-0 items-center gap-1 text-primary hover:underline"
												href={`https://${row.website}`}
												title={row.website}
												target="_blank"
												rel="noreferrer"
											>
												<span className="min-w-0 truncate">{row.website}</span>
												<Icon size={12}>
													<path d="M14 5h5v5M19 5l-8 8" />
												</Icon>
											</a>
										) : (
											<span className="text-muted-foreground">—</span>
										)}
									</td>
									{aiAdded ? (
										<td className={cn(cell(), "border-border border-r border-b")}>
											{isCalc("ai", index) ? (
												<CalcCell />
											) : (
												<span
													className={row.aiValue ? undefined : "text-muted-foreground"}
												>
													{row.aiValue ?? "—"}
												</span>
											)}
										</td>
									) : null}
									<td className={cn(cell(), "border-border border-b px-2")} />
								</tr>
							);
						})}
					</tbody>
					<tfoot>
						<tr>
							<td
								className={cn(
									cell(),
									"border-border border-r text-muted-foreground text-xs",
								)}
							>
								<span className="tabular-nums">{rows.length}</span> count
							</td>
							<td className={cn(cell(), "border-border border-r")} />
							<td
								className={cn(
									cell(),
									"border-border border-r text-muted-foreground text-xs",
								)}
							>
								—
							</td>
							<td
								className={cn(
									cell(),
									"border-border border-r text-muted-foreground text-xs tabular-nums",
								)}
							>
								{rows.length
									? `${Math.round((rows.reduce((sum, row) => sum + strengthRank(row.strength), 0) / rows.length / 3) * 100)}% average`
									: "—"}
							</td>
							<td
								className={cn(
									cell(),
									"border-border border-r text-muted-foreground text-xs",
								)}
							>
								{rows.filter((row) => row.website).length} links
							</td>
							{aiAdded ? (
								<td
									className={cn(
										cell(),
										"border-border border-r text-muted-foreground text-xs",
									)}
								>
									{rows.filter((row) => row.aiValue).length} filled
								</td>
							) : null}
							<td className={cn(cell(), "px-2")} />
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
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
