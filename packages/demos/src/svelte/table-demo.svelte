<script lang="ts">
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	type TableDensity,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const INVOICES = [
	{ invoice: "INV001", status: "Paid", method: "Credit card", amount: "$250.00" },
	{ invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
	{ invoice: "INV003", status: "Unpaid", method: "Bank transfer", amount: "$350.00" },
	{ invoice: "INV004", status: "Paid", method: "Credit card", amount: "$450.00" },
];
</script>

<Table density={props.density as TableDensity | undefined}>
	<TableCaption>A list of recent invoices.</TableCaption>
	<TableHeader>
		<TableRow>
			<TableHead>Invoice</TableHead>
			<TableHead>Status</TableHead>
			<TableHead>Method</TableHead>
			<TableHead class="text-right">Amount</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each INVOICES as row (row.invoice)}
			<TableRow>
				<TableCell class="font-medium">{row.invoice}</TableCell>
				<TableCell>{row.status}</TableCell>
				<TableCell>{row.method}</TableCell>
				<TableCell class="text-right">{row.amount}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
	<TableFooter>
		<TableRow>
			<TableCell colspan={3}>Total</TableCell>
			<TableCell class="text-right">$1,200.00</TableCell>
		</TableRow>
	</TableFooter>
</Table>
