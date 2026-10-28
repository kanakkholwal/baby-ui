<script lang="ts">
import { GrainGradient } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof GrainGradient>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<GrainGradient
		position="absolute"
		tone={p.tone ?? "spectrum"}
		angle={Number(props.angle ?? 0)}
		grain={Number(props.grain ?? 0.35)}
		grainSize={Number(props.grainSize ?? 1)}
		duration={Number(props.duration ?? 12)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</GrainGradient>
</div>
