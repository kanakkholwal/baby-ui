<script lang="ts">
import { TextLoop } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TextLoop>>(props));

const items = ["Design", "Build", "Ship", "Iterate"];
</script>

<p class="max-w-4xl text-center font-light text-foreground text-lg tracking-tight sm:text-xl">
	<TextLoop
		{items}
		defaultIndex={Number(props.defaultIndex ?? 0)}
		intervalMs={Number(props.intervalMs ?? 1000)}
		durationMs={Number(props.durationMs ?? 300)}
		direction={p.direction ?? "up"}
		size={p.size ?? "inherit"}
		class="font-medium"
	/>{" "}software that ships faster.
</p>
