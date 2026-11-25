<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ConversationVariant, conversation } from "../variants";
import { type ConversationContext, setConversation } from "./context";

let {
	children,
	threshold = 80,
	onFollowChange,
	variant = "framed",
	class: classProp,
	...rest
}: {
	children?: Snippet;
	/** Auto-follow stays engaged while the reader is within this many px of the bottom. */
	threshold?: number;
	/** Fires when the reader leaves the newest message (false) or returns to it (true). */
	onFollowChange?: (following: boolean) => void;
	/** `framed` is a muted card around the transcript and footer; `plain` has no surface. */
	variant?: ConversationVariant;
} & HTMLAttributes<HTMLDivElement> = $props();

let follow = $state(true);
let atBottom = $state(true);
let viewport = $state<HTMLDivElement | null>(null);
let scrollingToBottom = $state(false);

const context: ConversationContext = {
	get variant() {
		return variant;
	},
	get follow() {
		return follow;
	},
	set follow(value) {
		follow = value;
	},
	get atBottom() {
		return atBottom;
	},
	set atBottom(value) {
		atBottom = value;
	},
	get threshold() {
		return threshold;
	},
	get viewport() {
		return viewport;
	},
	set viewport(value) {
		viewport = value;
	},
	get scrollingToBottom() {
		return scrollingToBottom;
	},
	set scrollingToBottom(value) {
		scrollingToBottom = value;
	},
	scrollToBottom(behavior = "auto") {
		follow = true;
		scrollingToBottom = behavior === "smooth";
		if (!viewport) {
			scrollingToBottom = false;
			return;
		}
		viewport.scrollTo({ top: viewport.scrollHeight, behavior });
	},
};

setConversation(context);

let reported = true;
$effect(() => {
	if (follow === reported) return;
	reported = follow;
	onFollowChange?.(follow);
});
</script>

<!-- A scrollable transcript that follows new turns while the reader is already at the
bottom, and stops the moment they scroll up. -->
<div
	{...rest}
	data-slot="conversation"
	data-state={follow ? "following" : "paused"}
	data-variant={variant}
	class={cn(conversation({ variant }).root(), classProp)}
>
	{@render children?.()}
</div>
