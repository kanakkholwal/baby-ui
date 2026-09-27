"use client";

import {
	LightCaustics,
	type LightCausticsSpeed,
	type LightCausticsTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function LightCausticsDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<LightCaustics
				position="absolute"
				tone={(props.tone as LightCausticsTone) ?? "ocean"}
				speed={(props.speed as LightCausticsSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Under the surface</p>
				</div>
			</LightCaustics>
		</div>
	);
}
