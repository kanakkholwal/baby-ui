"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const RUNTIMES = [
	{ value: "edge", label: "Edge runtime" },
	{ value: "node", label: "Node runtime" },
	{ value: "static", label: "Static export" },
	{ value: "hybrid", label: "Hybrid", disabled: true },
];

export function SelectDemo({ props }: { props: Props }) {
	const pValue = controlProps<ComponentProps<typeof SelectValue>>(props);
	const pContent = controlProps<ComponentProps<typeof SelectContent>>(props);
	const pTrigger = controlProps<ComponentProps<typeof SelectTrigger>>(props);
	const [value, setValue] = useState("edge");
	return (
		<div className="w-64">
			<Select
				value={value}
				onValueChange={setValue}
				items={RUNTIMES}
				size={pTrigger.size}
			>
				<SelectTrigger aria-label="Runtime" variant={pTrigger.variant}>
					<SelectValue placeholder={pValue.placeholder || "Select an option"} />
				</SelectTrigger>
				<SelectContent side={pContent.side ?? "bottom"}>
					{RUNTIMES.map((runtime) => (
						<SelectItem
							key={runtime.value}
							value={runtime.value}
							disabled={runtime.disabled}
						>
							{runtime.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
