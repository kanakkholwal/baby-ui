<script lang="ts">
import {
	LayeredStack,
	type LayeredStackAspect,
	type LayeredStackColumns,
} from "@baby-ui/svelte";
import { LAYERED_ITEMS } from "../data/stacks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<LayeredStack
	items={LAYERED_ITEMS}
	columns={(props.columns as LayeredStackColumns) ?? "4"}
	aspect={(props.aspect as LayeredStackAspect) ?? "portrait"}
	tilt={Number(props.tilt ?? 10)}
	class="max-w-3xl"
/>
