<script lang="ts">
import { cn } from "../../lib/cn";
import {
	fillLabel,
	POLL_VOTE_LABELS,
	type PollOption,
	type PollVoteLabels,
	type PollVoteSize,
	pollShare,
	pollVote,
} from "../variants";
import Count from "./poll-vote-count.svelte";

// After a first vote your bar fills first and the rest follow a beat apart.
const STAGGER_MS = 60;

let {
	options,
	value = $bindable(null),
	onValueChange,
	size = "default",
	labels,
	class: classProp,
}: {
	/** The choices, each with an id, label and vote count before the viewer's vote. */
	options: readonly PollOption[];
	/** The viewer's choice, or null before they vote; bindable. */
	value?: string | null;
	/** Called with the option id when the viewer votes or changes their vote. */
	onValueChange?: (value: string | null) => void;
	size?: PollVoteSize;
	/** Override any built-in string, for example to translate it. */
	labels?: Partial<PollVoteLabels>;
	class?: string;
} = $props();

const text = $derived({ ...POLL_VOTE_LABELS, ...labels });
const voted = $derived(value !== null);
// A first vote fills in a wave; moving a vote shifts every bar together.
let from = $state<string | null>(null);
let last: string | null = null;
$effect.pre(() => {
	if (last !== value) {
		from = last;
		last = value;
	}
});
const moved = $derived(from !== null && voted);
const total = $derived(
	options.reduce((sum, option) => sum + option.votes, 0) + (voted ? 1 : 0),
);
const chosen = $derived(options.find((option) => option.id === value));
const chosenIndex = $derived(options.findIndex((option) => option.id === value));
</script>

<!-- A poll you answer with one tap: your ring fills, bars fill in a wave and the shares count up. -->
<div role="radiogroup" aria-label={text.poll} data-slot="poll-vote" class={cn(pollVote().root(), classProp)}>
	{#each options as option, index (option.id)}
		{@const mine = option.id === value}
		{@const percent = voted ? pollShare(options, value, option.id) : 0}
		{@const styles = pollVote({ size, voted, mine })}
		{@const order = mine ? 0 : index < chosenIndex ? index + 1 : index}
		{@const delay = moved || !voted ? 0 : order * STAGGER_MS}
		<button
			type="button"
			role="radio"
			aria-checked={mine}
			aria-label={voted ? fillLabel(text.percent, { label: option.label, percent: Math.round(percent) }) : option.label}
			class={styles.row()}
			onclick={() => {
				if (mine) return;
				value = option.id;
				onValueChange?.(option.id);
			}}
		>
			<span aria-hidden="true" class={styles.bar()} style:transform={`scaleX(${percent / 100})`} style:transition-delay={`${delay}ms`}></span>
			<span class={styles.label()}>
				<span aria-hidden="true" class={styles.mark()}>
					<span class={styles.markFill()}></span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class={styles.check()}>
						<path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />
					</svg>
				</span>
				<span class={styles.text()}>{option.label}</span>
			</span>
			<span aria-hidden="true" class={styles.percent()} style:transition-delay={`${delay}ms`}>
				<Count value={Math.round(percent)} {delay} format={(n) => `${n}%`} />
			</span>
		</button>
	{/each}
	<span class={pollVote().total()}>
		<Count value={total} format={(count) => fillLabel(text.votes, { count })} />
	</span>
	<span aria-live="polite" class="sr-only">{chosen ? fillLabel(text.voted, { label: chosen.label }) : ""}</span>
</div>
