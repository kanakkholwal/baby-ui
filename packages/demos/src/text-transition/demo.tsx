"use client";

import { TextTransition } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TextTransitionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextTransition>>(props);
	return (
		<TextTransition
			key={
				(p.variant ?? "blur-out-up") +
				String(props.durationMs ?? "") +
				String(props.staggerMs ?? "")
			}
			text={p.text || "Ship it in seconds"}
			variant={p.variant ?? "blur-out-up"}
			durationMs={props.durationMs === undefined ? undefined : Number(props.durationMs)}
			staggerMs={props.staggerMs === undefined ? undefined : Number(props.staggerMs)}
			className="text-3xl font-semibold text-foreground"
		/>
	);
}
