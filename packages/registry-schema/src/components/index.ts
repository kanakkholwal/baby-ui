import type { ComponentSpec } from "../index";
import { accordion } from "./accordion";
import { agentScreen } from "./agent-screen";
import { alertDialog } from "./alert-dialog";
import { alert } from "./alert";
import { animatedGradientText } from "./animated-gradient-text";
import { animatedGradient } from "./animated-gradient";
import { areaChart } from "./area-chart";
import { artGallery } from "./art-gallery";
import { asciiEffect } from "./ascii-effect";
import { attachment } from "./attachment";
import { auroraFlow } from "./aurora-flow";
import { avatar } from "./avatar";
import { badge } from "./badge";
import { barChart } from "./bar-chart";
import { bentoGrid } from "./bento-grid";
import { boldCopy } from "./bold-copy";
import { breadcrumb } from "./breadcrumb";
import { button } from "./button";
import { calendar, rangeCalendar } from "./calendar";
import { candlestickChart } from "./candlestick-chart";
import { card } from "./card";
import { caseStudyFlipStack } from "./case-study-flip-stack";
import { chartBrush } from "./chart-brush";
import { chartMarkers } from "./chart-markers";
import { chartSeries } from "./chart-series";
import { chart, lineChart } from "./chart";
import { chatComposer } from "./chat-composer";
import { checkbox } from "./checkbox";
import { choroplethChart } from "./choropleth-chart";
import { circuitBoard } from "./circuit-board";
import { circularText } from "./circular-text";
import { clickSpark } from "./click-spark";
import { closingPlasma } from "./closing-plasma";
import { codeBlock } from "./code-block";
import { collabCard } from "./collab-card";
import { collapsible } from "./collapsible";
import { collectionSurfer } from "./collection-surfer";
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
import { cubeText } from "./cube-text";
import { cycleText } from "./cycle-text";
import { diaText } from "./dia-text";
import { dialog } from "./dialog";
import { diffTable } from "./diff-table";
import { ditherGradient } from "./dither-gradient";
import { ditheredLogo } from "./dithered-logo";
import { docsNav } from "./docs-nav";
import { doubleUnderline } from "./double-underline";
import { draggableMarquee } from "./draggable-marquee";
import { drawer } from "./drawer";
import { dropdownMenu } from "./dropdown-menu";
import { emailKit } from "./email-kit";
import { emailWelcome } from "./email-welcome";
import { eyeTracking } from "./eye-tracking";
import { field } from "./field";
import { fileDiff } from "./file-diff";
import { fileTree } from "./file-tree";
import { fillButton } from "./fill-button";
import { filterTable } from "./filter-table";
import { fineTuneCard } from "./fine-tune-card";
import { fisheyeInfiniteGrid } from "./fisheye-infinite-grid";
import { flightStatusCard } from "./flight-status-card";
import { flowchart } from "./flowchart";
import { footer } from "./footer";
import { form } from "./form";
import { fullscreenNav } from "./fullscreen-nav";
import { funnelChart } from "./funnel-chart";
import { gaugeChart } from "./gauge-chart";
import { gauge } from "./gauge";
import { gibberishText } from "./gibberish-text";
import { githubCalendar } from "./github-calendar";
import { glitchText } from "./glitch-text";
import { gradientHero01 } from "./gradient-hero-01";
import { grainGradient } from "./grain-gradient";
import { heatmapChart } from "./heatmap-chart";
import { heroStage } from "./hero-stage";
import { hoverCard } from "./hover-card";
import { hoverTransition } from "./hover-transition";
import { imageTrail } from "./image-trail";
import { infiniteImageField } from "./infinite-image-field";
import { inputGroup } from "./input-group";
import { inputOtp } from "./input-otp";
import { input } from "./input";
import { jitterText } from "./jitter-text";
import { jumpingText } from "./jumping-text";
import { label } from "./label";
import { layeredStack } from "./layered-stack";
import { liquidChrome } from "./liquid-chrome";
import { liveLineChart } from "./live-line-chart";
import { loadingScreen } from "./loading-screen";
import { loadingState } from "./loading-state";
import { logoCarousel } from "./logo-carousel";
import { magnetLines } from "./magnet-lines";
import { markdown } from "./markdown";
import { marker } from "./marker";
import { maskText } from "./mask-text";
import { megaNavbar } from "./mega-navbar";
import { message } from "./message";
import { metisText } from "./metis-text";
import { mirrorText } from "./mirror-text";
import { morphText } from "./morph-text";
import { morphingModal } from "./morphing-modal";
import { musicPlayer } from "./music-player";
import { nativeSelect } from "./native-select";
import { navbar } from "./navbar";
import { navigationMenu } from "./navigation-menu";
import { notchedShelf } from "./notched-shelf";
import { ogAuthorProfile } from "./og-author-profile";
import { ogBlogPost } from "./og-blog-post";
import { ogChangelog } from "./og-changelog";
import { ogDocsPage } from "./og-docs-page";
import { ogGithubRepo } from "./og-github-repo";
import { ogNewsletterIssue } from "./og-newsletter-issue";
import { orbitCardStack } from "./orbit-card-stack";
import { overviewCard } from "./overview-card";
import { pagination } from "./pagination";
import { particleText } from "./particle-text";
import { pieChart } from "./pie-chart";
import { pixelCanvas } from "./pixel-canvas";
import { pixelImageTrail } from "./pixel-image-trail";
import { popover } from "./popover";
import { pricing01 } from "./pricing-01";
import { pricing02 } from "./pricing-02";
import { prismGradient } from "./prism-gradient";
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
import { revealText } from "./reveal-text";
import { ringChart } from "./ring-chart";
import { rippleTransition } from "./ripple-transition";
import { rollText } from "./roll-text";
import { rollingDigits } from "./rolling-digits";
import { sankeyChart } from "./sankey-chart";
import { scatterChart } from "./scatter-chart";
import { scoreCard } from "./score-card";
import { scrollArea } from "./scroll-area";
import { scrollChoreography } from "./scroll-choreography";
import { scrollProgress } from "./scroll-progress";
import { scrollReveal } from "./scroll-reveal";
import { scrollSplitCard } from "./scroll-split-card";
import { scrollTiltedGrid } from "./scroll-tilted-grid";
import { scrollVelocity } from "./scroll-velocity";
import { scrubField } from "./scrub-field";
import { select } from "./select";
import { separator } from "./separator";
import { sheet } from "./sheet";
import { shimmerText } from "./shimmer-text";
import { shortcut } from "./shortcut";
import { showMore } from "./show-more";
import { showcaseGrid } from "./showcase-grid";
import { sidebarNav } from "./sidebar-nav";
import { signature } from "./signature";
import { silkAurora } from "./silk-aurora";
import { skeleton } from "./skeleton";
import { slider } from "./slider";
import { spectralRibbon } from "./spectral-ribbon";
import { spinner } from "./spinner";
import { splitFlapDisplay } from "./split-flap-display";
import { splitText } from "./split-text";
import { staggeredLetter } from "./staggered-letter";
import { statCard, statCardMap } from "./stat-card";
import { statusMonitor } from "./status-monitor";
import { stickyScrollCards } from "./sticky-scroll-cards";
import { streamingText } from "./streaming-text";
import { sunburstChart } from "./sunburst-chart";
import { swapText } from "./swap-text";
import { switchComponent } from "./switch";
import { tableOfContents } from "./table-of-contents";
import { table } from "./table";
import { tabs } from "./tabs";
import { tagInput } from "./tag-input";
import { taskRows } from "./task-rows";
import { taskSteps } from "./task-steps";
import { textBorderAnimation } from "./text-border-animation";
import { textExplodeIMessage } from "./text-explode-imessage";
import { textFlip } from "./text-flip";
import { textInertia } from "./text-inertia";
import { textLoop } from "./text-loop";
import { textReel } from "./text-reel";
import { textRepel } from "./text-repel";
import { textTransition } from "./text-transition";
import { textarea } from "./textarea";
import { themeToggle } from "./theme-toggle";
import { thinkingState } from "./thinking-state";
import { ticker } from "./ticker";
import { toast } from "./toast";
import { toggleGroup } from "./toggle-group";
import { toggle } from "./toggle";
import { toolChips } from "./tool-chips";
import { tool } from "./tool";
import { tooltip } from "./tooltip";
import { typewriter } from "./typewriter";
import { typingText } from "./typing-text";
import { typography } from "./typography";
import { underlineHoverText } from "./underline-hover-text";
import { usageCard } from "./usage-card";
import { waveReveal } from "./wave-reveal";
import { webglLiquid } from "./webgl-liquid";
import { weekCalendar } from "./week-calendar";
import { wheelCarousel } from "./wheel-carousel";
import { wheelPicker } from "./wheel-picker";

export const specs: ComponentSpec[] = [
	accordion,
	agentScreen,
	alertDialog,
	alert,
	animatedGradientText,
	animatedGradient,
	areaChart,
	artGallery,
	asciiEffect,
	attachment,
	auroraFlow,
	avatar,
	badge,
	barChart,
	bentoGrid,
	boldCopy,
	breadcrumb,
	button,
	calendar,
	rangeCalendar,
	candlestickChart,
	card,
	caseStudyFlipStack,
	chartBrush,
	chartMarkers,
	chartSeries,
	chart,
	lineChart,
	chatComposer,
	checkbox,
	choroplethChart,
	circuitBoard,
	circularText,
	clickSpark,
	closingPlasma,
	codeBlock,
	collabCard,
	collapsible,
	collectionSurfer,
	colorPicker,
	combobox,
	command,
	composedChart,
	composer,
	contextCards,
	contextMenu,
	conversation,
	copyButton,
	counter,
	cubeText,
	cycleText,
	diaText,
	dialog,
	diffTable,
	ditherGradient,
	ditheredLogo,
	docsNav,
	doubleUnderline,
	draggableMarquee,
	drawer,
	dropdownMenu,
	emailKit,
	emailWelcome,
	eyeTracking,
	field,
	fileDiff,
	fileTree,
	fillButton,
	filterTable,
	fineTuneCard,
	fisheyeInfiniteGrid,
	flightStatusCard,
	flowchart,
	footer,
	form,
	fullscreenNav,
	funnelChart,
	gaugeChart,
	gauge,
	gibberishText,
	githubCalendar,
	glitchText,
	gradientHero01,
	grainGradient,
	heatmapChart,
	heroStage,
	hoverCard,
	hoverTransition,
	imageTrail,
	infiniteImageField,
	inputGroup,
	inputOtp,
	input,
	jitterText,
	jumpingText,
	label,
	layeredStack,
	liquidChrome,
	liveLineChart,
	loadingScreen,
	loadingState,
	logoCarousel,
	magnetLines,
	markdown,
	marker,
	maskText,
	megaNavbar,
	message,
	metisText,
	mirrorText,
	morphText,
	morphingModal,
	musicPlayer,
	nativeSelect,
	navbar,
	navigationMenu,
	notchedShelf,
	ogAuthorProfile,
	ogBlogPost,
	ogChangelog,
	ogDocsPage,
	ogGithubRepo,
	ogNewsletterIssue,
	orbitCardStack,
	overviewCard,
	pagination,
	particleText,
	pieChart,
	pixelCanvas,
	pixelImageTrail,
	popover,
	pricing01,
	pricing02,
	prismGradient,
	progress,
	projectionLine,
	question,
	radarChart,
	radioGroup,
	reasoning,
	recommendationCard,
	recordsTable,
	reorderList,
	responseStream,
	responsiveDialog,
	revealText,
	ringChart,
	rippleTransition,
	rollText,
	rollingDigits,
	sankeyChart,
	scatterChart,
	scoreCard,
	scrollArea,
	scrollChoreography,
	scrollProgress,
	scrollReveal,
	scrollSplitCard,
	scrollTiltedGrid,
	scrollVelocity,
	scrubField,
	select,
	separator,
	sheet,
	shimmerText,
	shortcut,
	showMore,
	showcaseGrid,
	sidebarNav,
	signature,
	silkAurora,
	skeleton,
	slider,
	spectralRibbon,
	spinner,
	splitFlapDisplay,
	splitText,
	staggeredLetter,
	statCard,
	statCardMap,
	statusMonitor,
	stickyScrollCards,
	streamingText,
	sunburstChart,
	swapText,
	switchComponent,
	tableOfContents,
	table,
	tabs,
	tagInput,
	taskRows,
	taskSteps,
	textBorderAnimation,
	textExplodeIMessage,
	textFlip,
	textInertia,
	textLoop,
	textReel,
	textRepel,
	textTransition,
	textarea,
	themeToggle,
	thinkingState,
	ticker,
	toast,
	toggleGroup,
	toggle,
	toolChips,
	tool,
	tooltip,
	typewriter,
	typingText,
	typography,
	underlineHoverText,
	usageCard,
	waveReveal,
	webglLiquid,
	weekCalendar,
	wheelCarousel,
	wheelPicker,
];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
