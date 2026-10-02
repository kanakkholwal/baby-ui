<script lang="ts">
import {
	createDataTable,
	DataTable,
	DataTableContent,
	DataTablePagination,
	DataTableSearch,
	DataTableToolbar,
	DataTableViewOptions,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { type Invoice, type InvoiceQuery, queryInvoices } from "../../data/data-table";
import { COLUMNS, PINNED } from "./columns";

let {
	variant,
	density,
	simulate = "normal",
}: Pick<ComponentProps<typeof DataTable>, "variant" | "density"> & {
	simulate?: InvoiceQuery["simulate"];
} = $props();

let pagination = $state({ pageIndex: 0, pageSize: 20 });
let sorting = $state<{ id: string; desc: boolean }[]>([]);
let globalFilter = $state("");
let result = $state.raw<{ rows: Invoice[]; total: number } | null>(null);
let fetching = $state(true);
let error = $state<unknown>();
let attempt = $state(0);

$effect(() => {
	let live = true;
	fetching = true;
	error = undefined;
	queryInvoices({
		...pagination,
		sort: sorting[0],
		search: globalFilter,
		// A retry succeeds, so the error state can be dismissed.
		simulate: attempt === 0 ? simulate : "normal",
	})
		.then((next) => {
			if (live) result = next;
		})
		.catch((reason: unknown) => {
			if (live) error = reason;
		})
		.finally(() => {
			if (live) fetching = false;
		});
	return () => {
		live = false;
	};
});

const table = createDataTable(() => ({
	data: result?.rows ?? [],
	columns: COLUMNS,
	getRowId: (row) => row.id,
	manualPagination: true,
	manualSorting: true,
	manualFiltering: true,
	rowCount: result?.total ?? 0,
	initialState: PINNED,
	state: { pagination, sorting, globalFilter },
	onPaginationChange: (updater) => {
		pagination = typeof updater === "function" ? updater(pagination) : updater;
	},
	onSortingChange: (updater) => {
		sorting = typeof updater === "function" ? updater(sorting) : updater;
	},
	onGlobalFilterChange: (updater) => {
		globalFilter = typeof updater === "function" ? updater(globalFilter) : updater;
		pagination = { ...pagination, pageIndex: 0 };
	},
}));
</script>

<DataTable
	{variant}
	{density}
	loading={fetching && result === null}
	fetching={fetching && result !== null}
	{error}
	onretry={() => attempt++}
>
	<DataTableToolbar>
		<DataTableSearch {table} placeholder="Search on the server…" />
		<DataTableViewOptions {table} />
	</DataTableToolbar>
	<DataTableContent {table} containerClass="max-h-[26rem]" />
	<DataTablePagination {table} />
</DataTable>
