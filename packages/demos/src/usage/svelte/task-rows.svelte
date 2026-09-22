<script lang="ts">
import { TaskRows } from "@baby-ui/svelte";
</script>

<TaskRows
	rows={[
		{
			key: "verify",
			label: "Verified vendor records",
			amount: "12 suppliers",
			status: "done",
			details: [{ label: "Matched tax and contact IDs", meta: "12/12" }],
		},
	]}
/>
