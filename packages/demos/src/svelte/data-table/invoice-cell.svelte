<script lang="ts">
import { Badge } from "@baby-ui/svelte";
import { INVOICE_STATUS, type Invoice } from "../../data/data-table";

let { field, invoice }: { field: "id" | "customer" | "status"; invoice: Invoice } =
	$props();
</script>

{#if field === "id"}
	<span class="font-mono text-muted-foreground">{invoice.id}</span>
{:else if field === "customer"}
	<div class="flex min-w-0 flex-col">
		<span class="truncate font-medium">{invoice.customer}</span>
		<span class="truncate text-muted-foreground text-xs">{invoice.email}</span>
	</div>
{:else}
	<Badge size="sm" variant={INVOICE_STATUS[invoice.status].variant}>
		{INVOICE_STATUS[invoice.status].label}
	</Badge>
{/if}
