"use client";

import { DiaText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const DIA_WORDS = ["fast.", "focused.", "effortlessly smooth."];

export function DiaTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DiaText>>(props);
	return (
		<p className="max-w-4xl text-center font-light text-3xl text-foreground tracking-tight sm:text-4xl">
			Make interfaces feel{" "}
			<DiaText
				text={DIA_WORDS}
				repeat
				durationMs={Number(props.durationMs ?? 1500)}
				delayMs={Number(props.delayMs ?? 0)}
				repeatDelayMs={Number(props.repeatDelayMs ?? 500)}
				fixedWidth={Boolean(props.fixedWidth ?? false)}
				size={p.size ?? "inherit"}
			/>
		</p>
	);
}
