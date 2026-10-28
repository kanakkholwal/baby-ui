"use client";

import { ShimmerText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ShimmerTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ShimmerText>>(props);
	return (
		<div className="text-lg">
			<ShimmerText
				text="Agent is thinking ..."
				durationMs={Number(props.durationMs ?? 2000)}
				spread={Number(props.spread ?? 2)}
				active={p.active ?? true}
				variant={p.variant}
				size={p.size ?? "inherit"}
				className="font-light tracking-tight"
			/>
		</div>
	);
}
