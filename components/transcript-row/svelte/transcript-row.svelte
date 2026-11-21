<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type TranscriptRowStatus,
	type TranscriptRowVariant,
	transcriptRow,
} from "../variants";
import { setTranscriptRow } from "./context";

/** A saved transcript. Give it a `status` for a file job; leave it off for a history entry. */
let {
	status,
	variant = "card",
	clamp = false,
	class: classProp,
	children,
	...rest
}: {
	status?: TranscriptRowStatus;
	variant?: TranscriptRowVariant;
	/** Limits the text to three lines. */
	clamp?: boolean;
	class?: string;
	children?: Snippet;
} & Omit<HTMLLiAttributes, "class" | "children"> = $props();

setTranscriptRow({
	get status() {
		return status;
	},
	get variant() {
		return variant;
	},
	get clamp() {
		return clamp;
	},
});

const root = $derived(transcriptRow({ variant, status }).root());
</script>

<li {...rest} data-slot="transcript-row" data-status={status} class={cn(root, classProp)}>
	{@render children?.()}
</li>
