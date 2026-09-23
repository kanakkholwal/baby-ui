<script lang="ts">
import { BoldCopy, type BoldCopySize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<BoldCopy
	text={(props.text as string) || "baby ui"}
	size={(props.size as BoldCopySize) ?? "xl"}
	durationMs={Number(props.durationMs ?? 300)}
/>
