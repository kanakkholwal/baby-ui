import type { ComponentSpec } from "../index.ts";
import { accordion } from "./accordion.ts";
import { agentScreen } from "./agent-screen.ts";
import { alertDialog } from "./alert-dialog.ts";
import { alert } from "./alert.ts";
import { animatedGradientText } from "./animated-gradient-text.ts";
import { animatedGradient } from "./animated-gradient.ts";
import { areaChart } from "./area-chart.ts";
import { artGallery } from "./art-gallery.ts";
import { asciiEffect } from "./ascii-effect.ts";
import { attachment } from "./attachment.ts";
import { auroraFlow } from "./aurora-flow.ts";
import { avatar } from "./avatar.ts";
import { badge } from "./badge.ts";
import { barChart } from "./bar-chart.ts";
import { bentoGrid } from "./bento-grid.ts";
import { boldCopy } from "./bold-copy.ts";
import { breadcrumb } from "./breadcrumb.ts";
import { button } from "./button.ts";
import { calendar, rangeCalendar } from "./calendar.ts";
import { candlestickChart } from "./candlestick-chart.ts";
import { card } from "./card.ts";
import { caseStudyFlipStack } from "./case-study-flip-stack.ts";
import { chartBrush } from "./chart-brush.ts";
import { chartMarkers } from "./chart-markers.ts";
import { chartSeries } from "./chart-series.ts";
import { chart, lineChart } from "./chart.ts";
import { chatComposer } from "./chat-composer.ts";
import { checkbox } from "./checkbox.ts";
import { choroplethChart } from "./choropleth-chart.ts";
import { chromaticWave } from "./chromatic-wave.ts";
import { circuitBoard } from "./circuit-board.ts";
import { circularText } from "./circular-text.ts";
import { clickSpark } from "./click-spark.ts";
import { closingPlasma } from "./closing-plasma.ts";
import { codeBlock } from "./code-block.ts";
import { collabCard } from "./collab-card.ts";
import { collapsible } from "./collapsible.ts";
import { collectionSurfer } from "./collection-surfer.ts";
import { colorField } from "./color-field.ts";
import { colorPicker } from "./color-picker.ts";
import { combobox } from "./combobox.ts";
import { command } from "./command.ts";
import { composedChart } from "./composed-chart.ts";
import { composer } from "./composer.ts";
import { contextCards } from "./context-cards.ts";
import { contextMenu } from "./context-menu.ts";
import { conversation } from "./conversation.ts";
import { copyButton } from "./copy-button.ts";
import { counter } from "./counter.ts";
import { creditCardInput } from "./credit-card-input.ts";
import { cubeText } from "./cube-text.ts";
import { currencyInput } from "./currency-input.ts";
import { cycleText } from "./cycle-text.ts";
import { dateField, datePicker, dateRangePicker, timePicker } from "./date-picker.ts";
import { diaText } from "./dia-text.ts";
import { dialog } from "./dialog.ts";
import { diffTable } from "./diff-table.ts";
import { ditherGradient } from "./dither-gradient.ts";
import { ditheredLogo } from "./dithered-logo.ts";
import { docsNav } from "./docs-nav.ts";
import { dotMatrixGlow } from "./dot-matrix-glow.ts";
import { doubleUnderline } from "./double-underline.ts";
import { draggableMarquee } from "./draggable-marquee.ts";
import { drawer } from "./drawer.ts";
import { dropdownMenu } from "./dropdown-menu.ts";
import { emailKit } from "./email-kit.ts";
import { emailMagicLink } from "./email-magic-link.ts";
import { emailPasswordReset } from "./email-password-reset.ts";
import { emailReceipt } from "./email-receipt.ts";
import { emailTeamInvite } from "./email-team-invite.ts";
import { emailVerify } from "./email-verify.ts";
import { emailWelcome } from "./email-welcome.ts";
import { eyeTracking } from "./eye-tracking.ts";
import { field } from "./field.ts";
import { fileDiff } from "./file-diff.ts";
import { fileTree } from "./file-tree.ts";
import { fileUpload } from "./file-upload.ts";
import { fillButton } from "./fill-button.ts";
import { filterTable } from "./filter-table.ts";
import { fineTuneCard } from "./fine-tune-card.ts";
import { fisheyeInfiniteGrid } from "./fisheye-infinite-grid.ts";
import { flightStatusCard } from "./flight-status-card.ts";
import { flowchart } from "./flowchart.ts";
import { footer } from "./footer.ts";
import { form } from "./form.ts";
import { fullscreenNav } from "./fullscreen-nav.ts";
import { funnelChart } from "./funnel-chart.ts";
import { gaugeChart } from "./gauge-chart.ts";
import { gauge } from "./gauge.ts";
import { gibberishText } from "./gibberish-text.ts";
import { githubCalendar } from "./github-calendar.ts";
import { glitchText } from "./glitch-text.ts";
import { gradientHero01 } from "./gradient-hero-01.ts";
import { grainGradient } from "./grain-gradient.ts";
import { heatmapChart } from "./heatmap-chart.ts";
import { heroStage } from "./hero-stage.ts";
import { hoverCard } from "./hover-card.ts";
import { hoverTransition } from "./hover-transition.ts";
import { imageTrail } from "./image-trail.ts";
import { infiniteImageField } from "./infinite-image-field.ts";
import { inputGroup } from "./input-group.ts";
import { inputOtp } from "./input-otp.ts";
import { input } from "./input.ts";
import { iridescentFold } from "./iridescent-fold.ts";
import { jitterText } from "./jitter-text.ts";
import { jumpingText } from "./jumping-text.ts";
import { label } from "./label.ts";
import { layeredStack } from "./layered-stack.ts";
import { lightCaustics } from "./light-caustics.ts";
import { liquidChrome } from "./liquid-chrome.ts";
import { liveLineChart } from "./live-line-chart.ts";
import { loadingScreen } from "./loading-screen.ts";
import { loadingState } from "./loading-state.ts";
import { logoCarousel } from "./logo-carousel.ts";
import { magnetLines } from "./magnet-lines.ts";
import { markdown } from "./markdown.ts";
import { marker } from "./marker.ts";
import { maskText } from "./mask-text.ts";
import { megaNavbar } from "./mega-navbar.ts";
import { message } from "./message.ts";
import { metisText } from "./metis-text.ts";
import { mirrorText } from "./mirror-text.ts";
import { morphText } from "./morph-text.ts";
import { morphingModal } from "./morphing-modal.ts";
import { multiSelect } from "./multi-select.ts";
import { musicPlayer } from "./music-player.ts";
import { nativeSelect } from "./native-select.ts";
import { navigationMenu } from "./navigation-menu.ts";
import { notchedShelf } from "./notched-shelf.ts";
import { numberInput } from "./number-input.ts";
import { ogAuthorProfile } from "./og-author-profile.ts";
import { ogBlogPost } from "./og-blog-post.ts";
import { ogChangelog } from "./og-changelog.ts";
import { ogDocsPage } from "./og-docs-page.ts";
import { ogGithubRepo } from "./og-github-repo.ts";
import { ogNewsletterIssue } from "./og-newsletter-issue.ts";
import { orbitCardStack } from "./orbit-card-stack.ts";
import { overviewCard } from "./overview-card.ts";
import { pagination } from "./pagination.ts";
import { particleText } from "./particle-text.ts";
import { passwordInput } from "./password-input.ts";
import { phoneInput } from "./phone-input.ts";
import { pieChart } from "./pie-chart.ts";
import { pixelCanvas } from "./pixel-canvas.ts";
import { pixelImageTrail } from "./pixel-image-trail.ts";
import { popover } from "./popover.ts";
import { pricing01 } from "./pricing-01.ts";
import { pricing02 } from "./pricing-02.ts";
import { progress } from "./progress.ts";
import { projectionLine } from "./projection-line.ts";
import { question } from "./question.ts";
import { radarChart } from "./radar-chart.ts";
import { radioGroup } from "./radio-group.ts";
import { reasoning } from "./reasoning.ts";
import { recommendationCard } from "./recommendation-card.ts";
import { recordsTable } from "./records-table.ts";
import { reorderList } from "./reorder-list.ts";
import { responseStream } from "./response-stream.ts";
import { responsiveDialog } from "./responsive-dialog.ts";
import { revealText } from "./reveal-text.ts";
import { ringChart } from "./ring-chart.ts";
import { rippleTransition } from "./ripple-transition.ts";
import { rollText } from "./roll-text.ts";
import { rollingDigits } from "./rolling-digits.ts";
import { sankeyChart } from "./sankey-chart.ts";
import { scatterChart } from "./scatter-chart.ts";
import { scoreCard } from "./score-card.ts";
import { scrollArea } from "./scroll-area.ts";
import { scrollChoreography } from "./scroll-choreography.ts";
import { scrollProgress } from "./scroll-progress.ts";
import { scrollReveal } from "./scroll-reveal.ts";
import { scrollSplitCard } from "./scroll-split-card.ts";
import { scrollTiltedGrid } from "./scroll-tilted-grid.ts";
import { scrollVelocity } from "./scroll-velocity.ts";
import { scrubField } from "./scrub-field.ts";
import { searchInput } from "./search-input.ts";
import { select } from "./select.ts";
import { separator } from "./separator.ts";
import { sheet } from "./sheet.ts";
import { shimmerText } from "./shimmer-text.ts";
import { shortcut } from "./shortcut.ts";
import { showMore } from "./show-more.ts";
import { showcaseGrid } from "./showcase-grid.ts";
import { sidebarNav } from "./sidebar-nav.ts";
import { signature } from "./signature.ts";
import { silkAurora } from "./silk-aurora.ts";
import { skeleton } from "./skeleton.ts";
import { slider } from "./slider.ts";
import { spectralRibbon } from "./spectral-ribbon.ts";
import { spinner } from "./spinner.ts";
import { splitFlapDisplay } from "./split-flap-display.ts";
import { splitText } from "./split-text.ts";
import { staggeredLetter } from "./staggered-letter.ts";
import { statCard, statCardMap } from "./stat-card.ts";
import { statusMonitor } from "./status-monitor.ts";
import { stickyScrollCards } from "./sticky-scroll-cards.ts";
import { streamingText } from "./streaming-text.ts";
import { sunburstChart } from "./sunburst-chart.ts";
import { swapText } from "./swap-text.ts";
import { switchComponent } from "./switch.ts";
import { tableOfContents } from "./table-of-contents.ts";
import { table } from "./table.ts";
import { tabs } from "./tabs.ts";
import { tagInput } from "./tag-input.ts";
import { taskRows } from "./task-rows.ts";
import { taskSteps } from "./task-steps.ts";
import { textBorderAnimation } from "./text-border-animation.ts";
import { textExplodeIMessage } from "./text-explode-imessage.ts";
import { textFlip } from "./text-flip.ts";
import { textInertia } from "./text-inertia.ts";
import { textLoop } from "./text-loop.ts";
import { textReel } from "./text-reel.ts";
import { textRepel } from "./text-repel.ts";
import { textTransition } from "./text-transition.ts";
import { textarea } from "./textarea.ts";
import { themeToggle } from "./theme-toggle.ts";
import { thinkingState } from "./thinking-state.ts";
import { ticker } from "./ticker.ts";
import { toast } from "./toast.ts";
import { toggleGroup } from "./toggle-group.ts";
import { toggle } from "./toggle.ts";
import { toolChips } from "./tool-chips.ts";
import { tool } from "./tool.ts";
import { tooltip } from "./tooltip.ts";
import { typewriter } from "./typewriter.ts";
import { typingText } from "./typing-text.ts";
import { typography } from "./typography.ts";
import { underlineHoverText } from "./underline-hover-text.ts";
import { usageCard } from "./usage-card.ts";
import { waveReveal } from "./wave-reveal.ts";
import { webglLiquid } from "./webgl-liquid.ts";
import { weekCalendar } from "./week-calendar.ts";
import { wheelCarousel } from "./wheel-carousel.ts";
import { wheelPicker } from "./wheel-picker.ts";

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
	chromaticWave,
	circuitBoard,
	circularText,
	clickSpark,
	closingPlasma,
	codeBlock,
	collabCard,
	collapsible,
	collectionSurfer,
	colorField,
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
	creditCardInput,
	cubeText,
	currencyInput,
	cycleText,
	dateField,
	datePicker,
	dateRangePicker,
	timePicker,
	diaText,
	dialog,
	diffTable,
	ditherGradient,
	ditheredLogo,
	docsNav,
	dotMatrixGlow,
	doubleUnderline,
	draggableMarquee,
	drawer,
	dropdownMenu,
	emailKit,
	emailMagicLink,
	emailPasswordReset,
	emailReceipt,
	emailTeamInvite,
	emailVerify,
	emailWelcome,
	eyeTracking,
	field,
	fileDiff,
	fileTree,
	fileUpload,
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
	iridescentFold,
	jitterText,
	jumpingText,
	label,
	layeredStack,
	lightCaustics,
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
	multiSelect,
	musicPlayer,
	nativeSelect,
	navigationMenu,
	notchedShelf,
	numberInput,
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
	passwordInput,
	phoneInput,
	pieChart,
	pixelCanvas,
	pixelImageTrail,
	popover,
	pricing01,
	pricing02,
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
	searchInput,
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
