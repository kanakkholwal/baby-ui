<script lang="ts">
import { Ticker } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Ticker>>(props));

const values = ["1,024", "1,387", "2,941", "2,108", "9,999", "10,240"];
let step = $state(0);

$effect(() => {
	const id = setInterval(() => (step = (step + 1) % values.length), 1800);
	return () => clearInterval(id);
});
</script>

<Ticker
	value={p.value || (values[step] ?? "")}
	durationMs={Number(props.durationMs ?? 500)}
	size={p.size ?? "md"}
/>
