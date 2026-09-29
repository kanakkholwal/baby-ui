"use client";

import { DitherGradient } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function DitherGradientDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DitherGradient>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<DitherGradient
				position="absolute"
				tone={p.tone ?? "spectrum"}
				matrix={p.matrix ?? "bayer4"}
				angle={p.angle ?? 45}
				speed={p.speed ?? 1}
				pixelSize={p.pixelSize ?? 3}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</DitherGradient>
		</div>
	);
}
