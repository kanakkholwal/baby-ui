"use client";

import { GaugeChart } from "@baby-ui/react";

export function Example() {
	return (
		<div className="w-full max-w-sm">
			<GaugeChart
				value={64}
				label="Uptime"
				tone="scale"
				format={(v) => `${Math.round(v)}%`}
			/>
		</div>
	);
}
