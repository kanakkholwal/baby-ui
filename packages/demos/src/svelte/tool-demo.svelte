<script lang="ts">
import { Tool } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="flex w-96 flex-col gap-2">
	<Tool
		name={(props.name as string) || "search_docs"}
		status={(props.status as "pending" | "running" | "done" | "error") ?? "running"}
		input={'{ "query": "dock magnification" }'}
		output={'{ "matches": 3 }'}
		defaultOpen={Boolean(props.defaultOpen)}
	/>
	<Tool name="read_file" status="done" input={'{ "path": "dock.svelte" }'} output="248 lines" />
</div>
