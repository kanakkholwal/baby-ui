<script lang="ts">
import {
	RevealText,
	type RevealTextDirection,
	type RevealTextSize,
	type RevealTextSplit,
	type RevealTextStaggerFrom,
	type RevealTextTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const split = $derived((props.split as RevealTextSplit) ?? "word");
const trigger = $derived((props.trigger as RevealTextTrigger) ?? "mount");
</script>

<div class="text-2xl">
	{#key `${split}-${trigger}-${props.once}-${props.staggerMs}-${props.delayMs}-${props.blur}-${props.direction}-${props.staggerFrom}-${props.mask}`}
		<RevealText
			as="h2"
			text="Design meets motion, one word at a time"
			{split}
			{trigger}
			once={Boolean(props.once ?? true)}
			staggerMs={Number(props.staggerMs ?? 90)}
			delayMs={Number(props.delayMs ?? 0)}
			blur={Number(props.blur ?? 12)}
			direction={(props.direction as RevealTextDirection) ?? "up"}
			staggerFrom={(props.staggerFrom as RevealTextStaggerFrom) ?? "start"}
			mask={props.mask === true}
			size={(props.size as RevealTextSize) ?? "inherit"}
			class="text-center font-semibold text-foreground tracking-tight"
		/>
	{/key}
</div>
