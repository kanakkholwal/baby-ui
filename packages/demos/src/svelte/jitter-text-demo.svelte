<script lang="ts">
import { JitterText, type JitterTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<JitterText
	text={(props.text as string) || "Jitter"}
	durationSeconds={Number(props.durationSeconds ?? 0.6)}
	size={(props.size as JitterTextSize) ?? "lg"}
	class="text-foreground"
/>
