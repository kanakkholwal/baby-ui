"use client";

import {
	DitheredLogo,
	type DitheredLogoSize,
	type DitheredLogoTone,
	type DitheredLogoVariant,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function DitheredLogoDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-2xl">
			<DitheredLogo
				src="https://cdn.simpleicons.org/svelte"
				alt="Svelte logo"
				variant={(props.variant as DitheredLogoVariant) ?? "solid"}
				tone={(props.tone as DitheredLogoTone) ?? "foreground"}
				size={(props.size as DitheredLogoSize) ?? "md"}
				gridSize={Number(props.gridSize ?? 96)}
				scale={Number(props.scale ?? 0.7)}
				dotScale={Number(props.dotScale ?? 0.8)}
				threshold={Number(props.threshold ?? 0.5)}
				blur={Number(props.blur ?? 1.5)}
				cornerRadius={Number(props.cornerRadius ?? 0.2)}
				radius={Number(props.radius ?? 100)}
			/>
		</div>
	);
}
