<script lang="ts">
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import RollingDigits from "../../rolling-digits/svelte/rolling-digits.svelte";
import { type UpvoteOrientation, type UpvoteVariant, upvoteButton } from "../variants";

const OUTLINE = "M9 18v-6H5l7-7 7 7h-4v6H9z";

let {
	voted = $bindable(false),
	onVotedChange,
	count,
	orientation = "vertical",
	variant = "default",
	label = "Upvote",
	class: classProp,
	onclick,
	...rest
}: Omit<HTMLButtonAttributes, "children"> & {
	/** Whether the viewer has voted; bindable. */
	voted?: boolean;
	/** Called with the next state when the viewer votes or takes the vote back. */
	onVotedChange?: (voted: boolean) => void;
	/** Votes from everyone else. The viewer's own vote is added on top. */
	count: number;
	/** `vertical` stacks the arrow over the count; `horizontal` places them side by side. */
	orientation?: UpvoteOrientation;
	/** The fill colour. For any other, set `--upvote-color` and `--upvote-on` on `class`, which goes on the wrapper. */
	variant?: UpvoteVariant;
	/** Names the button for assistive tech. */
	label?: string;
} = $props();

// Each vote remounts the +1 so it floats again; taking a vote back removes it.
let votes = $state(0);
const styles = $derived(upvoteButton({ orientation, variant, voted }));
</script>

<!-- A vote that rises through the button: the fill climbs, the arrow swaps, a +1 floats and the count rolls. -->
<span data-slot="upvote-button" class={cn(styles.root(), classProp)}>
	{#if voted && votes > 0}
		{#key votes}
			<span aria-hidden="true" class={styles.float()} style="translate: -50% 0">+1</span>
		{/key}
	{/if}
	<button
		type="button"
		aria-pressed={voted}
		aria-label={label}
		class={styles.button()}
		onclick={(event) => {
			onclick?.(event);
			if (event.defaultPrevented) return;
			if (!voted) votes += 1;
			voted = !voted;
			onVotedChange?.(voted);
		}}
		{...rest}
	>
		<span aria-hidden="true" class={styles.fill()}></span>
		<span aria-hidden="true" class={styles.arrows()}>
			<span class={cn(styles.arrow(), voted ? "-translate-y-[110%]" : "translate-y-0")}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d={OUTLINE} /></svg>
			</span>
			<span class={cn(styles.arrow(), voted ? "translate-y-0" : "translate-y-[110%]")}>
				<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d={OUTLINE} /></svg>
			</span>
		</span>
		<RollingDigits value={count + (voted ? 1 : 0)} startOnView={false} />
	</button>
</span>
