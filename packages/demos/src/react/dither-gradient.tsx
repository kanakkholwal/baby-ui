"use client";

import {
	DitherGradient,
	type DitherGradientMatrix,
	type DitherGradientTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function DitherGradientDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<DitherGradient
				position="absolute"
				tone={(props.tone as DitherGradientTone) ?? "spectrum"}
				matrix={(props.matrix as DitherGradientMatrix) ?? "bayer4"}
				angle={Number(props.angle ?? 45)}
				speed={Number(props.speed ?? 1)}
				pixelSize={Number(props.pixelSize ?? 3)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</DitherGradient>
		</div>
	);
}
