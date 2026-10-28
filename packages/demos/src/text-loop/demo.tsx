"use client";

import { TextLoop } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const LOOP_ITEMS = ["Design", "Build", "Ship", "Iterate"];

export function TextLoopDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextLoop>>(props);
	return (
		<p className="max-w-4xl text-center font-light text-foreground text-lg tracking-tight sm:text-xl">
			<TextLoop
				items={LOOP_ITEMS}
				defaultIndex={Number(props.defaultIndex ?? 0)}
				intervalMs={Number(props.intervalMs ?? 1000)}
				durationMs={Number(props.durationMs ?? 300)}
				variant={p.variant ?? "slide"}
				direction={p.direction ?? "up"}
				size={p.size ?? "inherit"}
				className="font-medium"
			/>{" "}
			software that ships faster.
		</p>
	);
}
