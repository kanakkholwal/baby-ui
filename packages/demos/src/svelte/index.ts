import type { Component } from "svelte";
import BentoGridDemo from "./bento-grid-demo.svelte";
import ButtonDemo from "./button-demo.svelte";
import DockDemo from "./dock-demo.svelte";
import FileTreeDemo from "./file-tree-demo.svelte";
import MorphingModalDemo from "./morphing-modal-demo.svelte";
import NavbarDemo from "./navbar-demo.svelte";

export type DemoComponent = Component<{ props?: Record<string, unknown> }>;

/** A spec without a demo here renders the Code tab only, rather than an empty frame. */
export const demos: Record<string, DemoComponent> = {
	button: ButtonDemo as DemoComponent,
	navbar: NavbarDemo as DemoComponent,
	"bento-grid": BentoGridDemo as DemoComponent,
	"file-tree": FileTreeDemo as DemoComponent,
	"morphing-modal": MorphingModalDemo as DemoComponent,
	dock: DockDemo as DemoComponent,
};
