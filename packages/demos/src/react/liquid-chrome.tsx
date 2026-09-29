"use client";

import { LiquidChrome } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function LiquidChromeDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LiquidChrome>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<LiquidChrome
				position="absolute"
				tone={p.tone ?? "chrome"}
				speed={p.speed ?? "normal"}
				amplitude={Number(props.amplitude ?? 0.6)}
				interactive={props.interactive !== false}
			>
				<div className="grid size-full place-items-center">
					<p className="font-semibold text-2xl text-foreground">Built on baby ui</p>
				</div>
			</LiquidChrome>
		</div>
	);
}
