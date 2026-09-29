"use client";

import { SilkAurora } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SilkAuroraDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SilkAurora>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<SilkAurora
				position="absolute"
				tone={p.tone ?? "pearl"}
				speed={p.speed ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0.85)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</SilkAurora>
		</div>
	);
}
