import type {
	ButtonSize,
	ButtonVariant,
	FileTreeNode,
	FileTreeSize,
	MorphingModalSize,
	MorphSpring,
	NavbarVariant,
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
import { AreaChartDemo } from "./area-chart";
import { BarChartDemo } from "./bar-chart";
import { CandlestickChartDemo } from "./candlestick-chart";
import { ChartBrushDemo } from "./chart-brush";
import { ChartMarkersDemo } from "./chart-markers";
import { ChartSeriesDemo } from "./chart-series";
import { ChartDemo, LineChartDemo } from "./charts";
import { ChatComposerDemo } from "./chat-composer";
import { ChoroplethChartDemo } from "./choropleth-chart";
import { CollabCardDemo } from "./collab-card";
import { ComposedChartDemo } from "./composed-chart";
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
} from "./dialogs";
import { DiffTableDemo } from "./diff-table";
import { DocsNavDemo } from "./docs-nav";
import { FillButtonDemo } from "./fill-button";
import { FilterTableDemo } from "./filter-table";
import { FineTuneCardDemo } from "./fine-tune-card";
import { FlowchartDemo } from "./flowchart";
import { FooterDemo } from "./footer";
import { FunnelChartDemo } from "./funnel-chart";
import { GaugeChartDemo } from "./gauge-chart";
import { HeatmapChartDemo } from "./heatmap-chart";
import { HeroStageDemo } from "./hero-stage";
import { LiveLineChartDemo } from "./live-line-chart";
import { LoadingScreenDemo } from "./loading-screen";
import { LoadingStateDemo } from "./loading-state";
import { LogoCarouselDemo } from "./logo-carousel";
import { MarkerDemo } from "./marker";
import { MegaNavbarDemo } from "./mega-navbar";
import {
	ArtGalleryDemo,
	ClickSparkDemo,
	CubeTextDemo,
	DraggableMarqueeDemo,
	TextReelDemo,
} from "./obsidian";
import {
	ComboboxDemo,
	ContextMenuDemo,
	DropdownMenuDemo,
	HoverCardDemo,
	PopoverDemo,
	SelectDemo,
	TooltipDemo,
} from "./overlays";
import { OverviewCardDemo } from "./overview-card";
import { ParticleTextDemo } from "./particle-text";
import { PieChartDemo } from "./pie-chart";
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
	ScrubFieldDemo,
	ShortcutDemo,
	ShowMoreDemo,
	SpinnerDemo,
	ToggleDemo,
	ToggleGroupDemo,
	TypographyDemo,
} from "./primitives2";
import { ProjectionLineDemo } from "./projection-line";
import { RadarChartDemo } from "./radar-chart";
import { RecommendationCardDemo } from "./recommendation-card";
import { RecordsTableDemo } from "./records-table";
import { ResponsiveDialogDemo } from "./responsive-dialog";
import { RingChartDemo } from "./ring-chart";
import { SankeyChartDemo } from "./sankey-chart";
import { ScatterChartDemo } from "./scatter-chart";
import { ScoreCardDemo } from "./score-card";
import { ScrollProgressDemo } from "./scroll-progress";
import { ScrollVelocityDemo } from "./scroll-velocity";
import { ShowcaseGridDemo } from "./showcase-grid";
import { SidebarNavDemo } from "./sidebar-nav";
import { StatCardDemo, StatCardMapDemo } from "./stat-card";
import { StatusMonitorDemo } from "./status-monitor";
import { StreamingTextDemo } from "./streaming-text";
import { SunburstChartDemo } from "./sunburst-chart";
import { TableDemo } from "./table";
import { TaskRowsDemo } from "./task-rows";
import {
	AnimatedGradientTextDemo,
	BoldCopyDemo,
	CircularTextDemo,
	CounterDemo,
	CycleTextDemo,
	DoubleUnderlineDemo,
	GibberishTextDemo,
	GlitchTextDemo,
	JitterTextDemo,
	JumpingTextDemo,
	MaskTextDemo,
	MetisTextDemo,
	MirrorTextDemo,
	RollTextDemo,
	ScrollRevealDemo,
	SplitTextDemo,
	StaggeredLetterDemo,
	SwapTextDemo,
	TextBorderAnimationDemo,
	TextExplodeIMessageDemo,
	TextFlipDemo,
	TextTransitionDemo,
	TickerDemo,
	TypingTextDemo,
	UnderlineHoverTextDemo,
	WaveRevealDemo,
} from "./text";
import {
	DiaTextDemo,
	MorphTextDemo,
	RevealTextDemo,
	RollingDigitsDemo,
	ShimmerTextDemo,
	TextInertiaDemo,
	TextLoopDemo,
	TypewriterDemo,
} from "./text-motion";
import { TextRepelDemo } from "./text-repel";
import { ThemeToggleDemo } from "./theme-toggle";
import { ThinkingStateDemo } from "./thinking-state";
import { ToolChipsDemo } from "./tool-chips";
import { UsageCardDemo } from "./usage-card";
import { WeekCalendarDemo } from "./week-calendar";
import { WheelCarouselDemo } from "./wheel-carousel";
import { WheelPickerDemo } from "./wheel-picker";

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
		image: "https://picsum.photos/id/1036/800/300",
	},
	{
		span: "1x1" as const,
		title: "Tokens",
		body: "Shared colour and motion.",
		image: "https://picsum.photos/id/1050/400/300",
	},
	{
		span: "1x1" as const,
		title: "Agents",
		body: "llms.txt and specs.json.",
		image: "https://picsum.photos/id/1057/400/300",
	},
	{
		span: "1x1" as const,
		title: "Playground",
		body: "Both renders, side by side.",
		image: "https://picsum.photos/id/1067/400/300",
	},
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
				>
					<img
						src={cell.image}
						alt=""
						loading="lazy"
						className="mt-3 size-full rounded-lg object-cover"
					/>
				</BentoCell>
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
			size={(props.size as FileTreeSize) ?? "md"}
			className="w-64"
		/>
	);
}

function NavbarDemo({ props }: { props: Props }) {
	const variant = (props.variant as NavbarVariant) ?? "solid";
	return (
		<div className="w-full max-w-3xl overflow-hidden rounded-xl border border-border">
			<Navbar
				links={NAV_LINKS}
				active="#product"
				sticky={false}
				blur={props.blur !== false}
				variant={variant}
				className={variant === "solid" ? "border-border border-b bg-card" : undefined}
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
			size={(props.size as MorphingModalSize) ?? "md"}
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
	table: TableDemo,
	textarea: TextareaDemo,
	"theme-toggle": ThemeToggleDemo,
	navbar: NavbarDemo,
	"mega-navbar": MegaNavbarDemo,
	footer: FooterDemo,
	"bento-grid": BentoGridDemo,
	"file-tree": FileTreeDemo,
	"morphing-modal": MorphingModalDemo,
	"copy-button": CopyButtonDemo,
	"fill-button": FillButtonDemo,
	"loading-screen": LoadingScreenDemo,
	"text-repel": TextRepelDemo,
	"particle-text": ParticleTextDemo,
	"scroll-velocity": ScrollVelocityDemo,
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
	"scrub-field": ScrubFieldDemo,
	dialog: DialogDemo,
	drawer: DrawerDemo,
	"alert-dialog": AlertDialogDemo,
	sheet: SheetDemo,
	toast: ToastDemo,
	command: CommandDemo,
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
	"collab-card": CollabCardDemo,
	chart: ChartDemo,
	"chart-brush": ChartBrushDemo,
	"chart-markers": ChartMarkersDemo,
	"choropleth-chart": ChoroplethChartDemo,
	"projection-line": ProjectionLineDemo,
	"chart-series": ChartSeriesDemo,
	"line-chart": LineChartDemo,
	"area-chart": AreaChartDemo,
	"composed-chart": ComposedChartDemo,
	"live-line-chart": LiveLineChartDemo,
	"scatter-chart": ScatterChartDemo,
	"candlestick-chart": CandlestickChartDemo,
	"bar-chart": BarChartDemo,
	"pie-chart": PieChartDemo,
	"heatmap-chart": HeatmapChartDemo,
	"sankey-chart": SankeyChartDemo,
	"ring-chart": RingChartDemo,
	"radar-chart": RadarChartDemo,
	"gauge-chart": GaugeChartDemo,
	"sunburst-chart": SunburstChartDemo,
	"funnel-chart": FunnelChartDemo,
	"filter-table": FilterTableDemo,
	"diff-table": DiffTableDemo,
	"docs-nav": DocsNavDemo,
	"records-table": RecordsTableDemo,
	"fine-tune-card": FineTuneCardDemo,
	flowchart: FlowchartDemo,
	"loading-state": LoadingStateDemo,
	"hero-stage": HeroStageDemo,
	"showcase-grid": ShowcaseGridDemo,
	"status-monitor": StatusMonitorDemo,
	"logo-carousel": LogoCarouselDemo,
	"recommendation-card": RecommendationCardDemo,
	"chat-composer": ChatComposerDemo,
	"thinking-state": ThinkingStateDemo,
	"task-rows": TaskRowsDemo,
	"streaming-text": StreamingTextDemo,
	"agent-screen": AgentScreenDemo,
	"tool-chips": ToolChipsDemo,
	"sidebar-nav": SidebarNavDemo,
	"animated-gradient-text": AnimatedGradientTextDemo,
	"double-underline": DoubleUnderlineDemo,
	"bold-copy": BoldCopyDemo,
	"mirror-text": MirrorTextDemo,
	"gibberish-text": GibberishTextDemo,
	"glitch-text": GlitchTextDemo,
	"metis-text": MetisTextDemo,
	"underline-hover-text": UnderlineHoverTextDemo,
	"text-border-animation": TextBorderAnimationDemo,
	"roll-text": RollTextDemo,
	"split-text": SplitTextDemo,
	"swap-text": SwapTextDemo,
	"text-flip": TextFlipDemo,
	"wave-reveal": WaveRevealDemo,
	"typing-text": TypingTextDemo,
	"text-transition": TextTransitionDemo,
	"circular-text": CircularTextDemo,
	"cube-text": CubeTextDemo,
	"text-reel": TextReelDemo,
	"draggable-marquee": DraggableMarqueeDemo,
	"click-spark": ClickSparkDemo,
	"art-gallery": ArtGalleryDemo,
	"jitter-text": JitterTextDemo,
	"jumping-text": JumpingTextDemo,
	"mask-text": MaskTextDemo,
	"staggered-letter": StaggeredLetterDemo,
	"stat-card": StatCardDemo,
	"stat-card-map": StatCardMapDemo,
	"cycle-text": CycleTextDemo,
	counter: CounterDemo,
	ticker: TickerDemo,
	"scroll-reveal": ScrollRevealDemo,
	"text-explode-imessage": TextExplodeIMessageDemo,
	"dia-text": DiaTextDemo,
	"morph-text": MorphTextDemo,
	"reveal-text": RevealTextDemo,
	"scroll-progress": ScrollProgressDemo,
	"shimmer-text": ShimmerTextDemo,
	"text-inertia": TextInertiaDemo,
	"text-loop": TextLoopDemo,
	typewriter: TypewriterDemo,
	"week-calendar": WeekCalendarDemo,
	"rolling-digits": RollingDigitsDemo,
	marker: MarkerDemo,
	"wheel-carousel": WheelCarouselDemo,
	"wheel-picker": WheelPickerDemo,
	"overview-card": OverviewCardDemo,
	"usage-card": UsageCardDemo,
	"score-card": ScoreCardDemo,
};
