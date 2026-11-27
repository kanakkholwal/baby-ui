<script lang="ts">
import { untrack } from "svelte";
import { countDuration, tweenCount } from "../count";

let {
	value,
	delay = 0,
	format,
}: {
	/** The whole number to count to. */
	value: number;
	/** How long to wait before counting, in ms. */
	delay?: number;
	format: (value: number) => string;
} = $props();

let el = $state<HTMLSpanElement>();
let shown = $state(untrack(() => value));
let current = untrack(() => value);

// The target value and delay restart the count from wherever it has got to.
$effect(() => {
	const target = value;
	const wait = delay;
	if (!el) return;
	return tweenCount(current, target, {
		delay: wait,
		duration: countDuration(el),
		onUpdate: (next) => {
			current = next;
			shown = next;
		},
	});
});
</script>

<span bind:this={el} class="tabular-nums">{format(shown)}</span>
