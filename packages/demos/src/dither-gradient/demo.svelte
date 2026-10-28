<script lang="ts">
import { DitherGradient } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof DitherGradient>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<DitherGradient
		position="absolute"
		tone={p.tone ?? "spectrum"}
		matrix={p.matrix ?? "bayer4"}
		angle={Number(props.angle ?? 45)}
		speed={Number(props.speed ?? 1)}
		pixelSize={Number(props.pixelSize ?? 3)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</DitherGradient>
</div>
