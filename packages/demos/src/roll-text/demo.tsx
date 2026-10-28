"use client";

import { RollText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function RollTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RollText>>(props);
	const to = p.to || undefined;
	const groupHover = props.groupHover === true && to === undefined;
	const roll = (
		<RollText
			text={p.text || "Roll on hover"}
			to={to}
			groupHover={groupHover}
			disabled={props.disabled === true}
			stagger={p.stagger ?? "none"}
			staggerMs={Number(props.staggerMs ?? 32)}
			durationMs={Number(props.durationMs ?? 450)}
			size={p.size ?? "lg"}
			motion={p.motion ?? "slide"}
			className="font-semibold text-foreground"
		/>
	);
	if (!groupHover) return roll;
	return (
		<button
			type="button"
			data-roll-group
			className="rounded-lg border border-border px-6 py-4 text-left hover:bg-foreground/[0.06]"
		>
			{roll}
		</button>
	);
}
