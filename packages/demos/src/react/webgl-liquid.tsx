"use client";

import { WebglLiquid } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function WebglLiquidDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof WebglLiquid>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<WebglLiquid
				position="absolute"
				tone={p.tone ?? "ocean"}
				speed={p.speed ?? "normal"}
				flow={Number(props.flow ?? 1)}
				grain={Number(props.grain ?? 0.05)}
				reveal={props.reveal !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</WebglLiquid>
		</div>
	);
}
