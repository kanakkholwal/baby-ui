"use client";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@baby-ui/react";

const INVOICES = [
	{ invoice: "INV001", status: "Paid", amount: "$250.00" },
	{ invoice: "INV002", status: "Pending", amount: "$150.00" },
];

export function Example() {
	return (
		<Table density="compact">
			<TableCaption>A list of recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{INVOICES.map((row) => (
					<TableRow key={row.invoice}>
						<TableCell className="font-medium">{row.invoice}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell className="text-right">{row.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
