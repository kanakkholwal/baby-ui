"use client";

import { GibberishText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function GibberishTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GibberishText>>(props);
	return (
		<GibberishText
			key={p.text || "Gibberish"}
			text={p.text || "Gibberish"}
			speedMs={Number(props.speedMs ?? 24)}
			size={p.size ?? "lg"}
			className="text-foreground"
		/>
	);
}
