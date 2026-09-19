<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { type DockSpring, setDock } from "./context";

type Props = {
	children: Snippet;
	class?: string;
	size?: number;
	magnification?: number;
	distance?: number;
	spring?: DockSpring;
	"aria-label"?: string;
};

let {
	children,
	class: classProp,
	size = 44,
	magnification = 72,
	distance = 140,
	spring = "gentle",
	"aria-label": ariaLabel = "Dock",
}: Props = $props();

let mouseX = $state(Number.POSITIVE_INFINITY);

setDock({
	get mouseX() {
		return mouseX;
	},
	get size() {
		return size;
	},
	get magnification() {
		return magnification;
	},
	get distance() {
		return distance;
	},
	get spring() {
		return spring;
	},
});
</script>

<div
	role="group"
	aria-label={ariaLabel}
	onpointermove={(e) => {
		if (e.pointerType === "mouse") mouseX = e.clientX;
	}}
	onpointerleave={() => (mouseX = Number.POSITIVE_INFINITY)}
	style:height="{magnification + 16}px"
	class={cn(
		"mx-auto flex w-max items-end gap-2 rounded-2xl border border-border bg-card/80 px-3 pb-2 shadow-2xl backdrop-blur-xl",
		classProp,
	)}
>
	{@render children()}
</div>
