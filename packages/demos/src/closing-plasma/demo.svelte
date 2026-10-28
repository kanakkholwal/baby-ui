<script lang="ts">
import { ClosingPlasma } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ClosingPlasma>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<ClosingPlasma
		position="absolute"
		tone={p.tone ?? "chart"}
		speed={p.speed ?? "normal"}
		turbulence={Number(props.turbulence ?? 1)}
		sparkle={Number(props.sparkle ?? 1)}
		grain={Number(props.grain ?? 1)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</ClosingPlasma>
</div>
