"use client";

import { UnderlineHoverText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function UnderlineHoverTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof UnderlineHoverText>>(props);
	return (
		<p className="text-2xl text-foreground">
			Every{" "}
			<UnderlineHoverText
				variant={p.variant ?? "sweep"}
				tone={p.tone ?? "default"}
				trigger={p.trigger ?? "hover"}
				durationMs={Number(props.durationMs ?? 500)}
			>
				component
			</UnderlineHoverText>{" "}
			ships in both ports.
		</p>
	);
}
