<script lang="ts">
import { TextFlip, type TextFlipSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const words = ["fantastic", "love", "fire", "awesome"];
</script>

<TextFlip
	label={(props.label as string) || "Coding is"}
	{words}
	defaultIndex={Number(props.defaultIndex ?? 0)}
	intervalMs={Number(props.intervalMs ?? 2000)}
	size={(props.size as TextFlipSize) ?? "lg"}
/>
