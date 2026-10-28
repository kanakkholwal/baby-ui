"use client";

import { ClickSpark } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ClickSparkDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ClickSpark>>(props);
	return (
		<div className="relative grid h-56 w-full max-w-md place-items-center overflow-hidden rounded-2xl border border-border border-dashed text-muted-foreground text-sm">
			Click anywhere in here
			<ClickSpark
				scope="parent"
				tone={p.tone ?? "foreground"}
				count={Number(p.count ?? 8)}
				size={Number(p.size ?? 10)}
				radius={Number(p.radius ?? 15)}
				durationMs={Number(p.durationMs ?? 400)}
			/>
		</div>
	);
}
