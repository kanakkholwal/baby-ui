"use client";

import { LightRays } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function LightRaysDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LightRays>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl bg-background">
			<LightRays
				position="absolute"
				variant={p.variant ?? "soft"}
				tone={p.tone ?? "primary"}
				speed={p.speed ?? "normal"}
				intensity={p.intensity ?? 1}
				count={p.count}
				seed={p.seed ?? 34}
			>
				<div className="grid size-full place-items-center">
					<p className="font-medium text-2xl text-foreground tracking-tight">
						Built on baby ui
					</p>
				</div>
			</LightRays>
		</div>
	);
}
