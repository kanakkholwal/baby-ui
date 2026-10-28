"use client";

import { ToggleGroup, ToggleGroupItem } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { ALIGNMENTS, TEXT_MARKS } from "../data/toggle";

type Props = Record<string, unknown>;

export function ToggleGroupDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ToggleGroup>>(props);
	const type = p.type ?? "single";
	// One choice suits alignment; formatting marks combine.
	const multiple = type === "multiple";
	const glyphs = multiple ? TEXT_MARKS : ALIGNMENTS;
	const [value, setValue] = useState<string | string[]>(multiple ? ["bold"] : "left");
	useEffect(() => setValue(multiple ? ["bold"] : "left"), [multiple]);
	return (
		<ToggleGroup
			value={value}
			onValueChange={setValue}
			type={type}
			variant={p.variant ?? "default"}
			size={p.size ?? "default"}
			disabled={p.disabled ?? false}
			label={multiple ? "Text formatting" : "Text alignment"}
		>
			{glyphs.map((glyph) => (
				<ToggleGroupItem
					key={glyph.value}
					value={glyph.value}
					aria-label={glyph.label}
					className="aspect-square px-0"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden>
						<path
							d={glyph.path}
							stroke="currentColor"
							strokeWidth="1.4"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</ToggleGroupItem>
			))}
		</ToggleGroup>
	);
}
