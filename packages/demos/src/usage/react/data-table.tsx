"use client";

import {
	DataTable,
	DataTableColumnHeader,
	DataTableContent,
	DataTablePagination,
	DataTableSearch,
	DataTableToolbar,
	DataTableViewOptions,
	dataTableColumns,
	dataTableSelectColumn,
	useDataTable,
} from "@baby-ui/react";

type Payment = { id: string; email: string; amount: number };

const PAYMENTS: Payment[] = [
	{ id: "pay_1", email: "ada@example.com", amount: 316 },
	{ id: "pay_2", email: "grace@example.com", amount: 242 },
	{ id: "pay_3", email: "alan@example.com", amount: 837 },
];

const h = dataTableColumns<Payment>();

const COLUMNS = h.columns([
	dataTableSelectColumn<Payment>(),
	h.accessor("email", {
		meta: { label: "Email" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
	}),
	h.accessor("amount", {
		meta: { label: "Amount", align: "end" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
	}),
]);

export function Example() {
	const table = useDataTable({
		data: PAYMENTS,
		columns: COLUMNS,
		getRowId: (row) => row.id,
	});
	return (
		<DataTable>
			<DataTableToolbar>
				<DataTableSearch table={table} />
				<DataTableViewOptions table={table} />
			</DataTableToolbar>
			<DataTableContent table={table} />
			<DataTablePagination table={table} />
		</DataTable>
	);
}
