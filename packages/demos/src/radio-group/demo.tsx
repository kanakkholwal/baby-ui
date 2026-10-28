"use client";

import { RadioGroup, RadioGroupItem } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const RADIO_OPTIONS = [
	{ value: "daily", label: "Daily digest" },
	{ value: "weekly", label: "Weekly summary" },
	{ value: "never", label: "Never" },
];

export function RadioGroupDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RadioGroup>>(props);
	const [value, setValue] = useState("weekly");
	return (
		<RadioGroup
			value={value}
			onValueChange={setValue}
			orientation={p.orientation ?? "vertical"}
			variant={p.variant ?? "default"}
			size={p.size ?? "default"}
			disabled={p.disabled ?? false}
			name="demo-radio"
		>
			{RADIO_OPTIONS.map((option) => (
				<RadioGroupItem key={option.value} value={option.value} label={option.label} />
			))}
		</RadioGroup>
	);
}
