<script lang="ts">
import { LightRays } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LightRays>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl bg-background">
	<LightRays
		position="absolute"
		variant={p.variant ?? "soft"}
		tone={p.tone ?? "primary"}
		speed={p.speed ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		count={props.count === undefined ? undefined : Number(props.count)}
		seed={Number(props.seed ?? 34)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-medium text-2xl text-foreground tracking-tight">Built on baby ui</p>
		</div>
	</LightRays>
</div>
