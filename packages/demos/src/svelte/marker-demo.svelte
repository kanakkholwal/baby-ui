<script lang="ts">
import { Marker, type MarkerTone, type MarkerVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const variant = $derived((props.variant as MarkerVariant) ?? "wavy");
</script>

<p class="max-w-xl text-center font-light text-3xl text-foreground leading-relaxed tracking-tight">
	Ship interfaces that feel{" "}{#key `${variant}-${props.tone}-${props.durationMs}-${props.delayMs}-${props.animate}`}<Marker
			{variant}
			tone={(props.tone as MarkerTone) ?? "auto"}
			animate={props.animate !== false}
			durationMs={Number(props.durationMs ?? 700)}
			delayMs={Number(props.delayMs ?? 0)}
			class="font-medium">hand-made</Marker
		>{/key}{" "}every time.
</p>
