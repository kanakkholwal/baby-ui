import type {
	ButtonSize,
	ButtonVariant,
	DockSpring,
	FileTreeNode,
	MorphSpring,
} from "@baby-ui/react";
import {
	BentoCell,
	BentoGrid,
	Button,
	Dock,
	DockItem,
	DockSeparator,
	FileTree,
	MorphingModal,
	Navbar,
} from "@baby-ui/react";
import { useState } from "react";
import {
	BreadcrumbDemo,
	MessageDemo,
	RadioGroupDemo,
	ReasoningDemo,
	ResponseStreamDemo,
	SliderDemo,
	TabsDemo,
	TaskStepsDemo,
} from "./agentic";
import {
	AttachmentDemo,
	CodeBlockDemo,
	ColorPickerDemo,
	ComposerDemo,
	ConversationDemo,
	CopyButtonDemo,
	FileDiffDemo,
	MarkdownDemo,
	QuestionDemo,
	ReorderListDemo,
	TagInputDemo,
	ToolDemo,
} from "./content";
import {
	AlertDialogDemo,
	CommandDemo,
	FullscreenNavDemo,
	ModalDemo,
	SheetDemo,
	ToastDemo,
	ToolbarDemo,
} from "./dialogs";
import {
	ComboboxDemo,
	ContextMenuDemo,
	DropdownMenuDemo,
	HoverCardDemo,
	PopoverDemo,
	SelectDemo,
	TooltipDemo,
} from "./overlays";
import {
	AccordionDemo,
	AlertDemo,
	AvatarDemo,
	BadgeDemo,
	CardDemo,
	CheckboxDemo,
	InputDemo,
	LabelDemo,
	ProgressDemo,
	SkeletonDemo,
	SwitchDemo,
	TextareaDemo,
} from "./primitives";
import {
	CollapsibleDemo,
	GaugeDemo,
	PaginationDemo,
	ScrollAreaDemo,
	ShortcutDemo,
	ShowMoreDemo,
	SpinnerDemo,
	ToggleDemo,
	ToggleGroupDemo,
	TypographyDemo,
} from "./primitives2";

type Props = Record<string, unknown>;

const ICONS = [
	{
		id: "home",
		label: "Home",
		d: "M3 9.5 10 4l7 5.5V16a1 1 0 0 1-1 1h-3v-4H7v4H4a1 1 0 0 1-1-1z",
	},
	{
		id: "search",
		label: "Search",
		d: "M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12zm4.5-1.5L17 17",
	},
	{
		id: "files",
		label: "Files",
		d: "M3 6a1 1 0 0 1 1-1h3.6l1.4 2H16a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z",
	},
	{
		id: "settings",
		label: "Settings",
		d: "M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM10 2v2M10 16v2M2 10h2M16 10h2",
	},
];

function ButtonDemo({ props }: { props: Props }) {
	const size = (props.size as ButtonSize) ?? "md";
	return (
		<Button
			variant={(props.variant as ButtonVariant) ?? "default"}
			size={size}
			href={(props.href as string) || undefined}
			loading={Boolean(props.loading)}
			loadingLabel={(props.loadingLabel as string) || "Loading…"}
			disabled={Boolean(props.disabled)}
		>
			{size === "icon" ? (
				<svg viewBox="0 0 16 16" fill="none" aria-hidden>
					<path
						d="M8 3.5v9M3.5 8h9"
						stroke="currentColor"
						strokeWidth="1.6"
						strokeLinecap="round"
					/>
				</svg>
			) : (
				"Deploy project"
			)}
		</Button>
	);
}

function DockDemo({ props }: { props: Props }) {
	const [active, setActive] = useState("home");
	return (
		<Dock
			size={Number(props.size ?? 44)}
			magnification={Number(props.magnification ?? 72)}
			distance={Number(props.distance ?? 140)}
			spring={(props.spring as DockSpring) ?? "gentle"}
		>
			{ICONS.map((icon) => (
				<DockItem
					key={icon.id}
					active={active === icon.id}
					onClick={() => setActive(icon.id)}
					aria-label={icon.label}
					className="hover:bg-foreground/[0.06]"
				>
					<svg
						viewBox="0 0 20 20"
						fill="none"
						aria-hidden
						className="size-[45%] text-foreground/80"
					>
						<path
							d={icon.d}
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</DockItem>
			))}
			<DockSeparator />
			<DockItem aria-label="Profile" className="hover:bg-foreground/[0.06]">
				<span className="grid size-[55%] place-items-center rounded-full bg-primary/15 text-[0.7em] font-medium">
					KK
				</span>
			</DockItem>
		</Dock>
	);
}

const SAMPLE_TREE: FileTreeNode[] = [
	{
		name: "src",
		children: [
			{
				name: "routes",
				children: [{ name: "+layout.svelte" }, { name: "+page.svelte" }],
			},
			{ name: "lib", children: [{ name: "cn.ts" }, { name: "tokens.css" }] },
			{ name: "app.html" },
		],
	},
	{ name: "package.json" },
	{ name: "vite.config.ts" },
];

const CELLS = [
	{
		span: "2x1" as const,
		title: "Registry",
		body: "shadcn and shadcn-svelte, one spec.",
	},
	{ span: "1x1" as const, title: "Tokens", body: "Shared colour and motion." },
	{ span: "1x1" as const, title: "Agents", body: "llms.txt and specs.json." },
	{ span: "1x1" as const, title: "Playground", body: "Both renders, side by side." },
];

const NAV_LINKS = [
	{ href: "#product", label: "Product" },
	{ href: "#pricing", label: "Pricing" },
	{ href: "#docs", label: "Docs" },
];

function BentoGridDemo({ props }: { props: Props }) {
	return (
		<BentoGrid
			columns={Number(props.columns ?? 3)}
			gap={Number(props.gap ?? 16)}
			rowHeight={Number(props.rowHeight ?? 160)}
			className="w-full max-w-2xl"
		>
			{CELLS.map((cell) => (
				<BentoCell
					key={cell.title}
					span={cell.span}
					title={cell.title}
					description={cell.body}
				/>
			))}
		</BentoGrid>
	);
}

function FileTreeDemo({ props }: { props: Props }) {
	return (
		<FileTree
			tree={SAMPLE_TREE}
			indent={Number(props.indent ?? 14)}
			showGuides={props.showGuides !== false}
			defaultExpanded={props.defaultExpanded !== false}
			className="w-64"
		/>
	);
}

function NavbarDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border">
			<Navbar
				links={NAV_LINKS}
				active="#product"
				sticky={false}
				blur={props.blur !== false}
				className="border-border border-b bg-card"
				brand={<span className="font-semibold text-sm tracking-tight">Acme</span>}
				actions={
					<span className="hidden rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs sm:inline-flex">
						Sign up
					</span>
				}
			/>
			<div className="h-24 bg-background" />
		</div>
	);
}

function MorphingModalDemo({ props }: { props: Props }) {
	return (
		<MorphingModal
			title="Deploy to production"
			spring={(props.spring as MorphSpring) ?? "gentle"}
			dismissOnBackdrop={props.dismissOnBackdrop !== false}
			backdropBlur={Number(props.backdropBlur ?? 8)}
			trigger={
				<div className="w-56 rounded-2xl border border-border bg-card p-4">
					<p className="font-medium text-foreground text-sm">Deploy to production</p>
					<p className="mt-1 text-muted-foreground text-xs">Click to expand</p>
				</div>
			}
		>
			This dialog grew out of the card&apos;s own box. Closing runs the same path in
			reverse, a little faster.
		</MorphingModal>
	);
}

export const demos: Record<string, (p: { props: Props }) => React.ReactElement> = {
	accordion: AccordionDemo,
	alert: AlertDemo,
	avatar: AvatarDemo,
	badge: BadgeDemo,
	button: ButtonDemo,
	card: CardDemo,
	checkbox: CheckboxDemo,
	input: InputDemo,
	label: LabelDemo,
	progress: ProgressDemo,
	skeleton: SkeletonDemo,
	switch: SwitchDemo,
	textarea: TextareaDemo,
	navbar: NavbarDemo,
	"bento-grid": BentoGridDemo,
	"file-tree": FileTreeDemo,
	"morphing-modal": MorphingModalDemo,
	dock: DockDemo,
	"copy-button": CopyButtonDemo,
	"code-block": CodeBlockDemo,
	markdown: MarkdownDemo,
	"file-diff": FileDiffDemo,
	"tag-input": TagInputDemo,
	"color-picker": ColorPickerDemo,
	"reorder-list": ReorderListDemo,
	attachment: AttachmentDemo,
	composer: ComposerDemo,
	conversation: ConversationDemo,
	tool: ToolDemo,
	question: QuestionDemo,
	spinner: SpinnerDemo,
	toggle: ToggleDemo,
	"toggle-group": ToggleGroupDemo,
	collapsible: CollapsibleDemo,
	"show-more": ShowMoreDemo,
	shortcut: ShortcutDemo,
	typography: TypographyDemo,
	gauge: GaugeDemo,
	pagination: PaginationDemo,
	"scroll-area": ScrollAreaDemo,
	modal: ModalDemo,
	"alert-dialog": AlertDialogDemo,
	sheet: SheetDemo,
	toast: ToastDemo,
	command: CommandDemo,
	toolbar: ToolbarDemo,
	"fullscreen-nav": FullscreenNavDemo,
	popover: PopoverDemo,
	tooltip: TooltipDemo,
	"dropdown-menu": DropdownMenuDemo,
	"context-menu": ContextMenuDemo,
	"hover-card": HoverCardDemo,
	select: SelectDemo,
	combobox: ComboboxDemo,
	breadcrumb: BreadcrumbDemo,
	"radio-group": RadioGroupDemo,
	slider: SliderDemo,
	tabs: TabsDemo,
	message: MessageDemo,
	"response-stream": ResponseStreamDemo,
	reasoning: ReasoningDemo,
	"task-steps": TaskStepsDemo,
};
