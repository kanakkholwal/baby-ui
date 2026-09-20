"use client";

import {
	AlertDialog,
	Button,
	Command,
	FullscreenNav,
	Label,
	Modal,
	Select,
	Sheet,
	Toast,
	type ToastItem,
	type ToastTone,
	Toolbar,
} from "@baby-ui/react";
import { useId, useState } from "react";

type Props = Record<string, unknown>;

const BTN =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";

export function ModalDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Open modal
			</button>
			<Modal
				open={open}
				onOpenChange={setOpen}
				title={(props.title as string) || "Deploy to production"}
				description={
					(props.description as string) || "This will replace the current build."
				}
				size={(props.size as "sm" | "md" | "lg") ?? "md"}
				dismissOnBackdrop={props.dismissOnBackdrop !== false}
				footer={
					<>
						<Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
							Cancel
						</Button>
						<Button size="sm" onClick={() => setOpen(false)}>
							Deploy
						</Button>
					</>
				}
			>
				Traffic shifts as soon as the build is healthy. The previous deployment stays
				available for instant rollback.
			</Modal>
		</>
	);
}

export function AlertDialogDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [done, setDone] = useState(false);
	return (
		<div className="flex flex-col items-center gap-3">
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Delete project
			</button>
			{done ? <p className="text-muted-foreground text-xs">Confirmed</p> : null}
			<AlertDialog
				open={open}
				onOpenChange={setOpen}
				title={(props.title as string) || "Delete this project?"}
				description={
					(props.description as string) ||
					"This removes every deployment and cannot be undone."
				}
				confirmLabel={(props.confirmLabel as string) || "Delete"}
				destructive={props.destructive !== false}
				onConfirm={() => setDone(true)}
			/>
		</div>
	);
}

const REGIONS = [
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "syd", label: "Sydney" },
];

export function SheetDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [region, setRegion] = useState("fra");
	const id = useId();
	return (
		<>
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Open sheet
			</button>
			<Sheet
				open={open}
				onOpenChange={setOpen}
				side={(props.side as "left" | "right" | "top" | "bottom") ?? "right"}
				title={(props.title as string) || "Filters"}
			>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor={id}>Region</Label>
					<Select
						options={REGIONS}
						value={region}
						onValueChange={setRegion}
						label="Region"
					/>
				</div>
				<p className="text-muted-foreground text-sm">
					Escape closes the sheet and restores focus.
				</p>
			</Sheet>
		</>
	);
}

export function ToastDemo({ props }: { props: Props }) {
	const [toasts, setToasts] = useState<ToastItem[]>([
		{
			id: "1",
			title: "Deploy finished",
			description: "Live in 4 regions.",
			tone: "success",
		},
	]);

	function push(tone: ToastTone) {
		setToasts((prev) => {
			const n = prev.length + 1;
			return [
				...prev,
				{
					id: String(Date.now()),
					title: `Notification ${n}`,
					description: "Dismiss me.",
					tone,
				},
			];
		});
	}

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<button type="button" className={BTN} onClick={() => push("info")}>
					Add toast
				</button>
				<button type="button" className={BTN} onClick={() => push("error")}>
					Add error
				</button>
			</div>
			<Toast
				toasts={toasts}
				position={(props.position as never) ?? "bottom-right"}
				onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
			/>
		</>
	);
}

const COMMANDS = [
	{ id: "deploy", label: "Deploy to production", shortcut: "D" },
	{ id: "rollback", label: "Roll back last deploy", shortcut: "R" },
	{ id: "logs", label: "Open runtime logs", shortcut: "L" },
	{ id: "settings", label: "Project settings" },
	{ id: "invite", label: "Invite a teammate" },
];

export function CommandDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Open palette
			</button>
			{last ? <p className="text-muted-foreground text-xs">Ran: {last}</p> : null}
			<Command
				items={COMMANDS}
				open={open}
				onOpenChange={setOpen}
				placeholder={(props.placeholder as string) || "Type a command or search…"}
				emptyLabel={(props.emptyLabel as string) || "No results"}
				onSelect={setLast}
			/>
		</div>
	);
}

const TOOLS = [
	{
		id: "bold",
		label: "Bold",
		path: "M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z",
	},
	{ id: "italic", label: "Italic", path: "M10 3H6.5M9.5 13H6M9 3 7 13" },
	{
		id: "link",
		label: "Link",
		path: "M6.5 9.5 9.5 6.5M7 4.5 8.5 3a2.8 2.8 0 0 1 4 4l-1.5 1.5M9 11.5 7.5 13a2.8 2.8 0 0 1-4-4L5 7.5",
	},
];

export function ToolbarDemo({ props }: { props: Props }) {
	return (
		<Toolbar
			orientation={(props.orientation as "horizontal" | "vertical") ?? "horizontal"}
			label={(props.label as string) || "Formatting"}
		>
			{TOOLS.map((tool) => (
				<button
					key={tool.id}
					type="button"
					data-toolbar-item
					aria-label={tool.label}
					className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
						<path
							d={tool.path}
							stroke="currentColor"
							strokeWidth="1.4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			))}
		</Toolbar>
	);
}

const NAV = [
	{ href: "#product", label: "Product" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#docs", label: "Docs" },
	{ href: "#blog", label: "Blog" },
];

export function FullscreenNavDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Open navigation
			</button>
			<FullscreenNav
				links={NAV}
				open={open}
				onOpenChange={setOpen}
				title={(props.title as string) || "Menu"}
			/>
		</>
	);
}
