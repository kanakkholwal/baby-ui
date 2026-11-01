"use client";

import {
	LoadingState,
	LoadingStateElapsed,
	LoadingStateIndicator,
	LoadingStateLabel,
	TextLoop,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A label can cycle what the agent is doing: compose TextLoop inside it.
const PHRASES = ["Reading the brief", "Searching the docs", "Drafting the answer"];

export function LoadingStateDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LoadingState>>(props);
	return (
		<div className="flex flex-col gap-4">
			<LoadingState variant={p.variant ?? "drive"}>
				<LoadingStateIndicator />
				<LoadingStateLabel>Churning</LoadingStateLabel>
				<LoadingStateElapsed />
			</LoadingState>
			<LoadingState variant={p.variant ?? "drive"}>
				<LoadingStateIndicator />
				<LoadingStateLabel>
					<TextLoop items={PHRASES} variant="roll" intervalMs={2200} />
				</LoadingStateLabel>
				<LoadingStateElapsed />
			</LoadingState>
		</div>
	);
}
