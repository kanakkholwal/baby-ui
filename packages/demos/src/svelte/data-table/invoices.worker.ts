import { initDataTableWorker } from "@baby-ui/svelte/data-table/worker";
import type { Invoice } from "../../data/data-table";

// Same ids as the demo's columns; renderers stay on the main thread.
initDataTableWorker<Invoice>([
	{ id: "select" },
	{ accessorKey: "id" },
	{ accessorKey: "customer" },
	{ accessorKey: "status" },
	{ accessorKey: "plan" },
	{ accessorKey: "region" },
	{ accessorKey: "issued" },
	{ accessorKey: "amount" },
]);
