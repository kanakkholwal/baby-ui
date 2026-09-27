<script lang="ts">
import {
	LightCaustics,
	type LightCausticsSpeed,
	type LightCausticsTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<LightCaustics
		position="absolute"
		tone={(props.tone as LightCausticsTone) ?? "ocean"}
		speed={(props.speed as LightCausticsSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Under the surface</p>
		</div>
	</LightCaustics>
</div>
