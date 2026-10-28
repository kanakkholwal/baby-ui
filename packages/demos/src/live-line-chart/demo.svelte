<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	LiveLine,
	LiveLineChart,
	type LivePoint,
	LiveXAxis,
	LiveYAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { createLiveFeed, LIVE_CONFIG, LIVE_TICK_MS, numberProp } from "../data/live";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const pYAxis = $derived(controlProps<ComponentProps<typeof LiveYAxis>>(props));
const pLine = $derived(controlProps<ComponentProps<typeof LiveLine>>(props));

const KEEP_SECONDS = 120;
const feed = createLiveFeed();
let data = $state<LivePoint[]>(feed.backfill(60));
const paused = $derived(props.paused === true);

$effect(() => {
	if (paused) return;
	const id = window.setInterval(() => {
		const time = Date.now() / 1000;
		data = [
			...data.filter((p) => p.time > time - KEEP_SECONDS),
			{ time, value: feed.step() },
		];
	}, LIVE_TICK_MS);
	return () => clearInterval(id);
});
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={LIVE_CONFIG} title="Live price">
		<LiveLineChart
			{data}
			value={data.at(-1)?.value ?? 0}
			window={numberProp(props.window, 30)}
			{paused}
			exaggerate={props.exaggerate === true}
			nowOffsetUnits={numberProp(props.nowOffsetUnits, 0)}
			lerpSpeed={numberProp(props.lerpSpeed, 0.08)}
		>
			<CartesianGrid />
			<LiveYAxis position={pYAxis.position ?? "left"} />
			<LiveXAxis />
			<LiveLine
				dataKey="value"
				curve={pLine.curve ?? "monotone"}
				tint={pLine.tint ?? "dot"}
				fill={props.fill !== false}
				pulse={props.pulse !== false}
				badge={props.badge !== false}
				guide={props.guide !== false}
			/>
			<ChartTooltip datePill={false} dots={false} />
		</LiveLineChart>
	</ChartContainer>
</div>
