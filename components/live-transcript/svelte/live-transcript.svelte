<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type LiveTranscriptVariant, liveTranscript } from "../variants";
import { setLiveTranscript } from "./context";

/** Text that is still arriving: settled words in `committed`, the engine's guess in `tentative`. */
let {
	committed,
	tentative = "",
	session,
	variant = "card",
	class: classProp,
	children,
	...rest
}: {
	committed: string;
	tentative?: string;
	/** A new value starts a fresh transcript pinned to the newest line. */
	session?: string | number;
	variant?: LiveTranscriptVariant;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setLiveTranscript({
	get committed() {
		return committed;
	},
	get tentative() {
		return tentative;
	},
	get session() {
		return session;
	},
	get variant() {
		return variant;
	},
});

const root = $derived(liveTranscript({ variant }).root());
</script>

<div {...rest} data-slot="live-transcript" class={cn(root, classProp)}>
	{@render children?.()}
</div>
