import type { Component } from "svelte";
import AccordionDemo from "./accordion-demo.svelte";
import AlertDemo from "./alert-demo.svelte";
import AvatarDemo from "./avatar-demo.svelte";
import BadgeDemo from "./badge-demo.svelte";
import BentoGridDemo from "./bento-grid-demo.svelte";
import ButtonDemo from "./button-demo.svelte";
import CardDemo from "./card-demo.svelte";
import CheckboxDemo from "./checkbox-demo.svelte";
import DockDemo from "./dock-demo.svelte";
import FileTreeDemo from "./file-tree-demo.svelte";
import InputDemo from "./input-demo.svelte";
import LabelDemo from "./label-demo.svelte";
import MorphingModalDemo from "./morphing-modal-demo.svelte";
import NavbarDemo from "./navbar-demo.svelte";
import ProgressDemo from "./progress-demo.svelte";
import SkeletonDemo from "./skeleton-demo.svelte";
import SwitchDemo from "./switch-demo.svelte";
import TextareaDemo from "./textarea-demo.svelte";

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
};
