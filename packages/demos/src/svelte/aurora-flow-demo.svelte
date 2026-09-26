<script lang="ts">
import { AuroraFlow, type AuroraFlowSpeed, type AuroraFlowTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<AuroraFlow
		position="absolute"
		tone={(props.tone as AuroraFlowTone) ?? "chart"}
		speed={(props.speed as AuroraFlowSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0.22)}
		direction={Number(props.direction ?? -18)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</AuroraFlow>
</div>
