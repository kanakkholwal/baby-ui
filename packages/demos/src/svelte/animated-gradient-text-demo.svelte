<script lang="ts">
import { AnimatedGradientText, type GradientTextTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<AnimatedGradientText
	as="h2"
	tone={(props.tone as GradientTextTone) ?? "primary"}
	durationSeconds={Number(props.durationSeconds ?? 3)}
	class="text-3xl font-semibold sm:text-4xl"
>
	Ship it in seconds
</AnimatedGradientText>
