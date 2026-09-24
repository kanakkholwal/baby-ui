<script lang="ts">
import { DiaText, type DiaTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const words = ["fast.", "focused.", "effortlessly smooth."];
</script>

<p class="max-w-4xl text-center font-light text-3xl text-foreground tracking-tight sm:text-4xl">
	Make interfaces feel{" "}<DiaText
		text={words}
		repeat
		durationMs={Number(props.durationMs ?? 1500)}
		delayMs={Number(props.delayMs ?? 0)}
		repeatDelayMs={Number(props.repeatDelayMs ?? 500)}
		fixedWidth={Boolean(props.fixedWidth ?? false)}
		size={(props.size as DiaTextSize) ?? "inherit"}
	/>
</p>
