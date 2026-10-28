<script lang="ts">
import {
	Button,
	InvoiceList,
	InvoiceListCard,
	InvoiceListCardSkeleton,
	InvoiceListCards,
	InvoiceListEmpty,
	InvoiceListFooter,
	InvoiceListRow,
	InvoiceListRowSkeleton,
	InvoiceListTable,
} from "@baby-ui/svelte";
import { INVOICE_PAGE, invoiceHistory } from "../data/invoice-list";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const all = invoiceHistory(new Date());
const SKELETONS = [0, 1, 2, 3];
let shown = $state(INVOICE_PAGE);
let loadingMore = $state(false);
const loading = $derived(props.loading === true);
const density = $derived(props.density === "compact" ? "compact" : "comfortable");
const invoices = $derived(all.slice(0, shown));

// Stands in for fetching the next page from your billing API.
function loadMore() {
	loadingMore = true;
	setTimeout(() => {
		shown = all.length;
		loadingMore = false;
	}, 900);
}
</script>

<div class="w-full max-w-3xl">
	<InvoiceList {density} {loading}>
		{#if !loading && invoices.length === 0}
			<InvoiceListEmpty />
		{:else}
			<InvoiceListTable>
				{#if loading}
					{#each SKELETONS as i (i)}<InvoiceListRowSkeleton />{/each}
				{:else}
					{#each invoices as invoice (invoice.id)}<InvoiceListRow {invoice} />{/each}
				{/if}
			</InvoiceListTable>
			<InvoiceListCards>
				{#if loading}
					{#each SKELETONS as i (i)}<InvoiceListCardSkeleton />{/each}
				{:else}
					{#each invoices as invoice (invoice.id)}<InvoiceListCard {invoice} />{/each}
				{/if}
			</InvoiceListCards>
		{/if}
		{#if !loading && shown < all.length}
			<InvoiceListFooter>
				<Button size="sm" variant="outline" loading={loadingMore} onclick={loadMore}>
					Load more
				</Button>
			</InvoiceListFooter>
		{/if}
	</InvoiceList>
</div>
