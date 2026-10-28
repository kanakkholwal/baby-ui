<script lang="ts">
import { Tool } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Tool>>(props));
</script>

<div class="flex w-full max-w-sm flex-col gap-2">
	<Tool
		name={p.name || "search_docs"}
		status={p.status ?? "running"}
		input={'{ "query": "dock magnification" }'}
		output={'{ "matches": 3 }'}
		defaultOpen={p.defaultOpen ?? false}
	/>
	<Tool name="read_file" status="done" input={'{ "path": "dock.svelte" }'} output="248 lines" />
</div>
