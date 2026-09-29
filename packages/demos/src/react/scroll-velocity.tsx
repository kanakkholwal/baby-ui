"use client";

import { ScrollVelocity } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ScrollVelocityDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ScrollVelocity>>(props);
	return (
		<div className="w-full max-w-2xl py-6">
			<ScrollVelocity
				text={p.text || "Scroll to speed me up"}
				layout={p.layout ?? "double"}
				direction={p.direction ?? "left"}
				durationS={Number(props.durationS ?? 30)}
				boost={Number(props.boost ?? 5)}
				size={p.size ?? "md"}
			/>
		</div>
	);
}
