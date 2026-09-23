<script lang="ts">
import { Ticker, type TickerSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<Ticker
	value={(props.value as string) || "1,024"}
	durationMs={Number(props.durationMs ?? 500)}
	size={(props.size as TickerSize) ?? "md"}
/>
