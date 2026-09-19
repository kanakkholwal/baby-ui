import type { Component } from "svelte";
import ButtonDemo from "./button-demo.svelte";
import DockDemo from "./dock-demo.svelte";

export type DemoComponent = Component<{ props?: Record<string, unknown> }>;

/** A spec without a demo here renders the Code tab only, rather than an empty frame. */
export const demos: Record<string, DemoComponent> = {
	button: ButtonDemo as DemoComponent,
	dock: DockDemo as DemoComponent,
};
