<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	type SpeechPlayerState,
	type SpeechPlayerVariant,
	speechPlayer,
} from "../variants";
import { setSpeechPlayer } from "./context";

/** A pure render of the read-aloud session: the app owns the audio and tells it where it is. */
let {
	state = "idle",
	variant = "card",
	at,
	count,
	rate = $bindable(1),
	onRateChange,
	class: classProp,
	children,
	...rest
}: {
	state?: SpeechPlayerState;
	variant?: SpeechPlayerVariant;
	/** The chunk being read, 1 to `count`; 0 before it starts. */
	at: number;
	count: number;
	/** Speaking speed; bindable. */
	rate?: number;
	onRateChange?: (rate: number) => void;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setSpeechPlayer({
	get state() {
		return state;
	},
	get variant() {
		return variant;
	},
	get at() {
		return at;
	},
	get count() {
		return count;
	},
	get rate() {
		return rate;
	},
	set rate(next) {
		rate = next;
		onRateChange?.(next);
	},
});

const root = $derived(speechPlayer({ variant, state }).root());
</script>

<div {...rest} data-slot="speech-player" data-state={state} class={cn(root, classProp)}>
	{@render children?.()}
</div>
