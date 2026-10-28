<script lang="ts">
import { type TaskStatus, TaskSteps } from "@baby-ui/svelte";

const steps: { id: string; label: string; status: TaskStatus }[] = [
	{ id: "read", label: "Read the spec", status: "done" },
	{ id: "port", label: "Author the port", status: "active" },
	{ id: "docs", label: "Write the docs", status: "pending" },
];
</script>

<TaskSteps {steps} />
