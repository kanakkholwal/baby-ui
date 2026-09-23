<script lang="ts">
import { cn } from "../lib/cn";
import { type TextBorderAnimationSize, textBorderAnimation } from "./variants";

let {
	text,
	size = "lg",
	durationMs = 300,
	class: classProp,
}: {
	text: string;
	size?: TextBorderAnimationSize;
	/** How long the bar takes to sweep in and out, in ms. */
	durationMs?: number;
	class?: string;
} = $props();

let hoveredIn = $state(false);
let hoveredOut = $state(false);
let timer: ReturnType<typeof setTimeout> | undefined;

const classes = $derived(textBorderAnimation({ size }));

function onEnter() {
	hoveredIn = true;
}

function onLeave() {
	hoveredIn = false;
	hoveredOut = true;
	clearTimeout(timer);
	timer = setTimeout(() => {
		hoveredOut = false;
	}, durationMs);
}
</script>

<div
	data-slot="text-border-animation"
	role="presentation"
	onmouseenter={onEnter}
	onmouseleave={onLeave}
	class={cn(classes.root(), classProp)}
	style="--tba-duration: {durationMs}ms;"
>
	<span class={classes.label()}>{text}</span>
	<div class={classes.track()}>
		<div
			class={cn(classes.bar(), hoveredIn ? "translate-x-0" : "-translate-x-full")}
			style:opacity={hoveredIn ? 1 : 0}
		></div>
		<div
			class={cn(classes.bar(), hoveredOut ? "translate-x-full" : "translate-x-0")}
			style:opacity={hoveredOut ? 1 : 0}
		></div>
	</div>
</div>
