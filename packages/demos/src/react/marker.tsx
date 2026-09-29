"use client";

import { Marker } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function MarkerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Marker>>(props);
	const variant = p.variant ?? "wavy";
	return (
		<p className="max-w-xl text-center font-light text-3xl text-foreground leading-relaxed tracking-tight">
			Ship interfaces that feel{" "}
			<Marker
				key={`${variant}-${props.tone}-${props.durationMs}-${props.delayMs}-${props.animate}`}
				variant={variant}
				tone={p.tone ?? "auto"}
				animate={props.animate !== false}
				durationMs={Number(props.durationMs ?? 700)}
				delayMs={Number(props.delayMs ?? 0)}
				className="font-medium"
			>
				hand-made
			</Marker>{" "}
			every time.
		</p>
	);
}
