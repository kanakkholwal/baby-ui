<script lang="ts">
import { AnimatedGradient, type AnimatedGradientTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<AnimatedGradient
		position="absolute"
		tone={(props.tone as AnimatedGradientTone) ?? "spectrum"}
		duration={Number(props.duration ?? 20)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</AnimatedGradient>
</div>
