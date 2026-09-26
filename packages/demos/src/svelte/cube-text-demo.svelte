<script lang="ts">
import { CubeText, type CubeTextSize, type CubeTextStagger } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<CubeText
	text={(props.text as string) || "Baby UI"}
	durationMs={Number(props.durationMs ?? 2200)}
	delayMs={Number(props.delayMs ?? 0)}
	loop={(props.loop as boolean) ?? true}
	stagger={(props.stagger as CubeTextStagger) ?? "wave"}
	size={(props.size as CubeTextSize) ?? "md"}
/>
