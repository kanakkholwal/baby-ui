<script lang="ts">
import { TextInertia } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TextInertia>>(props));

const text =
	"Crafting refined, pixel-perfect web experiences that balance design clarity with technical excellence. Every interaction should feel responsive, intentional, and calm enough to disappear into the work.";
</script>

<div class="w-full max-w-3xl text-lg sm:text-xl">
	<TextInertia
		{text}
		intensity={Number(props.intensity ?? 1)}
		size={p.size ?? "inherit"}
		class="justify-start text-left text-foreground leading-relaxed"
	/>
</div>
