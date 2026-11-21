<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type RecordingPillState,
	type RecordingPillVariant,
	recordingPill,
} from "../variants";
import { setRecordingPill } from "./context";

/** A pure render of the session: the app owns capture, levels and the clock. */
let {
	state = "listening",
	variant = "inverted",
	level = 0,
	class: classProp,
	children,
	...rest
}: {
	state?: RecordingPillState;
	variant?: RecordingPillVariant;
	/** Loudness from 0 to 1; drives the meter while listening. */
	level?: number;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setRecordingPill({
	get state() {
		return state;
	},
	get variant() {
		return variant;
	},
	get level() {
		return level;
	},
});

const root = $derived(recordingPill({ variant, state }).root());
</script>

<div
	{...rest}
	data-slot="recording-pill"
	data-state={state}
	role="status"
	aria-live="polite"
	class={cn(root, classProp)}
>
	{@render children?.()}
</div>
