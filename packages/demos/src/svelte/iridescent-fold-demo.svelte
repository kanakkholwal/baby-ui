<script lang="ts">
import { IridescentFold } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof IridescentFold>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<IridescentFold
		position="absolute"
		tone={p.tone ?? "spectrum"}
		speed={p.speed ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Folded light</p>
		</div>
	</IridescentFold>
</div>
