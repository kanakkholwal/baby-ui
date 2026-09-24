<script lang="ts">
import { Ticker, type TickerSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const values = ["1,024", "1,387", "2,941", "2,108", "9,999", "10,240"];
let step = $state(0);

$effect(() => {
	const id = setInterval(() => (step = (step + 1) % values.length), 1800);
	return () => clearInterval(id);
});
</script>

<Ticker
	value={(props.value as string) || (values[step] ?? "")}
	durationMs={Number(props.durationMs ?? 500)}
	size={(props.size as TickerSize) ?? "md"}
/>
