<script lang="ts">
import { cn } from "../lib/cn";
import { type CounterDirection, type CounterSize, counter } from "./variants";

let {
	value,
	format = defaultFormat,
	direction = "up",
	durationMs = 1200,
	delayMs = 0,
	triggerOnView = true,
	size = "md",
	class: classProp,
}: {
	/** The number to count toward. Re-animates whenever this changes. */
	value: number;
	/** Formats the displayed number. Defaults to locale-grouped integers. */
	format?: (value: number) => string;
	/** Which way the count runs on its first play: from 0, or down from `value`. */
	direction?: CounterDirection;
	/** How long the count takes, in ms. */
	durationMs?: number;
	/** Delay before the count starts, in ms. */
	delayMs?: number;
	/** Wait until the counter scrolls into view before the first count. */
	triggerOnView?: boolean;
	size?: CounterSize;
	class?: string;
} = $props();

function defaultFormat(v: number) {
	return Intl.NumberFormat("en-US").format(Math.round(v));
}

function easeOutCubic(t: number) {
	return 1 - (1 - t) ** 3;
}

let el = $state<HTMLSpanElement>();
// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useRef(initialValue)
let from = direction === "up" ? 0 : value;
// svelte-ignore state_referenced_locally -- intentional one-time seed, matching React's useRef(initialValue)
let inView = !triggerOnView;

$effect(() => {
	const node = el;
	if (!node) return;

	let raf = 0;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	function run() {
		if (!node) return;
		if (reduced) {
			node.textContent = format(value);
			from = value;
			return;
		}
		const startFrom = from;
		const to = value;
		const start = performance.now();
		function tick(now: number) {
			if (!node) return;
			const t = Math.min(1, (now - start) / durationMs);
			node.textContent = format(startFrom + (to - startFrom) * easeOutCubic(t));
			if (t < 1) {
				raf = requestAnimationFrame(tick);
			} else {
				from = to;
			}
		}
		raf = requestAnimationFrame(tick);
	}

	function schedule() {
		if (delayMs > 0) timeout = setTimeout(run, delayMs);
		else run();
	}

	if (inView) {
		schedule();
		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(timeout);
		};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			if (!entries[0]?.isIntersecting) return;
			inView = true;
			schedule();
			observer.disconnect();
		},
		{ rootMargin: "0px" },
	);
	observer.observe(node);
	return () => {
		observer.disconnect();
		cancelAnimationFrame(raf);
		clearTimeout(timeout);
	};
});
</script>

<span bind:this={el} data-slot="counter" class={cn(counter({ size }), classProp)}>
	{format(direction === "up" ? 0 : value)}
</span>
