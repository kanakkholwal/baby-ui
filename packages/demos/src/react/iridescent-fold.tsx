"use client";

import { IridescentFold } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function IridescentFoldDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof IridescentFold>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<IridescentFold
				position="absolute"
				variant={p.variant ?? "foil"}
				tone={p.tone ?? "holo"}
				speed={p.speed ?? "normal"}
				intensity={Number(props.intensity ?? 1)}
				grain={Number(props.grain ?? 0)}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Folded light</p>
				</div>
			</IridescentFold>
		</div>
	);
}
