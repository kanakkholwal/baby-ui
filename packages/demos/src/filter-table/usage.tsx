"use client";

import { FilterTable } from "@baby-ui/react";

export function Example() {
	return (
		<FilterTable
			rows={[
				{
					task: "Restock mango sorbet",
					date: "Dec 03",
					status: "todo",
					owner: "Mango Moon Gelato",
				},
				{
					task: "Order waffle cones",
					date: "Apr 14",
					status: "done",
					owner: "Aurora Scoops",
				},
			]}
		/>
	);
}
