<script lang="ts">
import {
	Tool,
	ToolActions,
	ToolContent,
	ToolCopy,
	ToolInput,
	ToolOutput,
	ToolRetry,
	type ToolState,
	ToolTrigger,
} from "@baby-ui/svelte";

let {
	status,
	input,
	output,
	retry,
}: { status: ToolState; input: string; output: string; retry: () => void } = $props();
</script>

<Tool {status}>
	<ToolTrigger name="search_docs" title="Searching the docs" kind="search" />
	<ToolContent>
		<ToolInput>{input}</ToolInput>
		<ToolOutput>{output}</ToolOutput>
		<ToolActions>
			<ToolCopy text={output} />
			<ToolRetry onclick={retry} />
		</ToolActions>
	</ToolContent>
</Tool>
