import {
	DataTableColumnHeader,
	type DataTableHeaderContext,
	dataTableColumns,
	dataTableSelectColumn,
	renderComponent,
} from "@baby-ui/svelte";
import { currency, formatIssued, type Invoice } from "../../data/data-table";
import InvoiceCell from "./invoice-cell.svelte";

const h = dataTableColumns<Invoice>();
const header = <TValue>({ column }: DataTableHeaderContext<Invoice, TValue>) =>
	renderComponent(DataTableColumnHeader<Invoice, TValue>, { column });

export const COLUMNS = h.columns([
	dataTableSelectColumn<Invoice>(),
	h.accessor("id", {
		size: 120,
		meta: { label: "Invoice" },
		header,
		cell: ({ row }) =>
			renderComponent(InvoiceCell, { field: "id", invoice: row.original }),
	}),
	h.accessor("customer", {
		size: 220,
		meta: { label: "Customer" },
		header,
		cell: ({ row }) =>
			renderComponent(InvoiceCell, { field: "customer", invoice: row.original }),
	}),
	h.accessor("status", {
		size: 120,
		meta: { label: "Status" },
		header,
		cell: ({ row }) =>
			renderComponent(InvoiceCell, { field: "status", invoice: row.original }),
	}),
	h.accessor("plan", { size: 130, meta: { label: "Plan" }, header }),
	h.accessor("region", {
		size: 130,
		meta: { label: "Region", cellClassName: "font-mono text-xs text-muted-foreground" },
		header,
	}),
	h.accessor("issued", {
		size: 130,
		meta: { label: "Issued" },
		header,
		cell: ({ getValue }) => formatIssued(getValue()),
	}),
	h.accessor("amount", {
		size: 130,
		meta: { label: "Amount", align: "end", cellClassName: "tabular-nums font-medium" },
		header,
		cell: ({ getValue }) => currency.format(getValue()),
	}),
]);

export const PINNED = { columnPinning: { start: ["select", "id"], end: [] } };
