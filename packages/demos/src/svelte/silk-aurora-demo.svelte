<script lang="ts">
import { SilkAurora } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SilkAurora>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<SilkAurora
		position="absolute"
		tone={p.tone ?? "pearl"}
		speed={p.speed ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0.85)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</SilkAurora>
</div>
