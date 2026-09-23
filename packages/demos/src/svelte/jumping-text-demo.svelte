<script lang="ts">
import { JumpingText, type JumpingTextMode } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<JumpingText
	text="This is a jumping text effect"
	mode={(props.mode as JumpingTextMode) ?? "word"}
	class="text-foreground"
/>
