"use client";

import { type GeoCollection, StatCardMap } from "@baby-ui/react";

export function Example({ countries }: { countries: GeoCollection }) {
	return (
		<StatCardMap
			title="Visitors"
			geo={countries}
			values={{ Brazil: 1840, India: 3120, Japan: 960 }}
			value={5920}
			label="All countries"
			trend={8.4}
		/>
	);
}
