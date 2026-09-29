<script lang="ts">
import { ReorderList } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ReorderList>>(props));

let items = $state([
	{ id: "spec", label: "Write the ComponentSpec" },
	{ id: "svelte", label: "Author the Svelte port" },
	{ id: "react", label: "Author the React port" },
	{ id: "docs", label: "Write the doc page" },
]);
</script>

<div class="w-full max-w-80">
	<ReorderList
		bind:items
		disabled={p.disabled ?? false}
		label={p.label || "Build steps"}
		variant={p.variant ?? "card"}
	/>
</div>
