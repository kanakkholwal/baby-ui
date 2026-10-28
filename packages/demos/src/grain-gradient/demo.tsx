"use client";

import { GrainGradient } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function GrainGradientDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GrainGradient>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<GrainGradient
				position="absolute"
				tone={p.tone ?? "spectrum"}
				angle={Number(props.angle ?? 0)}
				grain={Number(props.grain ?? 0.35)}
				grainSize={Number(props.grainSize ?? 1)}
				duration={Number(props.duration ?? 12)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</GrainGradient>
		</div>
	);
}
