"use client";

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
} from "@baby-ui/react";

type Props = Record<string, unknown>;

const INVOICES = [
	{ invoice: "INV001", status: "Paid", method: "Credit card", amount: "$250.00" },
	{ invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
	{ invoice: "INV003", status: "Unpaid", method: "Bank transfer", amount: "$350.00" },
	{ invoice: "INV004", status: "Paid", method: "Credit card", amount: "$450.00" },
];

export function TableDemo({ props }: { props: Props }) {
	return (
		<Table density={props.density as TableDensity | undefined}>
			<TableCaption>A list of recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead>Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{INVOICES.map((row) => (
					<TableRow key={row.invoice}>
						<TableCell className="font-medium">{row.invoice}</TableCell>
						<TableCell>{row.status}</TableCell>
						<TableCell>{row.method}</TableCell>
						<TableCell className="text-right">{row.amount}</TableCell>
					</TableRow>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell colSpan={3}>Total</TableCell>
					<TableCell className="text-right">$1,200.00</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}
