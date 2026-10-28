"use client";

import { GlitchText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function GlitchTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GlitchText>>(props);
	return (
		<GlitchText
			text={p.text || "Glitch"}
			size={p.size ?? "default"}
			intensity={Number(props.intensity ?? 5)}
			durationSeconds={Number(props.durationSeconds ?? 2.5)}
			baseColor={p.baseColor || undefined}
			colorA={p.colorA || undefined}
			colorB={p.colorB || undefined}
			blendMode={p.blendMode ?? "screen"}
			className="text-foreground"
		/>
	);
}
