"use client";

import { MorphText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const MORPH_WORDS = ["fast", "fluid", "alive"];

export function MorphTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MorphText>>(props);
	return (
		<p className="max-w-4xl text-center font-light text-2xl text-foreground tracking-tight sm:text-4xl">
			Build software that feels{" "}
			<MorphText
				words={MORPH_WORDS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 3000)}
				subtext={p.subtext || undefined}
				size={p.size ?? "inherit"}
				className="font-semibold"
			/>
		</p>
	);
}
