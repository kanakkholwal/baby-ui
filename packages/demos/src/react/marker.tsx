"use client";

import { Marker, type MarkerTone, type MarkerVariant } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function MarkerDemo({ props }: { props: Props }) {
	const variant = (props.variant as MarkerVariant) ?? "wavy";
	return (
		<p className="max-w-xl text-center font-light text-3xl text-foreground leading-relaxed tracking-tight">
			Ship interfaces that feel{" "}
			<Marker
				key={`${variant}-${props.tone}-${props.durationMs}-${props.delayMs}-${props.animate}`}
				variant={variant}
				tone={(props.tone as MarkerTone) ?? "auto"}
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
