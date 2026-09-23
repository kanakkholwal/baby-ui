<script lang="ts">
import { ScrollReveal } from "@baby-ui/svelte";

let { props: _props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<ScrollReveal
	text="Scroll inside this box to reveal each word of this sentence, one at a time, as you go."
/>
