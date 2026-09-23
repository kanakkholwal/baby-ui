<script lang="ts">
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@baby-ui/svelte";

const INVOICES = [
	{ invoice: "INV001", status: "Paid", amount: "$250.00" },
	{ invoice: "INV002", status: "Pending", amount: "$150.00" },
];
</script>

<Table density="compact">
	<TableCaption>A list of recent invoices.</TableCaption>
	<TableHeader>
		<TableRow>
			<TableHead>Invoice</TableHead>
			<TableHead>Status</TableHead>
			<TableHead class="text-right">Amount</TableHead>
		</TableRow>
	</TableHeader>
	<TableBody>
		{#each INVOICES as row (row.invoice)}
			<TableRow>
				<TableCell class="font-medium">{row.invoice}</TableCell>
				<TableCell>{row.status}</TableCell>
				<TableCell class="text-right">{row.amount}</TableCell>
			</TableRow>
		{/each}
	</TableBody>
</Table>
