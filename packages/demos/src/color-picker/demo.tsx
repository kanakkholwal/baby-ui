"use client";

import { type ColorFormat, ColorPicker } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ColorPickerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ColorPicker>>(props);
	const [value, setValue] = useState("#7dd3fc");
	const [format, setFormat] = useState<ColorFormat>("hsv");
	useEffect(() => {
		if (p.value) setValue(p.value);
	}, [p.value]);
	useEffect(() => setFormat(p.format ?? "hsv"), [p.format]);
	// Recents live in the parent; the popover adds the colour it closed on.
	const [recent, setRecent] = useState<string[]>([]);
	return (
		<ColorPicker
			value={value}
			onValueChange={setValue}
			format={format}
			onFormatChange={setFormat}
			variant={p.variant ?? "field"}
			className={p.variant === "row" ? "max-w-64" : undefined}
			size={p.size ?? "default"}
			invalid={p.invalid ?? false}
			recent={recent}
			onOpenChange={(open) => {
				if (!open)
					setRecent((list) => [value, ...list.filter((c) => c !== value)].slice(0, 6));
			}}
			label={p.label || "Accent"}
		/>
	);
}
