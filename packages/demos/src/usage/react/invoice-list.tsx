import {
	Button,
	type Invoice,
	InvoiceList,
	InvoiceListCard,
	InvoiceListCards,
	InvoiceListFooter,
	InvoiceListRow,
	InvoiceListTable,
} from "@baby-ui/react";
import { useState } from "react";

export function BillingHistory({
	firstPage,
}: {
	firstPage: { invoices: Invoice[]; cursor: string | null };
}) {
	const [invoices, setInvoices] = useState(firstPage.invoices);
	const [cursor, setCursor] = useState(firstPage.cursor);
	const [loadingMore, setLoadingMore] = useState(false);

	async function loadMore() {
		setLoadingMore(true);
		const page = await fetch(`/api/billing/invoices?after=${cursor}`).then((r) =>
			r.json(),
		);
		setInvoices((prev) => [...prev, ...page.invoices]);
		setCursor(page.cursor);
		setLoadingMore(false);
	}

	return (
		<InvoiceList>
			<InvoiceListTable>
				{invoices.map((invoice) => (
					<InvoiceListRow key={invoice.id} invoice={invoice} />
				))}
			</InvoiceListTable>
			<InvoiceListCards>
				{invoices.map((invoice) => (
					<InvoiceListCard key={invoice.id} invoice={invoice} />
				))}
			</InvoiceListCards>
			{cursor !== null ? (
				<InvoiceListFooter>
					<Button size="sm" variant="outline" loading={loadingMore} onClick={loadMore}>
						Load more
					</Button>
				</InvoiceListFooter>
			) : null}
		</InvoiceList>
	);
}
