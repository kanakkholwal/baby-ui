<script lang="ts">
import { SplitText, type SplitTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<SplitText
	text={(props.text as string) || "BABY UI"}
	size={(props.size as SplitTextSize) ?? "md"}
	durationMs={Number(props.durationMs ?? 300)}
/>
