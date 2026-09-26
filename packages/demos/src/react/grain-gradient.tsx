"use client";

import { GrainGradient, type GrainGradientTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function GrainGradientDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<GrainGradient
				position="absolute"
				tone={(props.tone as GrainGradientTone) ?? "spectrum"}
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
