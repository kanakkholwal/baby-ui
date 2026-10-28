<script lang="ts">
import { LiquidChrome } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LiquidChrome>>(props));
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<LiquidChrome
		position="absolute"
		tone={p.tone ?? "chrome"}
		speed={p.speed ?? "normal"}
		amplitude={Number(props.amplitude ?? 0.6)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</LiquidChrome>
</div>
