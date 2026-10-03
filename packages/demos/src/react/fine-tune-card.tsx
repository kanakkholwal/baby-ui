"use client";

import { FineTuneCard, type FineTuneField } from "@baby-ui/react";

type Props = Record<string, unknown>;
type ElementKind = "button" | "card";

const ELEMENTS: Record<ElementKind, FineTuneField[]> = {
	button: [
		{ key: "width", value: 324, min: 40, max: 999 },
		{ key: "height", value: 96, min: 24, max: 999 },
		{ key: "radius", value: 28, min: 0, max: 64 },
		{ key: "opacity", value: 100, min: 0, max: 100 },
	],
	card: [
		{ key: "width", value: 480, min: 40, max: 999 },
		{ key: "height", value: 220, min: 24, max: 999 },
		{ key: "radius", value: 12, min: 0, max: 64 },
		{ key: "opacity", value: 88, min: 0, max: 100 },
	],
};

const OPTIONS = ["Primary", "Secondary", "Ghost"];

/** `id`/`element` swap proves uncontrolled edits reset on a new subject, not carry over. */
export function FineTuneCardDemo({ props }: { props: Props }) {
	const element: ElementKind = props.element === "card" ? "card" : "button";
	const title = typeof props.title === "string" ? props.title : "";
	return (
		<FineTuneCard
			id={element}
			fields={ELEMENTS[element]}
			options={OPTIONS}
			labels={{ title: title || undefined }}
		/>
	);
}
