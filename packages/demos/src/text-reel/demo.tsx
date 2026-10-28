"use client";

import { TextReel } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { REEL_ITEMS } from "../data/obsidian";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function TextReelDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof TextReel>>(props);
	return (
		<TextReel
			items={REEL_ITEMS}
			prefix={p.prefix || "We"}
			speed={Number(p.speed ?? 0.6)}
			paused={p.paused ?? false}
			orientation={p.orientation ?? "vertical"}
			size={p.size ?? "default"}
			className="w-full"
		/>
	);
}
