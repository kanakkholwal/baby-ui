"use client";

import {
	Badge,
	createDataTableWorker,
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
import { type ComponentProps, useEffect, useState } from "react";
import {
	currency,
	fetchInvoicePage,
	formatIssued,
	INVOICE_STATUS,
	type Invoice,
	type InvoiceQuery,
	invoices,
	queryInvoices,
} from "../data/data-table";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
type Style = Pick<ComponentProps<typeof DataTable>, "variant" | "density">;
type SortState = { id: string; desc: boolean }[];

const h = dataTableColumns<Invoice>();

const COLUMNS = h.columns([
	dataTableSelectColumn<Invoice>(),
	h.accessor("id", {
		size: 120,
		meta: { label: "Invoice" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ getValue }) => (
			<span className="font-mono text-muted-foreground">{getValue()}</span>
		),
	}),
	h.accessor("customer", {
		size: 220,
		meta: { label: "Customer" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ row }) => (
			<div className="flex min-w-0 flex-col">
				<span className="truncate font-medium">{row.original.customer}</span>
				<span className="truncate text-muted-foreground text-xs">
					{row.original.email}
				</span>
			</div>
		),
	}),
	h.accessor("status", {
		size: 120,
		meta: { label: "Status" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ getValue }) => {
			const status = INVOICE_STATUS[getValue()];
			return (
				<Badge size="sm" variant={status.variant}>
					{status.label}
				</Badge>
			);
		},
	}),
	h.accessor("plan", {
		size: 130,
		meta: { label: "Plan" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
	}),
	h.accessor("region", {
		size: 130,
		meta: { label: "Region", cellClassName: "font-mono text-xs text-muted-foreground" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
	}),
	h.accessor("issued", {
		size: 130,
		meta: { label: "Issued" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ getValue }) => formatIssued(getValue()),
	}),
	h.accessor("amount", {
		size: 130,
		meta: { label: "Amount", align: "end", cellClassName: "tabular-nums font-medium" },
		header: ({ column }) => <DataTableColumnHeader column={column} />,
		cell: ({ getValue }) => currency.format(getValue()),
	}),
]);

const PINNED = { columnPinning: { start: ["select", "id"], end: [] } };

function VirtualTable(style: Style) {
	// Sorting and searching 10,000 rows runs in a worker, so the page never stalls.
	const [worker] = useState(() =>
		createDataTableWorker(
			() =>
				new Worker(new URL("./invoices.worker.ts", import.meta.url), { type: "module" }),
		),
	);
	useEffect(() => () => worker?.terminate(), [worker]);
	const [data] = useState(invoices);
	const table = useDataTable({
		data,
		columns: COLUMNS,
		paginate: false,
		worker,
		getRowId: (row) => row.id,
		initialState: PINNED,
	});
	const shown = table.getRowModel().rows.length;
	const selected = Object.keys(table.store.get().rowSelection).length;
	return (
		<DataTable {...style}>
			<DataTableToolbar>
				<DataTableSearch table={table} placeholder="Search 10,000 invoices…" />
				<DataTableViewOptions table={table} />
			</DataTableToolbar>
			<DataTableContent table={table} virtualize containerClassName="max-h-[26rem]" />
			<p className="text-muted-foreground text-xs tabular-nums">
				{shown.toLocaleString()} rows
				{selected > 0 && `, ${selected.toLocaleString()} selected`}. Sorting and search
				run in a worker; only the rows in view are in the DOM.
			</p>
		</DataTable>
	);
}

function ServerTable({
	simulate,
	...style
}: Style & { simulate: InvoiceQuery["simulate"] }) {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 20 });
	const [sorting, setSorting] = useState<SortState>([]);
	const [globalFilter, setGlobalFilter] = useState("");
	const [result, setResult] = useState<{ rows: Invoice[]; total: number } | null>(null);
	const [fetching, setFetching] = useState(true);
	const [error, setError] = useState<unknown>();
	const [attempt, setAttempt] = useState(0);

	useEffect(() => {
		let live = true;
		setFetching(true);
		setError(undefined);
		queryInvoices({
			...pagination,
			sort: sorting[0],
			search: globalFilter,
			// A retry succeeds, so the error state can be dismissed.
			simulate: attempt === 0 ? simulate : "normal",
		})
			.then((next) => live && setResult(next))
			.catch((reason: unknown) => live && setError(reason))
			.finally(() => live && setFetching(false));
		return () => {
			live = false;
		};
	}, [pagination, sorting, globalFilter, simulate, attempt]);

	const table = useDataTable({
		data: result?.rows ?? [],
		columns: COLUMNS,
		getRowId: (row) => row.id,
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		rowCount: result?.total ?? 0,
		initialState: PINNED,
		state: { pagination, sorting, globalFilter },
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: (updater) => {
			setGlobalFilter(updater);
			setPagination((page) => ({ ...page, pageIndex: 0 }));
		},
	});

	return (
		<DataTable
			{...style}
			loading={fetching && result === null}
			fetching={fetching && result !== null}
			error={error}
			onRetry={() => setAttempt((n) => n + 1)}
		>
			<DataTableToolbar>
				<DataTableSearch table={table} placeholder="Search on the server…" />
				<DataTableViewOptions table={table} />
			</DataTableToolbar>
			<DataTableContent table={table} containerClassName="max-h-[26rem]" />
			<DataTablePagination table={table} />
		</DataTable>
	);
}

function InfiniteTable(style: Style) {
	const [rows, setRows] = useState<Invoice[]>([]);
	const [hasMore, setHasMore] = useState(true);
	const [fetching, setFetching] = useState(false);
	const [error, setError] = useState<unknown>();

	const loadMore = () => {
		if (fetching) return;
		setFetching(true);
		setError(undefined);
		fetchInvoicePage(rows.length)
			.then((page) => {
				setRows((prev) => [...prev, ...page.rows]);
				setHasMore(page.hasMore);
			})
			.catch((reason: unknown) => setError(reason))
			.finally(() => setFetching(false));
	};

	useEffect(loadMore, []);

	const table = useDataTable({
		data: rows,
		columns: COLUMNS,
		paginate: false,
		getRowId: (row) => row.id,
		initialState: PINNED,
	});

	return (
		<DataTable
			{...style}
			loading={fetching && rows.length === 0}
			fetching={fetching && rows.length > 0}
			error={error}
			onRetry={loadMore}
			hasMore={hasMore}
			onLoadMore={loadMore}
		>
			<DataTableToolbar>
				<DataTableSearch table={table} placeholder="Search loaded rows…" />
				<DataTableViewOptions table={table} />
			</DataTableToolbar>
			<DataTableContent table={table} virtualize containerClassName="max-h-[26rem]" />
			<p className="text-muted-foreground text-xs tabular-nums">
				{rows.length.toLocaleString()} of 1,000 loaded{hasMore ? ", scroll for more" : ""}
				.
			</p>
		</DataTable>
	);
}

export function DataTableDemo({ props }: { props: Props }) {
	const p = controlProps<Style>(props);
	const style: Style = {
		variant: p.variant ?? "default",
		density: p.density ?? "comfortable",
	};
	const simulate =
		props.simulate === "error" || props.simulate === "empty" ? props.simulate : "normal";
	return (
		<div className="w-full max-w-5xl">
			{props.layout === "server" ? (
				<ServerTable key={simulate} simulate={simulate} {...style} />
			) : props.layout === "infinite" ? (
				<InfiniteTable {...style} />
			) : (
				<VirtualTable {...style} />
			)}
		</div>
	);
}
