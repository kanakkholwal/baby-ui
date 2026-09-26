"use client";

import {
	SplitFlapDisplay,
	type SplitFlapIndicator,
	type SplitFlapSize,
	type SplitFlapVariant,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function SplitFlapDisplayDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-full justify-center">
			<SplitFlapDisplay
				value={(props.value as string) ?? "DEPARTURES"}
				columns={Number(props.columns ?? 14)}
				variant={(props.variant as SplitFlapVariant) ?? "solid"}
				size={(props.size as SplitFlapSize) ?? "md"}
				indicator={(props.indicator as SplitFlapIndicator) ?? "success"}
				stepMs={Number(props.stepMs ?? 60)}
				staggerMs={Number(props.staggerMs ?? 30)}
			/>
		</div>
	);
}
