"use client";

import { AuroraFlow } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AuroraFlowDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AuroraFlow>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<AuroraFlow
				position="absolute"
				tone={p.tone ?? "chart"}
				speed={p.speed ?? "normal"}
				intensity={p.intensity ?? 1}
				grain={p.grain ?? 0.22}
				direction={p.direction ?? -18}
				interactive={p.interactive ?? true}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</AuroraFlow>
		</div>
	);
}
