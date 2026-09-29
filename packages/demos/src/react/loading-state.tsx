"use client";

import { LoadingState } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const SURFER_VIDEO =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/subway-surfers.mp4";

export function LoadingStateDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LoadingState>>(props);
	const variant = p.variant ?? "drive";
	return (
		<LoadingState
			variant={variant}
			label={p.label || undefined}
			videoSrc={variant === "surfer" ? SURFER_VIDEO : undefined}
		/>
	);
}
