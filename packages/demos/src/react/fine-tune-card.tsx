"use client";

import { FineTuneCard, type FineTuneField } from "@baby-ui/react";

type Props = Record<string, unknown>;
type ElementKind = "button" | "card";

const ELEMENTS: Record<ElementKind, FineTuneField[]> = {
	button: [
		{ key: "width", label: "W", value: 324, min: 40, max: 999 },
		{ key: "height", label: "H", value: 96, min: 24, max: 999 },
		{ key: "radius", label: "Radius", value: 28, min: 0, max: 64 },
		{ key: "opacity", label: "Opacity", value: 100, min: 0, max: 100, suffix: "%" },
	],
	card: [
		{ key: "width", label: "W", value: 480, min: 40, max: 999 },
		{ key: "height", label: "H", value: 220, min: 24, max: 999 },
		{ key: "radius", label: "Radius", value: 12, min: 0, max: 64 },
		{ key: "opacity", label: "Opacity", value: 88, min: 0, max: 100, suffix: "%" },
	],
};

const OPTIONS = ["Primary", "Secondary", "Ghost"];

/** `id`/`element` swap proves uncontrolled edits reset on a new subject, not carry over. */
export function FineTuneCardDemo({ props }: { props: Props }) {
	const element: ElementKind = props.element === "card" ? "card" : "button";
	return (
		<FineTuneCard
			id={element}
			fields={ELEMENTS[element]}
			options={OPTIONS}
			labels={{ title: (props.title as string) || undefined }}
		/>
	);
}
