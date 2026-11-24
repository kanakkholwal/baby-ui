<script lang="ts">
import { Badge } from "@baby-ui/components/svelte/badge";

const STATUSES = [
	{ variant: "secondary", label: "Default" },
	{ variant: "success", label: "Active" },
	{ variant: "warning", label: "Pending" },
	{ variant: "destructive", label: "Inactive" },
] as const;
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-wrap items-center gap-2">
		{#each STATUSES as status (status.label)}
			<Badge variant={status.variant} fill="solid" dot>{status.label}</Badge>
		{/each}
	</div>
	<div class="flex flex-wrap items-center gap-2">
		{#each STATUSES as status (status.label)}
			<Badge variant={status.variant} dot>{status.label}</Badge>
		{/each}
	</div>
</div>
