<script lang="ts">
import { CircularText, type CircularTextDirection } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<CircularText
	text={(props.text as string) || "CIRCULAR TEXT · CIRCULAR TEXT · "}
	spinSeconds={Number(props.spinSeconds ?? 30)}
	radius={Number(props.radius ?? 80)}
	direction={(props.direction as CircularTextDirection) ?? "clockwise"}
/>
