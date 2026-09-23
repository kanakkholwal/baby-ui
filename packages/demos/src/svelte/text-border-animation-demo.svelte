<script lang="ts">
import { TextBorderAnimation, type TextBorderAnimationSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<TextBorderAnimation
	text={(props.text as string) || "Programming"}
	size={(props.size as TextBorderAnimationSize) ?? "lg"}
/>
