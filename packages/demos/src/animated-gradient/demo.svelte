<script lang="ts">
import { AnimatedGradient } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AnimatedGradient>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<AnimatedGradient
		position="absolute"
		tone={p.tone ?? "spectrum"}
		duration={Number(props.duration ?? 20)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</AnimatedGradient>
</div>
