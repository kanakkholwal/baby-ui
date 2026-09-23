<script lang="ts">
import { SwapText, type SwapTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<SwapText
	initialText="Hover me"
	finalText="Click me"
	size={(props.size as SwapTextSize) ?? "lg"}
	supportsHover={props.supportsHover !== false}
/>
