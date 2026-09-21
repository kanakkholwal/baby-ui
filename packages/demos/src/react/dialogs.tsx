"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
	Button,
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandShortcut,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	type DrawerDirection,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	FullscreenNav,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
	Shortcut,
	Slider,
	Toaster,
	type ToasterProps,
	Toolbar,
	toast,
} from "@baby-ui/react";
import { useId, useState } from "react";

type Props = Record<string, unknown>;

const BTN =
	"inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm";

export function DialogDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [domain, setDomain] = useState("");
	const id = useId();
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
			dismissOnBackdrop={props.dismissOnBackdrop !== false}
		>
			<DialogTrigger className={BTN}>Add domain</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<svg viewBox="0 0 20 20" fill="none" aria-hidden>
							<circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
							<path
								d="M2.5 10h15M10 2.5c2.5 2.5 2.5 12.5 0 15M10 2.5c-2.5 2.5-2.5 12.5 0 15"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						Add a domain
					</DialogTitle>
					<DialogDescription>
						Add an existing domain to your baby-ui project.
					</DialogDescription>
				</DialogHeader>
				<DialogClose />
				<div className="mt-4 flex flex-col gap-1.5">
					<Label htmlFor={id}>Domain</Label>
					<Input
						id={id}
						value={domain}
						onChange={(e) => setDomain(e.currentTarget.value)}
						placeholder="example.com"
					/>
					<p className="text-muted-foreground text-sm">
						We'll guide you through DNS configuration next.
					</p>
				</div>
				<DialogFooter>
					<Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
						Cancel
						<Shortcut shortcut="esc" size="sm" />
					</Button>
					<Button size="sm" className="ml-auto" onClick={() => setOpen(false)}>
						Add
						<Shortcut shortcut="enter" size="sm" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export function AlertDialogDemo({ props }: { props: Props }) {
	const [done, setDone] = useState(false);
	return (
		<div className="flex flex-col items-center gap-3">
			<AlertDialog>
				<AlertDialogTrigger className={BTN}>Delete project</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Delete this project?</AlertDialogTitle>
						<AlertDialogDescription>
							This removes every deployment and cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							destructive={props.destructive !== false}
							onClick={() => setDone(true)}
						>
							Delete
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{done ? <p className="text-muted-foreground text-xs">Confirmed</p> : null}
		</div>
	);
}

const REGIONS = [
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "syd", label: "Sydney" },
];

export function SheetDemo({ props }: { props: Props }) {
	const [region, setRegion] = useState("fra");
	const id = useId();
	return (
		<Sheet>
			<SheetTrigger className={BTN}>Open sheet</SheetTrigger>
			<SheetContent side={(props.side as "left" | "right" | "top" | "bottom") ?? "right"}>
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
					<SheetClose />
				</SheetHeader>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor={id}>Region</Label>
					<Select value={region} onValueChange={setRegion}>
						<SelectTrigger id={id} aria-label="Region">
							<SelectValue placeholder="Pick a region" />
						</SelectTrigger>
						<SelectContent>
							{REGIONS.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<p className="text-muted-foreground text-sm">
					Escape closes the sheet and restores focus.
				</p>
			</SheetContent>
		</Sheet>
	);
}

// The same set beUI's preview opens, plus the tones it lacks.
const TOAST_EXAMPLES: { label: string; run: () => unknown }[] = [
	{ label: "Title only", run: () => toast.success("Saved") },
	{
		label: "Promise",
		run: () => {
			// A shared `description` on toast.promise() would show on every state; updating
			// the same id by hand gives loading and success their own, like beUI's demo.
			const id = toast.loading("Publishing component", {
				description: "Bundling source, preview, and registry metadata.",
			});
			setTimeout(() => {
				toast.success("Component published", {
					id,
					description: "Registry endpoint and raw source are available.",
				});
			}, 1800);
		},
	},
	{
		label: "Success",
		run: () =>
			toast.success("Component published", {
				description: "Registry endpoint and raw source are available.",
			}),
	},
	{
		label: "Error",
		run: () =>
			toast.error("Snapshot failed", {
				description: "Retry after the browser target settles.",
			}),
	},
	{
		label: "Warning",
		run: () =>
			toast.warning("Quota at 90%", {
				description: "Builds pause when the month's minutes run out.",
			}),
	},
	{
		label: "Info",
		run: () =>
			toast.info("New version available", { description: "Reload to pick up 0.4.2." }),
	},
	{
		label: "Action",
		run: () =>
			toast("Invite sent", {
				description: "mia@acme.dev can join the workspace.",
				action: { label: "Undo", onClick: () => toast("Invite withdrawn") },
			}),
	},
];

export function ToastDemo({ props }: { props: Props }) {
	const position = (props.position as ToasterProps["position"]) ?? "bottom-right";
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-wrap items-center justify-center gap-2">
				{TOAST_EXAMPLES.map((example) => (
					<Button
						key={example.label}
						variant="outline"
						size="sm"
						className="rounded-full"
						onClick={example.run}
					>
						{example.label}
					</Button>
				))}
				<Button
					variant="ghost"
					size="sm"
					className="rounded-full"
					onClick={() => toast.dismiss()}
				>
					Clear
				</Button>
			</div>
			<p className="max-w-sm text-center text-muted-foreground text-xs leading-5">
				Toasts render fixed on the screen. Change the position in the controls to open
				from another edge.
			</p>
			<Toaster
				position={position}
				expand={props.expand !== false}
				closeButton={props.closeButton !== false}
			/>
		</div>
	);
}

export function CommandDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [last, setLast] = useState("");

	function run(id: string) {
		setLast(id);
		setOpen(false);
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<button type="button" className={BTN} onClick={() => setOpen(true)}>
				Open palette
			</button>
			{last ? <p className="text-muted-foreground text-xs">Ran: {last}</p> : null}
			<CommandDialog open={open} onOpenChange={setOpen}>
				<Command>
					<CommandInput
						placeholder={(props.placeholder as string) || "Type a command or search…"}
					/>
					<CommandList>
						<CommandEmpty>{(props.emptyLabel as string) || "No results"}</CommandEmpty>
						<CommandGroup heading="Actions">
							<CommandItem value="New project" onClick={() => run("new")}>
								New project
								<CommandShortcut>N</CommandShortcut>
							</CommandItem>
							<CommandItem
								value="Deploy"
								keywords="ship release"
								onClick={() => run("deploy")}
							>
								Deploy
								<CommandShortcut>D</CommandShortcut>
							</CommandItem>
						</CommandGroup>
						<CommandGroup heading="Go to">
							<CommandItem value="Documentation" onClick={() => run("docs")}>
								Documentation
							</CommandItem>
							<CommandItem value="Settings" onClick={() => run("settings")}>
								Settings
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</CommandDialog>
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

export function DrawerDemo({ props }: { props: Props }) {
	const [open, setOpen] = useState(false);
	const [budget, setBudget] = useState(60);
	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
			direction={(props.direction as DrawerDirection) ?? "bottom"}
			dismissible={props.dismissible !== false}
		>
			<DrawerTrigger className={BTN}>Set a budget</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>Monthly budget</DrawerTitle>
					<DrawerDescription>
						Alerts go out when spend crosses this line.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerClose />
				<div className="mt-6 flex flex-col gap-4">
					<div className="flex items-baseline justify-between">
						<span className="text-muted-foreground text-sm">Limit</span>
						<span className="font-semibold text-3xl text-foreground tabular-nums">
							${budget}
						</span>
					</div>
					<Slider
						value={budget}
						onValueChange={setBudget}
						min={10}
						max={200}
						step={5}
						label="Monthly budget"
					/>
					<p className="text-muted-foreground text-xs">Spent so far this month: $42.</p>
				</div>
				<DrawerFooter>
					<DrawerClose className="inline-flex h-9 items-center justify-center rounded-lg px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]">
						Cancel
					</DrawerClose>
					<Button onClick={() => setOpen(false)}>Save budget</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
