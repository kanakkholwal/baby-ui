<script lang="ts">
import {
	createDataTable,
	DataTable,
	DataTableColumnHeader,
	DataTableContent,
	DataTablePagination,
	DataTableSearch,
	DataTableToolbar,
	DataTableViewOptions,
	dataTableColumns,
	dataTableSelectColumn,
	renderComponent,
} from "@baby-ui/svelte";

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
		header: ({ column }) =>
			renderComponent(DataTableColumnHeader<Payment, string>, { column }),
	}),
	h.accessor("amount", {
		meta: { label: "Amount", align: "end" },
		header: ({ column }) =>
			renderComponent(DataTableColumnHeader<Payment, number>, { column }),
		cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
	}),
]);

const table = createDataTable(() => ({
	data: PAYMENTS,
	columns: COLUMNS,
	getRowId: (row) => row.id,
}));
</script>

<DataTable>
	<DataTableToolbar>
		<DataTableSearch {table} />
		<DataTableViewOptions {table} />
	</DataTableToolbar>
	<DataTableContent {table} />
	<DataTablePagination {table} />
</DataTable>
