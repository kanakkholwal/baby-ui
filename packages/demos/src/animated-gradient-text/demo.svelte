<script lang="ts">
import { AnimatedGradientText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AnimatedGradientText>>(props));
</script>

<AnimatedGradientText
	as="h2"
	tone={p.tone ?? "primary"}
	durationSeconds={Number(props.durationSeconds ?? 3)}
	class="text-3xl font-semibold sm:text-4xl"
>
	Ship it in seconds
</AnimatedGradientText>
