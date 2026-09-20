"use client";

import {
	Avatar,
	AvatarFallback,
	Combobox,
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
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
		>
			<PopoverTrigger className={TRIGGER}>Open popover</PopoverTrigger>
			<PopoverContent>
				<p className="font-medium text-foreground">Deploy settings</p>
				<p className="mt-1 text-muted-foreground">
					Scroll the page with this open: it repositions and flips rather than drifting
					away.
				</p>
			</PopoverContent>
		</Popover>
	);
}

export function TooltipDemo({ props }: { props: Props }) {
	return (
		<Tooltip
			placement={(props.placement as never) ?? "top"}
			delay={Number(props.delay ?? 400)}
		>
			<TooltipTrigger>
				<button type="button" className={TRIGGER}>
					Hover or focus me
				</button>
			</TooltipTrigger>
			<TooltipContent>{(props.label as string) || "Copy to clipboard"}</TooltipContent>
		</Tooltip>
	);
}

export function DropdownMenuDemo({ props }: { props: Props }) {
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu placement={(props.placement as never) ?? "bottom-start"}>
				<DropdownMenuTrigger className={TRIGGER}>Actions</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>This file</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => setLast("rename")}>Rename</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setLast("duplicate")}>
						Duplicate
					</DropdownMenuItem>
					<DropdownMenuItem disabled>Archive</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem destructive onClick={() => setLast("delete")}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{last ? <p className="text-muted-foreground text-xs">Selected: {last}</p> : null}
		</div>
	);
}

export function ContextMenuDemo(_: { props: Props }) {
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="grid h-28 w-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm">
						Right-click anywhere here
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setLast("open")}>
						Open in editor
					</ContextMenuItem>
					<ContextMenuItem onClick={() => setLast("copy")}>Copy path</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem destructive onClick={() => setLast("delete")}>
						Delete
					</ContextMenuItem>
				</ContextMenuContent>
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
		>
			<HoverCardTrigger>
				<button
					type="button"
					className="font-medium text-foreground text-sm underline underline-offset-4"
				>
					@kanakkholwal
				</button>
			</HoverCardTrigger>
			<HoverCardContent>
				<div className="flex items-start gap-3">
					<Avatar size="sm">
						<AvatarFallback>KK</AvatarFallback>
					</Avatar>
					<div>
						<p className="font-medium text-foreground">Kanak Kholwal</p>
						<p className="mt-1 text-muted-foreground text-xs">
							Building docvia and this registry. Move the pointer onto this card: it stays
							open.
						</p>
					</div>
				</div>
			</HoverCardContent>
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
				value={value}
				onValueChange={setValue}
				placement={(props.placement as never) ?? "bottom-start"}
			>
				<SelectTrigger aria-label="Runtime">
					<SelectValue
						placeholder={(props.placeholder as string) || "Select an option"}
					/>
				</SelectTrigger>
				<SelectContent>
					{RUNTIMES.map((runtime) => (
						<SelectItem
							key={runtime.value}
							value={runtime.value}
							disabled={runtime.disabled}
						>
							{runtime.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
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
