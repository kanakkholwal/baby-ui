"use client";

import {
	SplitFlapDisplay,
	type SplitFlapIndicator,
	type SplitFlapSize,
	type SplitFlapVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";
import { departuresBoard, departuresLine } from "../data/departures";

type Props = Record<string, unknown>;

export function SplitFlapDisplayDemo({ props }: { props: Props }) {
	const [tick, setTick] = useState(0);
	const columns = Number(props.columns ?? 24);

	useEffect(() => {
		const id = setInterval(() => setTick((t) => t + 1), 6000);
		return () => clearInterval(id);
	}, []);

	return (
		<div className="w-full">
			<SplitFlapDisplay
				value={
					props.layout === "line" ? departuresLine(tick) : departuresBoard(tick, columns)
				}
				columns={columns}
				variant={(props.variant as SplitFlapVariant) ?? "solid"}
				size={(props.size as SplitFlapSize) ?? "md"}
				indicator={(props.indicator as SplitFlapIndicator) ?? "success"}
				stepMs={Number(props.stepMs ?? 60)}
				staggerMs={Number(props.staggerMs ?? 30)}
			/>
		</div>
	);
}
