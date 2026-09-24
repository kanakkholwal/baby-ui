import type { ComponentSpec } from "../index";
import { accordion } from "./accordion";
import { agentScreen } from "./agent-screen";
import { alert } from "./alert";
import { alertDialog } from "./alert-dialog";
import { animatedGradientText } from "./animated-gradient-text";
import { areaChart } from "./area-chart";
import { attachment } from "./attachment";
import { avatar } from "./avatar";
import { badge } from "./badge";
import { barChart } from "./bar-chart";
import { bentoGrid } from "./bento-grid";
import { boldCopy } from "./bold-copy";
import { breadcrumb } from "./breadcrumb";
import { button } from "./button";
import { candlestickChart } from "./candlestick-chart";
import { card } from "./card";
import { chart, lineChart } from "./chart";
import { chartBrush } from "./chart-brush";
import { chartMarkers } from "./chart-markers";
import { chartSeries } from "./chart-series";
import { chatComposer } from "./chat-composer";
import { checkbox } from "./checkbox";
import { choroplethChart } from "./choropleth-chart";
import { circularText } from "./circular-text";
import { codeBlock } from "./code-block";
import { collabCard } from "./collab-card";
import { collapsible } from "./collapsible";
import { colorPicker } from "./color-picker";
import { combobox } from "./combobox";
import { command } from "./command";
import { composedChart } from "./composed-chart";
import { composer } from "./composer";
import { contextCards } from "./context-cards";
import { contextMenu } from "./context-menu";
import { conversation } from "./conversation";
import { copyButton } from "./copy-button";
import { counter } from "./counter";
import { cycleText } from "./cycle-text";
import { dialog } from "./dialog";
import { diffTable } from "./diff-table";
import { doubleUnderline } from "./double-underline";
import { drawer } from "./drawer";
import { dropdownMenu } from "./dropdown-menu";
import { fileDiff } from "./file-diff";
import { fileTree } from "./file-tree";
import { filterTable } from "./filter-table";
import { fineTuneCard } from "./fine-tune-card";
import { flowchart } from "./flowchart";
import { footer } from "./footer";
import { fullscreenNav } from "./fullscreen-nav";
import { funnelChart } from "./funnel-chart";
import { gauge } from "./gauge";
import { gaugeChart } from "./gauge-chart";
import { gibberishText } from "./gibberish-text";
import { glitchText } from "./glitch-text";
import { heatmapChart } from "./heatmap-chart";
import { hoverCard } from "./hover-card";
import { input } from "./input";
import { jitterText } from "./jitter-text";
import { jumpingText } from "./jumping-text";
import { label } from "./label";
import { liveLineChart } from "./live-line-chart";
import { loadingState } from "./loading-state";
import { logoCarousel } from "./logo-carousel";
import { markdown } from "./markdown";
import { maskText } from "./mask-text";
import { megaNavbar } from "./mega-navbar";
import { message } from "./message";
import { metisText } from "./metis-text";
import { mirrorText } from "./mirror-text";
import { morphingModal } from "./morphing-modal";
import { navbar } from "./navbar";
import { pagination } from "./pagination";
import { pieChart } from "./pie-chart";
import { popover } from "./popover";
import { progress } from "./progress";
import { projectionLine } from "./projection-line";
import { question } from "./question";
import { radarChart } from "./radar-chart";
import { radioGroup } from "./radio-group";
import { reasoning } from "./reasoning";
import { recommendationCard } from "./recommendation-card";
import { recordsTable } from "./records-table";
import { reorderList } from "./reorder-list";
import { responseStream } from "./response-stream";
import { responsiveDialog } from "./responsive-dialog";
import { ringChart } from "./ring-chart";
import { rollText } from "./roll-text";
import { sankeyChart } from "./sankey-chart";
import { scatterChart } from "./scatter-chart";
import { scrollArea } from "./scroll-area";
import { scrollReveal } from "./scroll-reveal";
import { scrubField } from "./scrub-field";
import { select } from "./select";
import { sheet } from "./sheet";
import { shortcut } from "./shortcut";
import { showMore } from "./show-more";
import { sidebarNav } from "./sidebar-nav";
import { skeleton } from "./skeleton";
import { slider } from "./slider";
import { spinner } from "./spinner";
import { splitText } from "./split-text";
import { staggeredLetter } from "./staggered-letter";
import { statCard, statCardMap } from "./stat-card";
import { streamingText } from "./streaming-text";
import { sunburstChart } from "./sunburst-chart";
import { swapText } from "./swap-text";
import { switchComponent } from "./switch";
import { table } from "./table";
import { tabs } from "./tabs";
import { tagInput } from "./tag-input";
import { taskRows } from "./task-rows";
import { taskSteps } from "./task-steps";
import { textBorderAnimation } from "./text-border-animation";
import { textExplodeIMessage } from "./text-explode-imessage";
import { textFlip } from "./text-flip";
import { textTransition } from "./text-transition";
import { textarea } from "./textarea";
import { themeToggle } from "./theme-toggle";
import { thinkingState } from "./thinking-state";
import { ticker } from "./ticker";
import { toast } from "./toast";
import { toggle } from "./toggle";
import { toggleGroup } from "./toggle-group";
import { tool } from "./tool";
import { toolChips } from "./tool-chips";
import { tooltip } from "./tooltip";
import { typingText } from "./typing-text";
import { typography } from "./typography";
import { underlineHoverText } from "./underline-hover-text";
import { waveReveal } from "./wave-reveal";

export const specs: ComponentSpec[] = [
	accordion,
	alert,
	avatar,
	badge,
	breadcrumb,
	button,
	card,
	checkbox,
	input,
	label,
	progress,
	radioGroup,
	scrubField,
	skeleton,
	slider,
	switchComponent,
	table,
	tabs,
	textarea,
	themeToggle,
	combobox,
	contextMenu,
	dropdownMenu,
	hoverCard,
	popover,
	select,
	tooltip,
	alertDialog,
	command,
	sheet,
	toast,
	collapsible,
	gauge,
	pagination,
	scrollArea,
	shortcut,
	showMore,
	spinner,
	toggle,
	toggleGroup,
	typography,
	codeBlock,
	colorPicker,
	copyButton,
	fileDiff,
	markdown,
	reorderList,
	tagInput,
	navbar,
	megaNavbar,
	footer,
	bentoGrid,
	collabCard,
	logoCarousel,
	fullscreenNav,
	fileTree,
	morphingModal,
	dialog,
	drawer,
	message,
	responseStream,
	reasoning,
	taskSteps,
	attachment,
	composer,
	conversation,
	question,
	tool,
	toolChips,
	responsiveDialog,
	contextCards,
	filterTable,
	diffTable,
	recordsTable,
	fineTuneCard,
	flowchart,
	sidebarNav,
	loadingState,
	recommendationCard,
	chatComposer,
	thinkingState,
	taskRows,
	streamingText,
	agentScreen,
	animatedGradientText,
	doubleUnderline,
	boldCopy,
	mirrorText,
	gibberishText,
	metisText,
	underlineHoverText,
	textBorderAnimation,
	splitText,
	swapText,
	textFlip,
	waveReveal,
	glitchText,
	rollText,
	typingText,
	textTransition,
	circularText,
	jitterText,
	jumpingText,
	maskText,
	staggeredLetter,
	cycleText,
	counter,
	ticker,
	scrollReveal,
	textExplodeIMessage,
	chart,
	chartSeries,
	areaChart,
	composedChart,
	lineChart,
	liveLineChart,
	scatterChart,
	candlestickChart,
	barChart,
	pieChart,
	ringChart,
	radarChart,
	gaugeChart,
	heatmapChart,
	sankeyChart,
	sunburstChart,
	funnelChart,
	choroplethChart,
	chartMarkers,
	projectionLine,
	chartBrush,
	statCard,
	statCardMap,
];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
