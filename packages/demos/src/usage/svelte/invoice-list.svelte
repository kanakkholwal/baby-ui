<script lang="ts">
import {
	Button,
	type Invoice,
	InvoiceList,
	InvoiceListCard,
	InvoiceListCards,
	InvoiceListFooter,
	InvoiceListRow,
	InvoiceListTable,
} from "@baby-ui/svelte";
import { untrack } from "svelte";

let { firstPage }: { firstPage: { invoices: Invoice[]; cursor: string | null } } =
	$props();

// Seeded once from the server; later pages append locally.
let invoices = $state(untrack(() => firstPage.invoices));
let cursor = $state(untrack(() => firstPage.cursor));
let loadingMore = $state(false);

async function loadMore() {
	loadingMore = true;
	const page = await fetch(`/api/billing/invoices?after=${cursor}`).then((r) => r.json());
	invoices = [...invoices, ...page.invoices];
	cursor = page.cursor;
	loadingMore = false;
}
</script>

<InvoiceList>
	<InvoiceListTable>
		{#each invoices as invoice (invoice.id)}<InvoiceListRow {invoice} />{/each}
	</InvoiceListTable>
	<InvoiceListCards>
		{#each invoices as invoice (invoice.id)}<InvoiceListCard {invoice} />{/each}
	</InvoiceListCards>
	{#if cursor !== null}
		<InvoiceListFooter>
			<Button size="sm" variant="outline" loading={loadingMore} onclick={loadMore}>
				Load more
			</Button>
		</InvoiceListFooter>
	{/if}
</InvoiceList>
