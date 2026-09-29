"use client";

import { RippleTransition } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const IMAGES = [
	{
		src: "https://picsum.photos/id/1018/1200/900",
		alt: "Mountain valley under a clear sky",
	},
	{ src: "https://picsum.photos/id/1043/1200/900", alt: "Forest path in soft light" },
	{ src: "https://picsum.photos/id/1036/1200/900", alt: "Snowy peaks at dusk" },
];

export function RippleTransitionDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RippleTransition>>(props);
	return (
		<RippleTransition
			images={IMAGES}
			duration={Number(p.duration ?? 1200)}
			rings={p.rings ?? "single"}
			radius={p.radius ?? "xl"}
			label={p.label ?? "Show next image"}
			className="max-w-xl"
		/>
	);
}
