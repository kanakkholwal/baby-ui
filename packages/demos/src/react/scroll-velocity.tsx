"use client";

import {
	ScrollVelocity,
	type ScrollVelocityDirection,
	type ScrollVelocityLayout,
	type ScrollVelocitySize,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ScrollVelocityDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-2xl py-6">
			<ScrollVelocity
				text={(props.text as string) || "Scroll to speed me up"}
				layout={(props.layout as ScrollVelocityLayout) ?? "double"}
				direction={(props.direction as ScrollVelocityDirection) ?? "left"}
				durationS={Number(props.durationS ?? 30)}
				boost={Number(props.boost ?? 5)}
				size={(props.size as ScrollVelocitySize) ?? "md"}
			/>
		</div>
	);
}
