"use client";

import {
	Button,
	type Invoice,
	InvoiceList,
	InvoiceListCard,
	InvoiceListCardSkeleton,
	InvoiceListCards,
	InvoiceListEmpty,
	InvoiceListFooter,
	InvoiceListRow,
	InvoiceListRowSkeleton,
	InvoiceListTable,
} from "@baby-ui/react";
import { useState } from "react";
import { INVOICE_PAGE, invoiceHistory } from "../data/invoice-list";

type Props = Record<string, unknown>;

const SKELETONS = [0, 1, 2, 3];

export function InvoiceListDemo({ props }: { props: Props }) {
	const [all] = useState<Invoice[]>(() => invoiceHistory(new Date()));
	const [shown, setShown] = useState(INVOICE_PAGE);
	const [loadingMore, setLoadingMore] = useState(false);
	const loading = props.loading === true;
	const density = props.density === "compact" ? "compact" : "comfortable";
	const invoices = all.slice(0, shown);

	// Stands in for fetching the next page from your billing API.
	const loadMore = () => {
		setLoadingMore(true);
		setTimeout(() => {
			setShown(all.length);
			setLoadingMore(false);
		}, 900);
	};

	return (
		<div className="w-full max-w-3xl">
			<InvoiceList density={density} loading={loading}>
				{!loading && invoices.length === 0 ? (
					<InvoiceListEmpty />
				) : (
					<>
						<InvoiceListTable>
							{loading
								? SKELETONS.map((i) => <InvoiceListRowSkeleton key={i} />)
								: invoices.map((invoice) => (
										<InvoiceListRow key={invoice.id} invoice={invoice} />
									))}
						</InvoiceListTable>
						<InvoiceListCards>
							{loading
								? SKELETONS.map((i) => <InvoiceListCardSkeleton key={i} />)
								: invoices.map((invoice) => (
										<InvoiceListCard key={invoice.id} invoice={invoice} />
									))}
						</InvoiceListCards>
					</>
				)}
				{!loading && shown < all.length ? (
					<InvoiceListFooter>
						<Button size="sm" variant="outline" loading={loadingMore} onClick={loadMore}>
							Load more
						</Button>
					</InvoiceListFooter>
				) : null}
			</InvoiceList>
		</div>
	);
}
