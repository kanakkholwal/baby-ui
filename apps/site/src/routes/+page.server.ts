import { cardItems } from "$lib/server/registry";
import type { PageServerLoad } from "./$types";

/** The showcase grid: one live panel per area, none repeating the hero. */
const GRID = [
	"area-chart",
	"text-loop",
	"task-rows",
	"webgl-liquid",
	"circuit-board",
	"week-calendar",
];

export const load: PageServerLoad = () => ({ grid: cardItems(GRID) });
