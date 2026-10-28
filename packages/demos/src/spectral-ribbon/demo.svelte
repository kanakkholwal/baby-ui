<script lang="ts">
import { SpectralRibbon } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SpectralRibbon>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<SpectralRibbon
		position="absolute"
		tone={p.tone ?? "spectrum"}
		speed={p.speed ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		thickness={Number(props.thickness ?? 1)}
		grain={Number(props.grain ?? 0.45)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</SpectralRibbon>
</div>
