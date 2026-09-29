"use client";

import { type DiffRow, DiffTable } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const ROWS: DiffRow[] = [
	{
		key: "rocky",
		label: "Rocky Road",
		category: "Classic",
		detail: "aurora-scoops",
		change: "removed",
	},
	{
		key: "bubblegum",
		label: "Bubblegum",
		category: "Retro",
		detail: "kumo-creamery",
		change: "removed",
	},
	{
		key: "pistachio",
		label: "Pistachio",
		category: "Seasonal",
		detail: "maple-orbit",
		change: "added",
	},
];

export function DiffTableDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DiffTable>>(props);
	return <DiffTable title={p.title || undefined} rows={ROWS} className="max-w-md" />;
}
