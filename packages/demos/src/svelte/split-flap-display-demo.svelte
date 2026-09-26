<script lang="ts">
import {
	SplitFlapDisplay,
	type SplitFlapIndicator,
	type SplitFlapSize,
	type SplitFlapVariant,
} from "@baby-ui/svelte";
import { departuresBoard, departuresLine } from "../data/departures";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let tick = $state(0);
const columns = $derived(Number(props.columns ?? 24));

$effect(() => {
	const id = setInterval(() => (tick += 1), 6000);
	return () => clearInterval(id);
});
</script>

<div class="w-full">
	<SplitFlapDisplay
		value={props.layout === "line" ? departuresLine(tick) : departuresBoard(tick, columns)}
		{columns}
		variant={(props.variant as SplitFlapVariant) ?? "solid"}
		size={(props.size as SplitFlapSize) ?? "md"}
		indicator={(props.indicator as SplitFlapIndicator) ?? "success"}
		stepMs={Number(props.stepMs ?? 60)}
		staggerMs={Number(props.staggerMs ?? 30)}
	/>
</div>
