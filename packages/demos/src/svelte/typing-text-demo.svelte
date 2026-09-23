<script lang="ts">
import { TypingText, type TypingTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<TypingText
	text="Creates a typing effect for given text"
	size={(props.size as TypingTextSize) ?? "md"}
	class="text-foreground"
/>
