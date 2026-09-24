<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	type LiveAxisPosition,
	LiveLine,
	LiveLineChart,
	type LiveLineCurve,
	type LiveLineTint,
	type LivePoint,
	LiveXAxis,
	LiveYAxis,
} from "@baby-ui/svelte";
import { createLiveFeed, LIVE_CONFIG, LIVE_TICK_MS, numberProp } from "../data/live";

let { props = {} }: { props?: Record<string, unknown> } = $props();

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
			<LiveYAxis position={(props.position as LiveAxisPosition) ?? "left"} />
			<LiveXAxis />
			<LiveLine
				dataKey="value"
				curve={(props.curve as LiveLineCurve) ?? "monotone"}
				tint={(props.tint as LiveLineTint) ?? "dot"}
				fill={props.fill !== false}
				pulse={props.pulse !== false}
				badge={props.badge !== false}
				guide={props.guide !== false}
			/>
			<ChartTooltip datePill={false} dots={false} />
		</LiveLineChart>
	</ChartContainer>
</div>
