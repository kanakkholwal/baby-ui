"use client";

import { AsciiEffect } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function AsciiEffectDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof AsciiEffect>>(props);
	return (
		<div className="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
			<AsciiEffect
				position="absolute"
				src="https://picsum.photos/id/1025/800/600"
				alt="A pug wrapped in a blanket"
				variant={p.variant ?? "image"}
				tone={p.tone ?? "mono"}
				dither={p.dither ?? "floyd-steinberg"}
				fit={p.fit ?? "cover"}
				chars={p.chars || " .:-=+*#%@"}
				fontSize={p.fontSize ?? 10}
				contrast={p.contrast ?? 1.1}
				brightness={p.brightness ?? 1.2}
				invert={p.invert ?? false}
				speed={p.speed ?? 1}
			/>
		</div>
	);
}
