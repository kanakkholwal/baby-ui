"use client";

import { AnimatedGradient, type AnimatedGradientTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function AnimatedGradientDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<AnimatedGradient
				position="absolute"
				tone={(props.tone as AnimatedGradientTone) ?? "spectrum"}
				duration={Number(props.duration ?? 20)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</AnimatedGradient>
		</div>
	);
}
