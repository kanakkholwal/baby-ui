"use client";

import { AuroraFlow, type AuroraFlowSpeed, type AuroraFlowTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function AuroraFlowDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<AuroraFlow
				position="absolute"
				tone={(props.tone as AuroraFlowTone) ?? "chart"}
				speed={(props.speed as AuroraFlowSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0.22)}
				direction={Number(props.direction ?? -18)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</AuroraFlow>
		</div>
	);
}
