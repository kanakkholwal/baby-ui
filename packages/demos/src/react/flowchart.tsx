"use client";

import { Flowchart, type FlowchartBackground, type StepNode } from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

const PURPLE = "#9a5cff";
const AMBER = "#f09a2f";

const SEED_STEPS: StepNode[] = [
	{
		id: "trigger",
		row: 0,
		x: 0.5,
		w: 300,
		hue: PURPLE,
		kindLabel: "Trigger",
		title: "New order created",
		caption: "Trigger when a new order is created",
	},
	{
		id: "cond",
		row: 1,
		x: 0.5,
		w: 356,
		hue: AMBER,
		kindLabel: "If / Else",
		conditions: [
			{
				id: "row1",
				connector: "If",
				source: "order",
				property: "flavor",
				propertyOptions: [
					{ value: "flavor", label: "flavor" },
					{ value: "topping", label: "topping" },
					{ value: "size", label: "size" },
				],
				value: "rocky-road",
				valueOptions: [
					{ value: "rocky-road", label: "Rocky Road", tag: "Classic" },
					{ value: "mint-chip", label: "Mint Chip", tag: "Classic" },
					{ value: "pistachio", label: "Pistachio", tag: "Seasonal" },
				],
				dot: true,
			},
			{
				id: "row2",
				connector: "and",
				source: "order",
				property: "topping",
				propertyOptions: [
					{ value: "flavor", label: "flavor" },
					{ value: "topping", label: "topping" },
					{ value: "size", label: "size" },
				],
				value: "sprinkles",
				valueOptions: [
					{ value: "sprinkles", label: "Rainbow sprinkles" },
					{ value: "fudge", label: "Hot fudge" },
					{ value: "pecans", label: "Candied pecans" },
				],
				dot: true,
			},
		],
	},
];

const EDGES = [{ from: "trigger", to: "cond" }];

export function FlowchartDemo({ props }: { props: Props }) {
	const [steps, setSteps] = useState<StepNode[]>(() => structuredClone(SEED_STEPS));

	function handleConditionChange(
		nodeId: string,
		rowId: string,
		field: "property" | "value",
		value: string,
	) {
		setSteps((current) =>
			current.map((node) =>
				node.id !== nodeId || !node.conditions
					? node
					: {
							...node,
							conditions: node.conditions.map((row) =>
								row.id === rowId ? { ...row, [field]: value } : row,
							),
						},
			),
		);
	}

	return (
		<Flowchart
			steps={steps}
			edges={EDGES}
			background={(props.background as FlowchartBackground) || undefined}
			onConditionChange={handleConditionChange}
		/>
	);
}
