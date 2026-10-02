<script lang="ts">
import {
	createDataTable,
	DataTable,
	DataTableContent,
	DataTableSearch,
	DataTableToolbar,
	DataTableViewOptions,
} from "@baby-ui/svelte";
import { type ComponentProps, onMount } from "svelte";
import { fetchInvoicePage, type Invoice } from "../../data/data-table";
import { COLUMNS, PINNED } from "./columns";

let {
	variant,
	density,
}: Pick<ComponentProps<typeof DataTable>, "variant" | "density"> = $props();

let rows = $state.raw<Invoice[]>([]);
let hasMore = $state(true);
let fetching = $state(false);
let error = $state<unknown>();

function loadMore() {
	if (fetching) return;
	fetching = true;
	error = undefined;
	fetchInvoicePage(rows.length)
		.then((page) => {
			rows = [...rows, ...page.rows];
			hasMore = page.hasMore;
		})
		.catch((reason: unknown) => {
			error = reason;
		})
		.finally(() => {
			fetching = false;
		});
}

onMount(loadMore);

const table = createDataTable(() => ({
	data: rows,
	columns: COLUMNS,
	paginate: false,
	getRowId: (row) => row.id,
	initialState: PINNED,
}));
</script>

<DataTable
	{variant}
	{density}
	loading={fetching && rows.length === 0}
	fetching={fetching && rows.length > 0}
	{error}
	onretry={loadMore}
	{hasMore}
	onloadmore={loadMore}
>
	<DataTableToolbar>
		<DataTableSearch {table} placeholder="Search loaded rows…" />
		<DataTableViewOptions {table} />
	</DataTableToolbar>
	<DataTableContent {table} virtualize containerClass="max-h-[26rem]" />
	<p class="text-muted-foreground text-xs tabular-nums">
		{rows.length.toLocaleString()} of 1,000 loaded{hasMore ? ", scroll for more" : ""}.
	</p>
</DataTable>
