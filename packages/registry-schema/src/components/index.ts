import type { ComponentSpec } from "../index";
import { accordion } from "./accordion";
import { alert } from "./alert";
import { alertDialog } from "./alert-dialog";
import { attachment } from "./attachment";
import { avatar } from "./avatar";
import { badge } from "./badge";
import { bentoGrid } from "./bento-grid";
import { breadcrumb } from "./breadcrumb";
import { button } from "./button";
import { card } from "./card";
import { checkbox } from "./checkbox";
import { codeBlock } from "./code-block";
import { collapsible } from "./collapsible";
import { colorPicker } from "./color-picker";
import { combobox } from "./combobox";
import { command } from "./command";
import { composer } from "./composer";
import { contextMenu } from "./context-menu";
import { conversation } from "./conversation";
import { copyButton } from "./copy-button";
import { dialog } from "./dialog";
import { dock } from "./dock";
import { dropdownMenu } from "./dropdown-menu";
import { fileDiff } from "./file-diff";
import { fileTree } from "./file-tree";
import { fullscreenNav } from "./fullscreen-nav";
import { gauge } from "./gauge";
import { hoverCard } from "./hover-card";
import { input } from "./input";
import { label } from "./label";
import { markdown } from "./markdown";
import { message } from "./message";
import { morphingModal } from "./morphing-modal";
import { navbar } from "./navbar";
import { pagination } from "./pagination";
import { popover } from "./popover";
import { progress } from "./progress";
import { question } from "./question";
import { radioGroup } from "./radio-group";
import { reasoning } from "./reasoning";
import { reorderList } from "./reorder-list";
import { responseStream } from "./response-stream";
import { scrollArea } from "./scroll-area";
import { select } from "./select";
import { sheet } from "./sheet";
import { shortcut } from "./shortcut";
import { showMore } from "./show-more";
import { skeleton } from "./skeleton";
import { slider } from "./slider";
import { spinner } from "./spinner";
import { switchComponent } from "./switch";
import { tabs } from "./tabs";
import { tagInput } from "./tag-input";
import { taskSteps } from "./task-steps";
import { textarea } from "./textarea";
import { toast } from "./toast";
import { toggle } from "./toggle";
import { toggleGroup } from "./toggle-group";
import { tool } from "./tool";
import { toolbar } from "./toolbar";
import { tooltip } from "./tooltip";
import { typography } from "./typography";

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
	skeleton,
	slider,
	switchComponent,
	tabs,
	textarea,
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
	toolbar,
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
	bentoGrid,
	fullscreenNav,
	fileTree,
	morphingModal,
	dialog,
	dock,
	message,
	responseStream,
	reasoning,
	taskSteps,
	attachment,
	composer,
	conversation,
	question,
	tool,
];

export function getSpec(slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug);
}
