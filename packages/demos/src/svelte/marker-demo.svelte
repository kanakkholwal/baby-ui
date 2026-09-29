<script lang="ts">
import { Marker } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Marker>>(props));

const variant = $derived(p.variant ?? "wavy");
</script>

<p class="max-w-xl text-center font-light text-3xl text-foreground leading-relaxed tracking-tight">
	Ship interfaces that feel{" "}{#key `${variant}-${props.tone}-${props.durationMs}-${props.delayMs}-${props.animate}`}<Marker
			{variant}
			tone={p.tone ?? "auto"}
			animate={props.animate !== false}
			durationMs={Number(props.durationMs ?? 700)}
			delayMs={Number(props.delayMs ?? 0)}
			class="font-medium">hand-made</Marker
		>{/key}{" "}every time.
</p>
