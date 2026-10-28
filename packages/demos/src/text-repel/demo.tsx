"use client";

import { TextRepel } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TextRepelDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextRepel>>(props);
	return (
		<div className="px-6 py-10 font-semibold text-3xl text-foreground tracking-tight">
			<TextRepel
				text={p.text || "Move your cursor here"}
				mode={p.mode ?? "repel"}
				radius={Number(props.radius ?? 120)}
				strength={Number(props.strength ?? 45)}
				size={p.size ?? "inherit"}
			/>
		</div>
	);
}
