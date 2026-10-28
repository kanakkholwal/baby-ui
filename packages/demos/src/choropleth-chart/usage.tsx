"use client";

import { ChoroplethChart, type GeoCollection } from "@baby-ui/react";
import { ChartContainer } from "@baby-ui/react/chart";

// Any GeoJSON FeatureCollection; world-atlas plus topojson-client is a common source.
declare const countries: GeoCollection;

const values = { France: 72, Germany: 64, Spain: 58, Italy: 49 };

export function Example() {
	return (
		<ChartContainer config={{}} title="Adoption by country" aspect="wide">
			<ChoroplethChart
				data={countries}
				values={values}
				projection="naturalEarth"
				zoomable
				labels={{ value: "Adoption" }}
			/>
		</ChartContainer>
	);
}
