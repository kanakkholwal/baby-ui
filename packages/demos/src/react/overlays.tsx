"use client";

import {
	Avatar,
	AvatarFallback,
	Button,
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
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Switch,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

const TRIGGER =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";

// Switch renders its own label; reversing the row puts the text first without a second one.
const SWITCH_ROW = "flex w-full flex-row-reverse items-center justify-between gap-4";

export function PopoverDemo({ props }: { props: Props }) {
	const [autoDeploy, setAutoDeploy] = useState(true);
	const [comments, setComments] = useState(false);

	return (
		<Popover
			placement={(props.placement as never) ?? "bottom-start"}
			gap={Number(props.gap ?? 6)}
		>
			<PopoverTrigger className={TRIGGER}>Deploy settings</PopoverTrigger>
			<PopoverContent className="w-72">
				<div className="flex flex-col gap-3">
					<Label>Preview branches</Label>
					<Switch
						checked={autoDeploy}
						onCheckedChange={setAutoDeploy}
						size="sm"
						label="Auto deploy"
						className={SWITCH_ROW}
					/>
					<Switch
						checked={comments}
						onCheckedChange={setComments}
						size="sm"
						label="Comment on PRs"
						className={SWITCH_ROW}
					/>
					<Button size="sm" className="mt-1 w-full">
						Save
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}

const ACTIONS = [
	{
		id: "copy",
		hint: "Copy to clipboard",
		path: "M6 6V4.5A1.5 1.5 0 0 1 7.5 3h4A1.5 1.5 0 0 1 13 4.5v4A1.5 1.5 0 0 1 11.5 10H10M4.5 6h4A1.5 1.5 0 0 1 10 7.5v4A1.5 1.5 0 0 1 8.5 13h-4A1.5 1.5 0 0 1 3 11.5v-4A1.5 1.5 0 0 1 4.5 6",
	},
	{
		id: "share",
		hint: "Copy a public link",
		path: "M8 10.5V3m0 0L5.5 5.5M8 3l2.5 2.5M3.5 10v2A1.5 1.5 0 0 0 5 13.5h6a1.5 1.5 0 0 0 1.5-1.5v-2",
	},
	{
		id: "delete",
		hint: "Move to trash",
		path: "M3.5 4.5h9M6.5 4.5V3h3v1.5M5 4.5l.5 8h5l.5-8",
	},
];

export function TooltipDemo({ props }: { props: Props }) {
	return (
		<div className="inline-flex items-center gap-1 rounded-xl border border-border p-1">
			{ACTIONS.map((action) => (
				<Tooltip
					key={action.id}
					placement={(props.placement as never) ?? "top"}
					delay={Number(props.delay ?? 400)}
				>
					<TooltipTrigger className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground">
						<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
							<path
								d={action.path}
								stroke="currentColor"
								strokeWidth="1.3"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</TooltipTrigger>
					<TooltipContent>
						{action.id === "copy" ? (props.label as string) || action.hint : action.hint}
					</TooltipContent>
				</Tooltip>
			))}
		</div>
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
