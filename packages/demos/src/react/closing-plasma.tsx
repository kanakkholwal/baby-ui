"use client";

import { ClosingPlasma } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ClosingPlasmaDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ClosingPlasma>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<ClosingPlasma
				position="absolute"
				tone={p.tone ?? "chart"}
				speed={p.speed ?? "normal"}
				turbulence={p.turbulence ?? 1}
				sparkle={p.sparkle ?? 1}
				grain={p.grain ?? 1}
				interactive={p.interactive ?? true}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</ClosingPlasma>
		</div>
	);
}
