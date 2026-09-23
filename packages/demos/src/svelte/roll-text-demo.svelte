<script lang="ts">
import { type RollStagger, RollText } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<RollText
	text="Roll on hover"
	stagger={(props.stagger as RollStagger) ?? "none"}
	class="text-2xl font-semibold text-foreground"
/>
