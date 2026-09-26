<script lang="ts">
import { SilkAurora, type SilkAuroraSpeed, type SilkAuroraTone } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<SilkAurora
		position="absolute"
		tone={(props.tone as SilkAuroraTone) ?? "pearl"}
		speed={(props.speed as SilkAuroraSpeed) ?? "normal"}
		intensity={Number(props.intensity ?? 1)}
		grain={Number(props.grain ?? 0.85)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</SilkAurora>
</div>
