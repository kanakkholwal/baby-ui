"use client";

import {
	ChromaticWave,
	type ChromaticWaveSpeed,
	type ChromaticWaveTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ChromaticWaveDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<ChromaticWave
				position="absolute"
				tone={(props.tone as ChromaticWaveTone) ?? "spectrum"}
				speed={(props.speed as ChromaticWaveSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Every line in motion</p>
				</div>
			</ChromaticWave>
		</div>
	);
}
