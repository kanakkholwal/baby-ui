import type { Component } from "svelte";
import AccordionDemo from "./accordion-demo.svelte";
import AlertDemo from "./alert-demo.svelte";
import AlertDialogDemo from "./alert-dialog-demo.svelte";
import AttachmentDemo from "./attachment-demo.svelte";
import AvatarDemo from "./avatar-demo.svelte";
import BadgeDemo from "./badge-demo.svelte";
import BentoGridDemo from "./bento-grid-demo.svelte";
import BreadcrumbDemo from "./breadcrumb-demo.svelte";
import ButtonDemo from "./button-demo.svelte";
import CardDemo from "./card-demo.svelte";
import CheckboxDemo from "./checkbox-demo.svelte";
import CodeBlockDemo from "./code-block-demo.svelte";
import CollapsibleDemo from "./collapsible-demo.svelte";
import ColorPickerDemo from "./color-picker-demo.svelte";
import ComboboxDemo from "./combobox-demo.svelte";
import CommandDemo from "./command-demo.svelte";
import ComposerDemo from "./composer-demo.svelte";
import ContextMenuDemo from "./context-menu-demo.svelte";
import ConversationDemo from "./conversation-demo.svelte";
import CopyButtonDemo from "./copy-button-demo.svelte";
import DialogDemo from "./dialog-demo.svelte";
import DockDemo from "./dock-demo.svelte";
import DropdownMenuDemo from "./dropdown-menu-demo.svelte";
import FileDiffDemo from "./file-diff-demo.svelte";
import FileTreeDemo from "./file-tree-demo.svelte";
import FullscreenNavDemo from "./fullscreen-nav-demo.svelte";
import GaugeDemo from "./gauge-demo.svelte";
import HoverCardDemo from "./hover-card-demo.svelte";
import InputDemo from "./input-demo.svelte";
import LabelDemo from "./label-demo.svelte";
import MarkdownDemo from "./markdown-demo.svelte";
import MessageDemo from "./message-demo.svelte";
import MorphingModalDemo from "./morphing-modal-demo.svelte";
import NavbarDemo from "./navbar-demo.svelte";
import PaginationDemo from "./pagination-demo.svelte";
import PopoverDemo from "./popover-demo.svelte";
import ProgressDemo from "./progress-demo.svelte";
import QuestionDemo from "./question-demo.svelte";
import RadioGroupDemo from "./radio-group-demo.svelte";
import ReasoningDemo from "./reasoning-demo.svelte";
import ReorderListDemo from "./reorder-list-demo.svelte";
import ResponseStreamDemo from "./response-stream-demo.svelte";
import ScrollAreaDemo from "./scroll-area-demo.svelte";
import SelectDemo from "./select-demo.svelte";
import SheetDemo from "./sheet-demo.svelte";
import ShortcutDemo from "./shortcut-demo.svelte";
import ShowMoreDemo from "./show-more-demo.svelte";
import SkeletonDemo from "./skeleton-demo.svelte";
import SliderDemo from "./slider-demo.svelte";
import SpinnerDemo from "./spinner-demo.svelte";
import SwitchDemo from "./switch-demo.svelte";
import TabsDemo from "./tabs-demo.svelte";
import TagInputDemo from "./tag-input-demo.svelte";
import TaskStepsDemo from "./task-steps-demo.svelte";
import TextareaDemo from "./textarea-demo.svelte";
import ToastDemo from "./toast-demo.svelte";
import ToggleDemo from "./toggle-demo.svelte";
import ToggleGroupDemo from "./toggle-group-demo.svelte";
import ToolDemo from "./tool-demo.svelte";
import ToolbarDemo from "./toolbar-demo.svelte";
import TooltipDemo from "./tooltip-demo.svelte";
import TypographyDemo from "./typography-demo.svelte";

export type DemoComponent = Component<{ props?: Record<string, unknown> }>;

const as = (c: unknown) => c as DemoComponent;

/** A spec without a demo here renders the Code tab only, rather than an empty frame. */
export const demos: Record<string, DemoComponent> = {
	accordion: as(AccordionDemo),
	alert: as(AlertDemo),
	avatar: as(AvatarDemo),
	badge: as(BadgeDemo),
	button: as(ButtonDemo),
	card: as(CardDemo),
	checkbox: as(CheckboxDemo),
	input: as(InputDemo),
	label: as(LabelDemo),
	progress: as(ProgressDemo),
	skeleton: as(SkeletonDemo),
	switch: as(SwitchDemo),
	textarea: as(TextareaDemo),
	navbar: as(NavbarDemo),
	"bento-grid": as(BentoGridDemo),
	"file-tree": as(FileTreeDemo),
	"morphing-modal": as(MorphingModalDemo),
	dock: as(DockDemo),
	"copy-button": as(CopyButtonDemo),
	"code-block": as(CodeBlockDemo),
	markdown: as(MarkdownDemo),
	"file-diff": as(FileDiffDemo),
	"tag-input": as(TagInputDemo),
	"color-picker": as(ColorPickerDemo),
	"reorder-list": as(ReorderListDemo),
	attachment: as(AttachmentDemo),
	composer: as(ComposerDemo),
	conversation: as(ConversationDemo),
	tool: as(ToolDemo),
	question: as(QuestionDemo),
	spinner: as(SpinnerDemo),
	toggle: as(ToggleDemo),
	"toggle-group": as(ToggleGroupDemo),
	collapsible: as(CollapsibleDemo),
	"show-more": as(ShowMoreDemo),
	shortcut: as(ShortcutDemo),
	typography: as(TypographyDemo),
	gauge: as(GaugeDemo),
	pagination: as(PaginationDemo),
	"scroll-area": as(ScrollAreaDemo),
	dialog: as(DialogDemo),
	"alert-dialog": as(AlertDialogDemo),
	sheet: as(SheetDemo),
	toast: as(ToastDemo),
	command: as(CommandDemo),
	toolbar: as(ToolbarDemo),
	"fullscreen-nav": as(FullscreenNavDemo),
	popover: as(PopoverDemo),
	tooltip: as(TooltipDemo),
	"dropdown-menu": as(DropdownMenuDemo),
	"context-menu": as(ContextMenuDemo),
	"hover-card": as(HoverCardDemo),
	select: as(SelectDemo),
	combobox: as(ComboboxDemo),
	breadcrumb: as(BreadcrumbDemo),
	"radio-group": as(RadioGroupDemo),
	slider: as(SliderDemo),
	tabs: as(TabsDemo),
	message: as(MessageDemo),
	"response-stream": as(ResponseStreamDemo),
	reasoning: as(ReasoningDemo),
	"task-steps": as(TaskStepsDemo),
};
