"use client";

import { ChromaticWave } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ChromaticWaveDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ChromaticWave>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<ChromaticWave
				position="absolute"
				tone={p.tone ?? "spectrum"}
				speed={p.speed ?? "normal"}
				intensity={p.intensity ?? 1}
				grain={p.grain ?? 0}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Every line in motion</p>
				</div>
			</ChromaticWave>
		</div>
	);
}
