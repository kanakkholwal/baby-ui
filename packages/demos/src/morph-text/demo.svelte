<script lang="ts">
import { MorphText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof MorphText>>(props));

const words = ["fast", "fluid", "alive"];
</script>

<p class="max-w-4xl text-center font-light text-2xl text-foreground tracking-tight sm:text-4xl">
	Build software that feels{" "}<MorphText
		{words}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 3000)}
		subtext={p.subtext || undefined}
		size={p.size ?? "inherit"}
		class="font-semibold"
	/>
</p>
