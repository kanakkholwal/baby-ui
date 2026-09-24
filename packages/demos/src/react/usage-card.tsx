"use client";

import { UsageCard, type UsageCardLayout } from "@baby-ui/react";
import { GOALS, GOALS_CONFIG } from "../data/channels";

type Props = Record<string, unknown>;

export function UsageCardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-sm">
			<UsageCard
				title="Today's rings"
				description="Move, exercise and stand goals"
				data={GOALS}
				config={GOALS_CONFIG}
				layout={(props.layout as UsageCardLayout) ?? "side"}
			/>
		</div>
	);
}
