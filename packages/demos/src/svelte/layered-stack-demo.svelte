<script lang="ts">
import { LayeredStack } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { LAYERED_ITEMS } from "../data/stacks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LayeredStack>>(props));
</script>

<LayeredStack
	items={LAYERED_ITEMS}
	columns={p.columns ?? "4"}
	aspect={p.aspect ?? "portrait"}
	tilt={Number(props.tilt ?? 10)}
	class="max-w-3xl"
/>
