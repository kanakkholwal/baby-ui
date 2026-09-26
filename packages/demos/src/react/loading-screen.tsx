"use client";

import {
	LoadingScreen,
	type LoadingScreenIndicator,
	type LoadingScreenLogoMotion,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

function Mark() {
	return (
		<svg viewBox="0 0 24 24" aria-hidden>
			<path
				fill="currentColor"
				d="M3 3.5A2.5 2.5 0 0 1 8 3.5V16H3ZM8.5 9H15.5A5.5 5.5 0 0 1 21 14.5V17.5A5.5 5.5 0 0 1 15.5 23H8.5A5.5 5.5 0 0 1 3 17.5V14.5A5.5 5.5 0 0 1 8.5 9ZM10.2 14.4A1.6 1.6 0 1 0 10.2 17.6A1.6 1.6 0 1 0 10.2 14.4ZM14.2 14.4A1.6 1.6 0 1 0 14.2 17.6A1.6 1.6 0 1 0 14.2 14.4Z"
			/>
		</svg>
	);
}

export function LoadingScreenDemo({ props }: { props: Props }) {
	return (
		<div className="relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-border">
			<LoadingScreen
				position="absolute"
				logo={<Mark />}
				open={props.open !== false}
				indicator={(props.indicator as LoadingScreenIndicator) ?? "bar"}
				logoMotion={(props.logoMotion as LoadingScreenLogoMotion) ?? "breathe"}
				label={(props.label as string) || "Loading"}
			/>
		</div>
	);
}
