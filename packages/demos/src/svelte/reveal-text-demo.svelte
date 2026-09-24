<script lang="ts">
import {
	RevealText,
	type RevealTextSize,
	type RevealTextSplit,
	type RevealTextTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const split = $derived((props.split as RevealTextSplit) ?? "word");
const trigger = $derived((props.trigger as RevealTextTrigger) ?? "mount");
</script>

{#key `${split}-${trigger}-${props.staggerMs}-${props.blur}`}
	<RevealText
		as="h2"
		text="Design meets motion, one word at a time"
		{split}
		{trigger}
		once={Boolean(props.once ?? true)}
		staggerMs={Number(props.staggerMs ?? 90)}
		delayMs={Number(props.delayMs ?? 0)}
		blur={Number(props.blur ?? 12)}
		size={(props.size as RevealTextSize) ?? "inherit"}
		class="text-center font-semibold text-2xl text-foreground tracking-tight"
	/>
{/key}
