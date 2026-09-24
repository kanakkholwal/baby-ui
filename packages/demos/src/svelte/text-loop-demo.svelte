<script lang="ts">
import { TextLoop, type TextLoopDirection, type TextLoopSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const items = ["Design", "Build", "Ship", "Iterate"];
</script>

<p class="max-w-4xl text-center font-light text-foreground text-lg tracking-tight sm:text-xl">
	<TextLoop
		{items}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 1000)}
		durationMs={Number(props.durationMs ?? 300)}
		direction={(props.direction as TextLoopDirection) ?? "up"}
		size={(props.size as TextLoopSize) ?? "inherit"}
		class="font-medium"
	/>{" "}software that ships faster.
</p>
