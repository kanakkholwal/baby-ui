<script lang="ts">
import { MaskText, type MaskTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<MaskText
	revealText={(props.revealText as string) || "Hello there"}
	baseText={(props.baseText as string) || "Move your cursor"}
	revealSize={Number(props.revealSize ?? 240)}
	durationMs={Number(props.durationMs ?? 500)}
	size={(props.size as MaskTextSize) ?? "md"}
/>
