"use client";

import { MirrorText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function MirrorTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof MirrorText>>(props);
	return (
		<MirrorText
			key={String(props.durationMs ?? "") + String(props.staggerMs ?? "")}
			text={p.text || "This is a text"}
			direction={p.direction ?? "up"}
			durationMs={Number(props.durationMs ?? 500)}
			staggerMs={Number(props.staggerMs ?? 67)}
			className="text-4xl font-light uppercase"
		/>
	);
}
