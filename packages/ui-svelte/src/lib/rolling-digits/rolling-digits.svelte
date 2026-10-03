<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import {
	formatRollingDigits,
	type RollingDigitCell,
	type RollingDigitsLocale,
	rollingDigitCells,
} from "./format";
import RollingDigit from "./rolling-digit.svelte";
import {
	type RollingDigitsDirection,
	type RollingDigitsSize,
	type RollingDigitsVariant,
	rollingDigits,
} from "./variants";

let {
	value,
	pad,
	locale,
	format,
	variant = "roll",
	durationMs,
	startOnView = true,
	stepMs = 80,
	coalesce = false,
	direction = "dynamic",
	offset = 32,
	onAnimationComplete,
	size = "inherit",
	class: classProp,
	digitClass,
}: {
	/** Rounded to an integer before formatting. */
	value: number;
	/** Minimum digit count, zero-padded. */
	pad?: number;
	locale?: RollingDigitsLocale;
	/** Custom formatter; wins over `locale`. */
	format?: (value: number) => string;
	/** Show 0 until scrolled into view once, then roll up to `value`. */
	startOnView?: boolean;
	/** Gap between queued steps when `value` changes faster than a roll. */
	stepMs?: number;
	/** Jump straight to the latest value instead of stepping through each update. */
	coalesce?: boolean;
	direction?: RollingDigitsDirection;
	/** Travel of a rolling digit, in px. */
	offset?: number;
	/** `roll` springs each changed digit, `odometer` slides digit strips, `count` tweens the number. */
	variant?: RollingDigitsVariant;
	/** `odometer` and `count`: how long one change takes, in ms (500 and 1200 by default). */
	durationMs?: number;
	/** Fired when the display catches up with `value`. */
	onAnimationComplete?: () => void;
	size?: RollingDigitsSize;
	class?: string;
	digitClass?: string;
} = $props();

type Shown = RollingDigitCell & { leaving?: boolean; entering?: boolean };

let root = $state<HTMLSpanElement | null>(null);
// svelte-ignore state_referenced_locally -- one-time seed, like React's useState(initialValue)
let armed = $state(!startOnView);
const target = $derived(formatRollingDigits(armed ? value : 0, { pad, locale, format }));
// svelte-ignore state_referenced_locally
let shown = $state(target);
let displayed = untrack(() => target);
let queue: string[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
const styles = $derived(rollingDigits({ direction, size }));

$effect(() => {
	if (!startOnView) {
		armed = true;
		return;
	}
	const node = root;
	if (!node) return;
	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry?.isIntersecting) return;
			armed = true;
			observer.disconnect();
		},
		{ threshold: 0.6 },
	);
	observer.observe(node);
	return () => observer.disconnect();
});

function pump() {
	const next = queue.shift();
	if (next === undefined) {
		timer = null;
		onAnimationComplete?.();
		return;
	}
	displayed = next;
	shown = next;
	timer = setTimeout(pump, stepMs);
}

$effect(() => {
	const next = target;
	const merge = coalesce;
	untrack(() => {
		if (!timer && next === displayed) return;
		if (merge) queue = [next];
		else queue.push(next);
		if (merge && timer) clearTimeout(timer);
		if (merge || !timer) pump();
	});
});

$effect(() => () => {
	if (timer) clearTimeout(timer);
});

const cells = $derived(rollingDigitCells(shown));
// svelte-ignore state_referenced_locally
let rendered = $state<Shown[]>(cells);

$effect.pre(() => {
	const next = cells;
	untrack(() => {
		const keys = new Set(next.map((c) => c.key));
		const before = new Set(rendered.filter((c) => !c.leaving).map((c) => c.key));
		const gone = rendered
			.filter((c) => !keys.has(c.key))
			.map((c) => ({ ...c, leaving: true }));
		rendered = [...gone, ...next.map((c) => ({ ...c, entering: !before.has(c.key) }))];
	});
});

const duration = $derived(durationMs ?? (variant === "count" ? 1200 : 500));
// `count` hands `format` the raw tween value, so decimals survive; the others round first.
const render = (n: number) =>
	format ? format(n) : formatRollingDigits(n, { pad, locale });
const chars = $derived([...target]);
const ODOMETER_ROWS = Array.from({ length: 10 }, (_, i) => i);

// Odometer strips start on 0 and roll to their digit once mounted, so the first value turns too.
let mounted = $state(false);
$effect(() => {
	const frame = requestAnimationFrame(() => (mounted = true));
	return () => cancelAnimationFrame(frame);
});

// `count`: tweens from the last shown number with an ease-out cubic.
let counted = $state(0);
let countFrom = 0;
$effect(() => {
	if (variant !== "count") return;
	const to = armed ? value : 0;
	const span = duration;
	const start = untrack(() => countFrom);
	if (matchMedia("(prefers-reduced-motion: reduce)").matches || start === to) {
		counted = to;
		countFrom = to;
		return;
	}
	const began = performance.now();
	let raf = 0;
	const tick = (now: number) => {
		const t = Math.min(1, (now - began) / span);
		counted = start + (to - start) * (1 - (1 - t) ** 3);
		countFrom = counted;
		if (t < 1) raf = requestAnimationFrame(tick);
	};
	raf = requestAnimationFrame(tick);
	return () => cancelAnimationFrame(raf);
});
</script>

{#if variant !== "roll"}
	<span
		bind:this={root}
		data-slot="rolling-digits"
		data-variant={variant}
		class={cn(styles.root(), classProp)}
		style:--rd-duration="{duration}ms"
	>
		<span aria-live="polite" class={styles.srOnly()}>{variant === "count" ? render(armed ? value : 0) : target}</span>
		{#if variant === "count"}
			<span aria-hidden="true" class={digitClass}>{render(counted)}</span>
		{:else}
			<span aria-hidden="true" class={styles.cells()}>
				<!-- Keyed from the right so digits keep their place when the value grows. -->
				{#each chars as char, i (`${chars.length - i}-${/^[0-9]$/.test(char) ? "digit" : char}`)}
					{#if /^[0-9]$/.test(char)}
						<span class={cn(styles.odometerDigit(), digitClass)}>
							<span class={styles.odometerTrack()} style:--rd-index={mounted ? char : 0}>
								{#each ODOMETER_ROWS as row (row)}
									<span class={styles.odometerRow()}>{row}</span>
								{/each}
							</span>
						</span>
					{:else}
						<span class={digitClass}>{char}</span>
					{/if}
				{/each}
			</span>
		{/if}
	</span>
{:else}
<span bind:this={root} data-slot="rolling-digits" data-variant={variant} class={cn(styles.root(), classProp)}>
	<span aria-live="polite" class={styles.srOnly()}>{target}</span>
	<span aria-hidden="true" class={styles.cells()}>
		{#each rendered as cell (cell.key)}
			<span
				class={cn(
					styles.cell(),
					cell.leaving ? "rolling-digits-cell-out" : cell.entering && "rolling-digits-cell-in",
				)}
				onanimationend={(event) => {
					if (!cell.leaving || event.target !== event.currentTarget) return;
					rendered = rendered.filter((c) => c.key !== cell.key || !c.leaving);
				}}
			>
				<span class={styles.clip()}>
					{#if cell.isDigit}
						<RollingDigit
							char={cell.char}
							{direction}
							{offset}
							class={cn(styles.digit(), digitClass)}
							glyphClass={styles.glyph()}
						/>
					{:else}
						<span class={digitClass}>{cell.char}</span>
					{/if}
				</span>
			</span>
		{/each}
	</span>
</span>
{/if}
