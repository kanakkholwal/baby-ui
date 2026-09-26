"use client";

import {
	SpectralRibbon,
	type SpectralRibbonSpeed,
	type SpectralRibbonTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function SpectralRibbonDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<SpectralRibbon
				position="absolute"
				tone={(props.tone as SpectralRibbonTone) ?? "spectrum"}
				speed={(props.speed as SpectralRibbonSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				thickness={Number(props.thickness ?? 1)}
				grain={Number(props.grain ?? 0.45)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</SpectralRibbon>
		</div>
	);
}
