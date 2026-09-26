"use client";

import {
	ParticleText,
	type ParticleTextShape,
	type ParticleTextSize,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ParticleTextDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-2xl">
			<ParticleText
				text={(props.text as string) || "baby ui"}
				shape={(props.shape as ParticleTextShape) ?? "circle"}
				size={(props.size as ParticleTextSize) ?? "md"}
				fontSize={Number(props.fontSize ?? 120)}
				density={Number(props.density ?? 6)}
				particleSize={Number(props.particleSize ?? 1.5)}
				strength={Number(props.strength ?? 15)}
				radius={Number(props.radius ?? 120)}
			/>
		</div>
	);
}
