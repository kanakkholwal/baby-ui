"use client";

import { TypingText } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TypingTextDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TypingText>>(props);
	return (
		<TypingText
			key={String(props.smooth ?? "") + String(props.stumbles ?? "")}
			text={p.text || "Creates a typing effect for given text"}
			delay={Number(props.delay ?? 32)}
			repeat={props.repeat !== false}
			waitMs={Number(props.waitMs ?? 1000)}
			smooth={props.smooth === true}
			fadeDurationMs={Number(props.fadeDurationMs ?? 300)}
			grow={props.grow === true}
			hideCursorOnComplete={props.hideCursorOnComplete === true}
			stumbles={props.stumbles === true}
			size={p.size ?? "default"}
			className="text-foreground"
		/>
	);
}
