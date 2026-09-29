<script lang="ts">
import { CycleText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof CycleText>>(props));

const words = ["designers", "developers", "founders", "teams"];
</script>

<p class="text-2xl text-foreground">
	Built for
	<CycleText
		{words}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 1300)}
		durationMs={Number(props.durationMs ?? 260)}
		size={p.size ?? "lg"}
		class="font-semibold text-primary"
	/>
</p>
