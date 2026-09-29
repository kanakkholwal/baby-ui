<script lang="ts">
import { TaskSteps } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TaskSteps>>(props));

const steps = [
	{ id: "read", label: "Read the component spec", status: "done" as const },
	{ id: "port", label: "Author the Svelte port", status: "done" as const },
	{ id: "check", label: "Run svelte-check", status: "active" as const },
	{ id: "docs", label: "Write the doc page", status: "pending" as const },
];
</script>

<div class="w-full max-w-80">
	<TaskSteps
		{steps}
		showConnector={props.showConnector !== false}
		compact={p.compact ?? false}
		size={p.size ?? "md"}
	/>
</div>
