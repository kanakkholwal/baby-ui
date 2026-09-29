<script lang="ts">
import { LightCaustics } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LightCaustics>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<LightCaustics
		position="absolute"
		tone={p.tone ?? "ocean"}
		speed={p.speed ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Under the surface</p>
		</div>
	</LightCaustics>
</div>
