<script lang="ts">
import {
	ChromaticWave,
	type ChromaticWaveSpeed,
	type ChromaticWaveTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<ChromaticWave
		position="absolute"
		tone={(props.tone as ChromaticWaveTone) ?? "spectrum"}
		speed={(props.speed as ChromaticWaveSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Every line in motion</p>
		</div>
	</ChromaticWave>
</div>
