<script lang="ts">
import { Counter, type CounterDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

{#key String(props.direction ?? "up")}
	<Counter
		value={12480}
		direction={(props.direction as CounterDirection) ?? "up"}
		triggerOnView={false}
	/>
{/key}
