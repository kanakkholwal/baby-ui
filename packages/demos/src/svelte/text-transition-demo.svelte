<script lang="ts">
import { TextTransition, type TextTransitionVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<TextTransition
	text="Ship it in seconds"
	variant={(props.variant as TextTransitionVariant) ?? "blur-out-up"}
	class="text-3xl font-semibold text-foreground"
/>
