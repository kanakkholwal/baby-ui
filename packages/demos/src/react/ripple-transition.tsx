"use client";

import {
	RippleTransition,
	type RippleTransitionRadius,
	type RippleTransitionRings,
} from "@baby-ui/react";

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
	return (
		<RippleTransition
			images={IMAGES}
			duration={Number(props.duration ?? 1200)}
			rings={(props.rings as RippleTransitionRings) ?? "single"}
			radius={(props.radius as RippleTransitionRadius) ?? "xl"}
			label={(props.label as string) ?? "Show next image"}
			className="max-w-xl"
		/>
	);
}
