"use client";

import { PixelCanvas } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function PixelCanvasDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PixelCanvas>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<PixelCanvas
				position="absolute"
				variant={p.variant ?? "default"}
				tone={p.tone ?? "spectrum"}
				gap={Number(p.gap ?? 8)}
				decay={Number(p.decay ?? 0.04)}
				radius={Number(p.radius ?? 90)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</PixelCanvas>
		</div>
	);
}
