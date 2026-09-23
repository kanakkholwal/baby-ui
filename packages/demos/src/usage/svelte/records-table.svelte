<script lang="ts">
import { RecordsTable } from "@baby-ui/svelte";
</script>

<RecordsTable
	rows={[
		{
			id: "1",
			name: "Northwind Traders",
			tags: ["Retail"],
			last: "3 days ago",
			strength: "strong",
			website: "northwindtraders.com",
		},
		{ id: "2", name: "Coral Reef Studio", tags: ["Design"], last: "No contact", strength: "none" },
	]}
/>
