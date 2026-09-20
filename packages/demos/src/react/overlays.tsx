"use client";

import {
	Avatar,
	Combobox,
	ContextMenu,
	DropdownMenu,
	HoverCard,
	Popover,
	Select,
	Tooltip,
} from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

const TRIGGER =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";

export function PopoverDemo({ props }: { props: Props }) {
	return (
		<Popover
			placement={(props.placement as never) ?? "bottom-start"}
			gap={Number(props.gap ?? 6)}
			trigger={<span className={TRIGGER}>Open popover</span>}
		>
			<p className="font-medium text-foreground">Deploy settings</p>
			<p className="mt-1 text-muted-foreground">
				Scroll the page with this open: it repositions and flips rather than drifting
				away.
			</p>
		</Popover>
	);
}

export function TooltipDemo({ props }: { props: Props }) {
	return (
		<Tooltip
			label={(props.label as string) || "Copy to clipboard"}
			placement={(props.placement as never) ?? "top"}
			delay={Number(props.delay ?? 400)}
		>
			<button type="button" className={TRIGGER}>
				Hover or focus me
			</button>
		</Tooltip>
	);
}

const MENU_ITEMS = [
	{ id: "rename", label: "Rename" },
	{ id: "duplicate", label: "Duplicate" },
	{ id: "archive", label: "Archive", disabled: true },
	{ id: "delete", label: "Delete", destructive: true },
];

export function DropdownMenuDemo({ props }: { props: Props }) {
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu
				items={MENU_ITEMS}
				placement={(props.placement as never) ?? "bottom-start"}
				onSelect={setLast}
				trigger={<span className={TRIGGER}>Actions</span>}
			/>
			{last ? <p className="text-muted-foreground text-xs">Selected: {last}</p> : null}
		</div>
	);
}

const CONTEXT_ITEMS = [
	{ id: "open", label: "Open in editor" },
	{ id: "copy", label: "Copy path" },
	{ id: "delete", label: "Delete", destructive: true },
];

export function ContextMenuDemo(_: { props: Props }) {
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<ContextMenu items={CONTEXT_ITEMS} onSelect={setLast}>
				<div className="grid h-28 w-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm">
					Right-click anywhere here
				</div>
			</ContextMenu>
			{last ? <p className="text-muted-foreground text-xs">Selected: {last}</p> : null}
		</div>
	);
}

export function HoverCardDemo({ props }: { props: Props }) {
	return (
		<HoverCard
			placement={(props.placement as never) ?? "bottom-start"}
			openDelay={Number(props.openDelay ?? 300)}
			closeDelay={Number(props.closeDelay ?? 150)}
			trigger={
				<button
					type="button"
					className="font-medium text-foreground text-sm underline underline-offset-4"
				>
					@kanakkholwal
				</button>
			}
		>
			<div className="flex items-start gap-3">
				<Avatar name="Kanak Kholwal" size="sm" />
				<div>
					<p className="font-medium text-foreground">Kanak Kholwal</p>
					<p className="mt-1 text-muted-foreground text-xs">
						Building docvia and this registry. Move the pointer onto this card: it stays
						open.
					</p>
				</div>
			</div>
		</HoverCard>
	);
}

const RUNTIMES = [
	{ value: "edge", label: "Edge runtime" },
	{ value: "node", label: "Node runtime" },
	{ value: "static", label: "Static export" },
	{ value: "hybrid", label: "Hybrid", disabled: true },
];

export function SelectDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("edge");
	return (
		<div className="w-64">
			<Select
				options={RUNTIMES}
				value={value}
				onValueChange={setValue}
				placeholder={(props.placeholder as string) || "Select an option"}
				placement={(props.placement as never) ?? "bottom-start"}
				label="Runtime"
			/>
		</div>
	);
}

const REGIONS = [
	{ value: "ams", label: "Amsterdam" },
	{ value: "blr", label: "Bengaluru" },
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "nrt", label: "Tokyo" },
	{ value: "syd", label: "Sydney" },
];

export function ComboboxDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("");
	return (
		<Combobox
			options={REGIONS}
			value={value}
			onValueChange={setValue}
			placeholder={(props.placeholder as string) || "Search regions…"}
			emptyLabel={(props.emptyLabel as string) || "No matches"}
			label="Region"
		/>
	);
}
