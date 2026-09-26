<script lang="ts">
import {
	LiquidChrome,
	type LiquidChromeSpeed,
	type LiquidChromeTone,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<LiquidChrome
		position="absolute"
		tone={(props.tone as LiquidChromeTone) ?? "chrome"}
		speed={(props.speed as LiquidChromeSpeed) ?? "normal"}
		amplitude={Number(props.amplitude ?? 0.6)}
		interactive={props.interactive !== false}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</LiquidChrome>
</div>
