<script lang="ts">
import { Counter, type CounterDirection, type CounterSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.direction ?? "up") + String(props.durationMs ?? "")}
	<Counter
		value={Number(props.value ?? 12480)}
		direction={(props.direction as CounterDirection) ?? "up"}
		durationMs={Number(props.durationMs ?? 1200)}
		delayMs={Number(props.delayMs ?? 0)}
		triggerOnView={props.triggerOnView === true}
		size={(props.size as CounterSize) ?? "md"}
	/>
{/key}
