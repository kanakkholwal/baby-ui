"use client";

import {
	ClosingPlasma,
	type ClosingPlasmaSpeed,
	type ClosingPlasmaTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ClosingPlasmaDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<ClosingPlasma
				position="absolute"
				tone={(props.tone as ClosingPlasmaTone) ?? "chart"}
				speed={(props.speed as ClosingPlasmaSpeed) ?? "normal"}
				turbulence={Number(props.turbulence ?? 1)}
				sparkle={Number(props.sparkle ?? 1)}
				grain={Number(props.grain ?? 1)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</ClosingPlasma>
		</div>
	);
}
