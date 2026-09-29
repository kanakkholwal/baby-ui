"use client";

import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	Gauge,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	paginationRange,
	ScrollArea,
	ScrubField,
	Shortcut,
	ShowMore,
	Spinner,
	Toggle,
	ToggleGroup,
	ToggleGroupItem,
	Typography,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const LOREM =
	"Components here are copied into your project rather than installed, which means you own the source and can change anything. The registry only decides what the first version looks like. Every port satisfies the same ComponentSpec, so the React and Svelte builds behave identically even though neither is generated from the other.";

export function SpinnerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Spinner>>(props);
	const label = p.label || "Checking availability";
	return (
		<div className="flex w-64 flex-col items-center gap-4">
			<div className="flex items-center gap-2.5 text-muted-foreground">
				<Spinner size={p.size ?? "md"} label={label} />
				<span className="text-sm">{label}</span>
			</div>
			<Button loading loadingLabel="Reserving…" className="w-full">
				Reserve name
			</Button>
		</div>
	);
}

const MARKS = [
	{
		id: "bold",
		label: "Bold",
		path: "M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z",
	},
	{ id: "italic", label: "Italic", path: "M10 3H6.5m3 10H6m4-10L8 13" },
	{
		id: "underline",
		label: "Underline",
		path: "M4.5 2.5v5a3.5 3.5 0 0 0 7 0v-5M4 13.5h8",
	},
];

export function ToggleDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Toggle>>(props);
	const [pressed, setPressed] = useState(false);
	const [on, setOn] = useState<Record<string, boolean>>({});
	useEffect(() => setPressed(Boolean(props.pressed)), [props.pressed]);
	const size = p.size ?? "md";

	return (
		<div className="inline-flex items-center gap-1 rounded-xl border border-border p-1">
			{MARKS.map((mark) => (
				<Toggle
					key={mark.id}
					size={mark.id === "bold" ? size : "md"}
					label={mark.label}
					disabled={mark.id === "bold" && (p.disabled ?? false)}
					pressed={mark.id === "bold" ? pressed : Boolean(on[mark.id])}
					onPressedChange={(next) =>
						mark.id === "bold"
							? setPressed(next)
							: setOn((prev) => ({ ...prev, [mark.id]: next }))
					}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
						<path
							d={mark.path}
							stroke="currentColor"
							strokeWidth="1.4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</Toggle>
			))}
		</div>
	);
}

const VIEWS = [
	{ value: "list", label: "List" },
	{ value: "grid", label: "Grid" },
	{ value: "board", label: "Board" },
];

export function ToggleGroupDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ToggleGroup>>(props);
	const type = p.type ?? "single";
	const [value, setValue] = useState<string | string[]>(
		type === "multiple" ? ["grid"] : "grid",
	);
	useEffect(() => setValue(type === "multiple" ? ["grid"] : "grid"), [type]);
	return (
		<ToggleGroup
			value={value}
			onValueChange={setValue}
			type={type}
			variant={p.variant ?? "default"}
			size={p.size ?? "md"}
			disabled={p.disabled ?? false}
			label="View"
		>
			{VIEWS.map((view) => (
				<ToggleGroupItem key={view.value} value={view.value}>
					{view.label}
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}

export function CollapsibleDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Collapsible>>(props);
	return (
		<div className="w-full max-w-80">
			<Collapsible defaultOpen={p.open ?? false}>
				<CollapsibleTrigger>Advanced options</CollapsibleTrigger>
				<CollapsibleContent>
					Build command, install command and the output directory. Changing these rebuilds
					every preview deployment.
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}

export function ShowMoreDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ShowMore>>(props);
	return (
		<div className="w-full max-w-80">
			<ShowMore
				lines={Number(p.lines ?? 3)}
				maxHeight={Number(p.maxHeight ?? 320)}
				moreLabel={p.moreLabel || "Show more"}
				lessLabel={p.lessLabel || "Show less"}
			>
				<p>{LOREM}</p>
			</ShowMore>
		</div>
	);
}

const ROWS: [string, string][] = [
	["Search", "cmd+k"],
	["Toggle sidebar", "cmd+b"],
	["Settings", "cmd+,"],
];

export function ShortcutDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Shortcut>>(props);
	const variant = p.variant ?? "default";
	const size = p.size ?? "md";
	const [log, setLog] = useState<string[]>([]);
	const note = (action: string) => setLog((prev) => [action, ...prev].slice(0, 3));
	return (
		<div className="flex w-full max-w-80 flex-col gap-3 text-sm">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={() => note("New file")}>
					New file
					<Shortcut
						shortcut={p.shortcut || "cmd+n"}
						variant={variant}
						size={size}
						joined={p.joined ?? false}
					/>
				</Button>
				<Button size="sm" onClick={() => note("Sent")}>
					Send
					<Shortcut shortcut="cmd+enter" />
				</Button>
			</div>
			<div className="divide-y divide-border rounded-xl border border-border">
				{ROWS.map(([label, keys]) => (
					<button
						key={keys}
						type="button"
						onClick={() => note(label)}
						className="flex w-full items-center justify-between px-3 py-2 text-left text-foreground transition-colors hover:bg-foreground/[0.04]"
					>
						{label}
						<Shortcut shortcut={keys} variant="ghost" />
					</button>
				))}
			</div>
			<p className="min-h-4 text-muted-foreground text-xs">
				{log.length ? `Fired: ${log.join(", ")}` : "Press a shortcut or click a row"}
			</p>
		</div>
	);
}

export function TypographyDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Typography>>(props);
	return (
		<div className="flex w-full max-w-80 flex-col gap-3">
			<Typography variant="h2">Release 0.4</Typography>
			<Typography variant="muted">Shipped 20 September 2026</Typography>
			<Typography variant={p.variant ?? "body"}>
				Overlays now animate out as well as in, and every anchored surface grows from the
				edge nearest its trigger.
			</Typography>
		</div>
	);
}

export function GaugeDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Gauge>>(props);
	return (
		<div className="flex items-center gap-6">
			<Gauge
				value={Number(p.value ?? 68)}
				size={Number(p.size ?? 96)}
				thickness={Number(p.thickness ?? 8)}
				tone={p.tone ?? "default"}
				label="Performance score"
			/>
			<p className="max-w-40 text-muted-foreground text-xs">
				A meter is a reading, not a task in progress.
			</p>
		</div>
	);
}

export function PaginationDemo({ props }: { props: Props }) {
	const [page, setPage] = useState(4);
	useEffect(() => setPage(Number(props.page ?? 4)), [props.page]);
	const total = Number(props.total ?? 12);
	const entries = paginationRange(page, total, Number(props.siblings ?? 1));
	return (
		<Pagination>
			<PaginationPrevious
				disabled={page <= 1}
				onClick={() => setPage((p) => Math.max(1, p - 1))}
			/>
			<PaginationContent>
				{entries.map((entry, i) => (
					<PaginationItem key={typeof entry === "number" ? entry : `gap-${i}`}>
						{entry === "gap" ? (
							<PaginationEllipsis />
						) : (
							<PaginationLink active={entry === page} onClick={() => setPage(entry)}>
								{entry}
							</PaginationLink>
						)}
					</PaginationItem>
				))}
			</PaginationContent>
			<PaginationNext
				disabled={page >= total}
				onClick={() => setPage((p) => Math.min(total, p + 1))}
			/>
		</Pagination>
	);
}

const REGIONS = [
	"Amsterdam",
	"Bengaluru",
	"Cape Town",
	"Dublin",
	"Frankfurt",
	"Hong Kong",
	"Johannesburg",
	"London",
	"Mumbai",
	"Paris",
	"São Paulo",
	"Singapore",
	"Sydney",
	"Tokyo",
	"Toronto",
	"Washington DC",
];

export function ScrubFieldDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ScrubField>>(props);
	const [value, setValue] = useState(Number(props.defaultValue ?? 96));
	useEffect(() => setValue(Number(props.defaultValue ?? 96)), [props.defaultValue]);
	return (
		<div className="w-32">
			<ScrubField
				label={p.label || "W"}
				value={value}
				onValueChange={setValue}
				min={Number(p.min ?? 0)}
				max={Number(p.max ?? 999)}
				step={Number(p.step ?? 1)}
				largeStep={Number(p.largeStep ?? 10)}
				suffix={p.suffix || undefined}
				size={p.size ?? "md"}
				tone={p.tone ?? "default"}
				disabled={p.disabled ?? false}
			/>
		</div>
	);
}

export function ScrollAreaDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ScrollArea>>(props);
	return (
		<div className="w-64 rounded-xl border border-border bg-card p-1">
			<ScrollArea maxHeight={p.maxHeight || "12rem"}>
				<ul className="flex flex-col">
					{REGIONS.map((region) => (
						<li
							key={region}
							className="rounded-lg px-3 py-2 text-foreground text-sm hover:bg-foreground/[0.04]"
						>
							{region}
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}
