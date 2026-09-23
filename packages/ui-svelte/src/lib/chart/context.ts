import type { ScaleLinear, ScaleTime } from "d3-scale";
import { getContext, setContext } from "svelte";
import type {
	ActivePoint,
	ChartConfigShape,
	ChartPhase,
	Datum,
	Formatters,
	Margin,
	SeriesConfig,
} from "./core";

export type ChartConfig = ChartConfigShape;

export interface ChartContextValue {
	readonly id: string;
	readonly config: ChartConfig;
	readonly format: Formatters;
	readonly title: string;
	readonly description: string | undefined;
	readonly hidden: ReadonlySet<string>;
	toggleSeries: (key: string) => void;
	highlighted: string | null;
}

export interface PlotContextValue {
	readonly data: Datum[];
	readonly xKey: string;
	readonly width: number;
	readonly height: number;
	readonly innerWidth: number;
	readonly innerHeight: number;
	readonly margin: Margin;
	readonly xScale: ScaleTime<number, number>;
	readonly yScale: ScaleLinear<number, number>;
	readonly x: (datum: Datum) => number;
	readonly labels: string[];
	readonly series: SeriesConfig[];
	register: (series: SeriesConfig) => () => void;
	readonly phase: ChartPhase;
	readonly animate: boolean;
	readonly clipId: string;
	readonly plotEl: HTMLDivElement | null;
}

export interface ActiveContextValue {
	readonly active: ActivePoint | null;
	/** True when the last move came from the keyboard, so followers jump instead of springing. */
	readonly instant: boolean;
}

const CHART = Symbol("chart");
const PLOT = Symbol("chart-plot");
const ACTIVE = Symbol("chart-active");

export function setChart(value: ChartContextValue) {
	setContext(CHART, value);
}

export function useChart(): ChartContextValue {
	const context = getContext<ChartContextValue | undefined>(CHART);
	if (!context) throw new Error("useChart must be used within a <ChartContainer />");
	return context;
}

export function setPlot(value: PlotContextValue) {
	setContext(PLOT, value);
}

export function usePlot(): PlotContextValue {
	const context = getContext<PlotContextValue | undefined>(PLOT);
	if (!context)
		throw new Error("Chart parts must be rendered inside a chart such as <LineChart />");
	return context;
}

export function setActivePoint(value: ActiveContextValue) {
	setContext(ACTIVE, value);
}

export function useActivePoint(): ActiveContextValue {
	return (
		getContext<ActiveContextValue | undefined>(ACTIVE) ?? { active: null, instant: false }
	);
}

/** Moves the node to `target`, so HTML overlays declared inside the SVG render in the plot. */
export function portal(target: HTMLElement) {
	return (node: HTMLElement) => {
		target.appendChild(node);
		return () => node.remove();
	};
}
