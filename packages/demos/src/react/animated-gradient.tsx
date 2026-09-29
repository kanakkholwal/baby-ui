"use client";

import { AnimatedGradient } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AnimatedGradientDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AnimatedGradient>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<AnimatedGradient
				position="absolute"
				tone={p.tone ?? "spectrum"}
				duration={p.duration ?? 20}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</AnimatedGradient>
		</div>
	);
}
