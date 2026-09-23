<script lang="ts">
import { CycleText, type CycleTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const words = ["designers", "developers", "founders", "teams"];
</script>

<p class="text-2xl text-foreground">
	Built for
	<CycleText
		{words}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 1300)}
		durationMs={Number(props.durationMs ?? 260)}
		size={(props.size as CycleTextSize) ?? "lg"}
		class="font-semibold text-primary"
	/>
</p>
