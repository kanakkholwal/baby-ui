<script lang="ts">
import {
	SpectralRibbon,
	type SpectralRibbonSpeed,
	type SpectralRibbonTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<SpectralRibbon
		position="absolute"
		tone={(props.tone as SpectralRibbonTone) ?? "spectrum"}
		speed={(props.speed as SpectralRibbonSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		thickness={Number(props.thickness ?? 1)}
		grain={Number(props.grain ?? 0.45)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</SpectralRibbon>
</div>
