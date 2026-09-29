<script lang="ts">
import { PixelCanvas } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PixelCanvas>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<PixelCanvas
		position="absolute"
		variant={p.variant ?? "default"}
		tone={p.tone ?? "spectrum"}
		gap={Number(props.gap ?? 8)}
		decay={Number(props.decay ?? 0.04)}
		radius={Number(props.radius ?? 90)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</PixelCanvas>
</div>
