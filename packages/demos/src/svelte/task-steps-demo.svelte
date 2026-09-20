<script lang="ts">
import { TaskSteps } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const steps = [
	{ id: "read", label: "Read the component spec", status: "done" as const },
	{ id: "port", label: "Author the Svelte port", status: "done" as const },
	{ id: "check", label: "Run svelte-check", status: "active" as const },
	{ id: "docs", label: "Write the doc page", status: "pending" as const },
];
</script>

<div class="w-80">
	<TaskSteps
		{steps}
		showConnector={props.showConnector !== false}
		compact={Boolean(props.compact)}
	/>
</div>
