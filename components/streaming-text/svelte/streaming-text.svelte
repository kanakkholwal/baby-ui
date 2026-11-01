<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type StreamingSource,
	type StreamingTextLayout,
	type StreamingTextSize,
	streamingText,
} from "../variants";
import { setStreamingText } from "./context";

let {
	layout = "inline",
	size = "default",
	sources = [],
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	layout?: StreamingTextLayout;
	size?: StreamingTextSize;
	/** Cited sources: inline chips in the answer and the StreamingTextSources list. */
	sources?: StreamingSource[];
} = $props();

let done = $state(false);
let text = $state("");
const styles = $derived(streamingText({ layout, size }));
setStreamingText({
	get done() {
		return done;
	},
	set done(next) {
		done = next;
	},
	get text() {
		return text;
	},
	set text(next) {
		text = next;
	},
	get sources() {
		return sources;
	},
	get size() {
		return size;
	},
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: an answer that reveals once, then shows what follows it. -->
<div data-slot="streaming-text" data-streaming={!done || undefined} class={cn(styles.root(), classProp)} {...rest}>
	{@render children?.()}
</div>
