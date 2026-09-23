<script lang="ts">
import { CircularText, type CircularTextDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<CircularText
	text="CIRCULAR TEXT · CIRCULAR TEXT · "
	direction={(props.direction as CircularTextDirection) ?? "clockwise"}
/>
