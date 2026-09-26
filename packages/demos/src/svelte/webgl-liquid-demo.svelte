<script lang="ts">
import {
	WebglLiquid,
	type WebglLiquidSpeed,
	type WebglLiquidTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<WebglLiquid
		position="absolute"
		tone={(props.tone as WebglLiquidTone) ?? "ocean"}
		speed={(props.speed as WebglLiquidSpeed) ?? "normal"}
		flow={Number(props.flow ?? 1)}
		grain={Number(props.grain ?? 0.05)}
		reveal={props.reveal !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</WebglLiquid>
</div>
