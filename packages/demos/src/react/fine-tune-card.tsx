"use client";

import { FineTuneCard, type FineTuneField } from "@baby-ui/react";

type Props = Record<string, unknown>;

const FIELDS: FineTuneField[] = [
	{ key: "width", label: "W", value: 324, min: 40, max: 999 },
	{ key: "height", label: "H", value: 96, min: 24, max: 999 },
	{ key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
	{ key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
];

const OPTIONS = ["Primary", "Secondary", "Ghost"];

export function FineTuneCardDemo({ props }: { props: Props }) {
	return (
		<FineTuneCard
			fields={FIELDS}
			options={OPTIONS}
			labels={{ title: (props.title as string) || undefined }}
		/>
	);
}
