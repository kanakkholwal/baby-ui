<script lang="ts">
import {
	createDataTable,
	createDataTableWorker,
	DataTable,
	DataTableContent,
	DataTableSearch,
	DataTableToolbar,
	DataTableViewOptions,
} from "@baby-ui/svelte";
import { type ComponentProps, onDestroy } from "svelte";
import { invoices } from "../../data/data-table";
import { COLUMNS, PINNED } from "./columns";

let {
	variant,
	density,
}: Pick<ComponentProps<typeof DataTable>, "variant" | "density"> = $props();

// Sorting and searching 10,000 rows runs in a worker, so the page never stalls.
const worker = createDataTableWorker(
	() => new Worker(new URL("./invoices.worker.ts", import.meta.url), { type: "module" }),
);
onDestroy(() => worker?.terminate());

const data = invoices();
const table = createDataTable(() => ({
	data,
	columns: COLUMNS,
	paginate: false,
	worker,
	getRowId: (row) => row.id,
	initialState: PINNED,
}));

const shown = $derived(table.getRowModel().rows.length);
const selected = $derived(Object.keys(table.atoms.rowSelection.get()).length);
</script>

<DataTable {variant} {density}>
	<DataTableToolbar>
		<DataTableSearch {table} placeholder="Search 10,000 invoices…" />
		<DataTableViewOptions {table} />
	</DataTableToolbar>
	<DataTableContent {table} virtualize containerClass="max-h-[26rem]" />
	<p class="text-muted-foreground text-xs tabular-nums">
		{shown.toLocaleString()} rows{selected > 0 ? `, ${selected.toLocaleString()} selected` : ""}.
		Sorting and search run in a worker; only the rows in view are in the DOM.
	</p>
</DataTable>
