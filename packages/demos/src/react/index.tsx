import type {
	ButtonSize,
	ButtonVariant,
	FileTreeNode,
	MorphSpring,
} from "@baby-ui/react";
import {
	BentoCell,
	BentoGrid,
	Button,
	FileTree,
	MorphingModal,
	Navbar,
} from "@baby-ui/react";
import { AgentScreenDemo } from "./agent-screen";
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
import { ChatComposerDemo } from "./chat-composer";
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
import { ContextCardsDemo } from "./context-cards";
import {
	AlertDialogDemo,
	CommandDemo,
	DialogDemo,
	DrawerDemo,
	FullscreenNavDemo,
	SheetDemo,
	ToastDemo,
	ToolbarDemo,
} from "./dialogs";
import { DiffTableDemo } from "./diff-table";
import { FilterTableDemo } from "./filter-table";
import { FineTuneCardDemo } from "./fine-tune-card";
import { FlowchartDemo } from "./flowchart";
import { LoadingStateDemo } from "./loading-state";
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
import { RecommendationCardDemo } from "./recommendation-card";
import { ResponsiveDialogDemo } from "./responsive-dialog";
import { StreamingTextDemo } from "./streaming-text";
import { TaskRowsDemo } from "./task-rows";
import { ThinkingStateDemo } from "./thinking-state";

type Props = Record<string, unknown>;

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
	dialog: DialogDemo,
	drawer: DrawerDemo,
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
	"responsive-dialog": ResponsiveDialogDemo,
	"context-cards": ContextCardsDemo,
	"filter-table": FilterTableDemo,
	"diff-table": DiffTableDemo,
	"fine-tune-card": FineTuneCardDemo,
	flowchart: FlowchartDemo,
	"loading-state": LoadingStateDemo,
	"recommendation-card": RecommendationCardDemo,
	"chat-composer": ChatComposerDemo,
	"thinking-state": ThinkingStateDemo,
	"task-rows": TaskRowsDemo,
	"streaming-text": StreamingTextDemo,
	"agent-screen": AgentScreenDemo,
};
