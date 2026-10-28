"use client";

import { AnimatedGradientText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AnimatedGradientTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AnimatedGradientText>>(props);
	return (
		<AnimatedGradientText
			as="h2"
			tone={p.tone ?? "primary"}
			durationSeconds={Number(props.durationSeconds ?? 3)}
			className="text-3xl font-semibold sm:text-4xl"
		>
			Ship it in seconds
		</AnimatedGradientText>
	);
}
