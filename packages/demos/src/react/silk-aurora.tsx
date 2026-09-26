"use client";

import { SilkAurora, type SilkAuroraSpeed, type SilkAuroraTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function SilkAuroraDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<SilkAurora
				position="absolute"
				tone={(props.tone as SilkAuroraTone) ?? "pearl"}
				speed={(props.speed as SilkAuroraSpeed) ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0.85)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</SilkAurora>
		</div>
	);
}
