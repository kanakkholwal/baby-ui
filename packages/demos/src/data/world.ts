import type { FeatureCollection, Geometry } from "geojson";
import { feature } from "topojson-client";
import countries from "world-atlas/countries-110m.json";

type GeoCollection = FeatureCollection<Geometry, Record<string, unknown> | null>;
type Topology = Parameters<typeof feature>[0];
const topology = countries as unknown as Topology;

/** Natural Earth 110m country outlines from world-atlas (ISC). */
export const WORLD = feature(
	topology,
	topology.objects.countries as Parameters<typeof feature>[1],
) as unknown as GeoCollection;

function hash(text: string) {
	let h = 2166136261;
	for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
	return h >>> 0;
}

/** Deterministic sample index per country; about one in seven has no data. */
export const WORLD_VALUES: Record<string, number> = Object.fromEntries(
	WORLD.features.flatMap((f) => {
		const name = String(f.properties?.name ?? "");
		const h = hash(name);
		return h % 7 === 0 ? [] : [[name, 12 + (h % 880) / 10]];
	}),
);
