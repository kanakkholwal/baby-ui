"use client";

import { LoadingState, type LoadingStateVariant } from "@baby-ui/react";

type Props = Record<string, unknown>;

const SURFER_VIDEO =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/subway-surfers.mp4";

export function LoadingStateDemo({ props }: { props: Props }) {
	const variant = (props.variant as LoadingStateVariant) ?? "drive";
	return (
		<LoadingState
			variant={variant}
			label={(props.label as string) || undefined}
			videoSrc={variant === "surfer" ? SURFER_VIDEO : undefined}
		/>
	);
}
