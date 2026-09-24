<script lang="ts">
import { MorphText, type MorphTextSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const words = ["fast", "fluid", "alive"];
</script>

<p class="max-w-4xl text-center font-light text-2xl text-foreground tracking-tight sm:text-4xl">
	Build software that feels{" "}<MorphText
		{words}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 3000)}
		subtext={(props.subtext as string) || undefined}
		size={(props.size as MorphTextSize) ?? "inherit"}
		class="font-semibold"
	/>
</p>
