<script lang="ts">
import { ScrollReveal, type ScrollRevealSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<ScrollReveal
	text={(props.text as string) ||
		"Scroll inside this box to reveal each word of this sentence, one at a time, as you go."}
	minOpacity={Number(props.minOpacity ?? 0.5)}
	blur={props.blur !== false}
	size={(props.size as ScrollRevealSize) ?? "md"}
/>
