<script lang="ts">
import type { DataTable } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import InfiniteTable from "./data-table/infinite-table.svelte";
import ServerTable from "./data-table/server-table.svelte";
import VirtualTable from "./data-table/virtual-table.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(
	controlProps<Pick<ComponentProps<typeof DataTable>, "variant" | "density">>(props),
);
const variant = $derived(p.variant ?? "default");
const density = $derived(p.density ?? "comfortable");
const simulate = $derived(
	props.simulate === "error" || props.simulate === "empty" ? props.simulate : "normal",
);
</script>

<div class="w-full max-w-5xl">
	{#if props.layout === "server"}
		{#key simulate}
			<ServerTable {variant} {density} {simulate} />
		{/key}
	{:else if props.layout === "infinite"}
		<InfiniteTable {variant} {density} />
	{:else}
		<VirtualTable {variant} {density} />
	{/if}
</div>
