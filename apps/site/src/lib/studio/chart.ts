import type { ComponentSpec, Framework } from "@baby-ui/registry-schema";

/** How a kind reads the studio's table: x plus series, labelled slices, rings, or radar axes. */
export type ChartShape = "series" | "slices" | "ring" | "radar";

type KindInfo = {
	slug: string;
	shape: ChartShape;
	/** The series part whose spec props ("Area: ...") go on each series, if the kind has one. */
	part?: string;
	/** Rows read as dates (true) or as category labels. */
	time?: boolean;
};

/** Kinds whose data the studio edits; every other chart previews on its own sample data. */
export const CHART_KINDS = {
	area: { slug: "area-chart", shape: "series", part: "Area", time: true },
	line: { slug: "line-chart", shape: "series", part: "Line", time: true },
	bar: { slug: "bar-chart", shape: "series", part: "Bar", time: false },
	scatter: { slug: "scatter-chart", shape: "series", part: "Scatter", time: true },
	pie: { slug: "pie-chart", shape: "slices" },
	funnel: { slug: "funnel-chart", shape: "slices" },
	ring: { slug: "ring-chart", shape: "ring" },
	radar: { slug: "radar-chart", shape: "radar", part: "RadarArea" },
} as const satisfies Record<string, KindInfo>;

export type ChartKind = keyof typeof CHART_KINDS;
export const CHART_KIND_LIST: ChartKind[] = [
	"area",
	"line",
	"bar",
	"scatter",
	"pie",
	"funnel",
	"ring",
	"radar",
];
export const isChartKind = (value: unknown): value is ChartKind =>
	typeof value === "string" && value in CHART_KINDS;

const info = (kind: ChartKind): KindInfo => CHART_KINDS[kind];

export type ChartSeries = { key: string; label: string };
export type ChartRow = { x: string; values: number[] };
export type ChartDataset = { title: string; series: ChartSeries[]; rows: ChartRow[] };

const table = (
	title: string,
	series: string[],
	rows: (string | number)[][],
): ChartDataset => ({
	title,
	series: series.map((label, i) => ({ key: seriesKey(label, i), label })),
	rows: rows.map(([x, ...values]) => ({ x: String(x), values: values.map(Number) })),
});

/** A starting table per shape; switching to a kind of another shape starts from its sample. */
export const SAMPLES: Record<ChartShape, ChartDataset> = {
	series: table(
		"Monthly revenue and profit",
		["Revenue", "Profit"],
		[
			["2026-01-01", 12400, 4500],
			["2026-02-01", 15100, 5200],
			["2026-03-01", 13800, 2100],
			["2026-04-01", 17900, 6800],
			["2026-05-01", 16200, 5600],
			["2026-06-01", 20400, 7900],
			["2026-07-01", 18700, 6100],
			["2026-08-01", 22300, 8400],
		],
	),
	slices: table(
		"Traffic by channel",
		["Visits"],
		[
			["Direct", 4280],
			["Search", 3150],
			["Social", 1890],
			["Email", 1240],
			["Referral", 760],
		],
	),
	ring: table(
		"Daily goals",
		["Value", "Max"],
		[
			["Move", 420, 600],
			["Exercise", 38, 45],
			["Stand", 9, 12],
		],
	),
	radar: table(
		"Player profiles",
		["Forward", "Midfielder"],
		[
			["Pace", 88, 72],
			["Shooting", 84, 68],
			["Passing", 70, 86],
			["Dribbling", 86, 78],
			["Defending", 38, 64],
			["Physical", 72, 70],
		],
	),
};

/** Series columns a shape can hold: slices one value, rings a value and a max. */
export const SHAPE_SERIES: Record<
	ChartShape,
	{ min: number; max: number; fixed?: string[] }
> = {
	series: { min: 1, max: 4 },
	slices: { min: 1, max: 1 },
	ring: { min: 2, max: 2, fixed: ["Value", "Max"] },
	radar: { min: 1, max: 4 },
};

export const shapeOf = (kind: ChartKind) => info(kind).shape;
export const isTime = (kind: ChartKind) => info(kind).time === true;
export const seriesPart = (kind: ChartKind) => info(kind).part;

/** Whether a table fits a shape's series limits, so a kind switch can keep the reader's data. */
export const fits = (dataset: ChartDataset, shape: ChartShape) =>
	dataset.series.length >= SHAPE_SERIES[shape].min &&
	dataset.series.length <= SHAPE_SERIES[shape].max;

// A spec prop whose description names a part ("Area: fill style.") goes on each series of
// that part; one naming another part ("ProfitLossLine: ...") belongs to a part the studio skips.
const PART = /^(\w+):/;

/** Splits dial values into chart-level and per-series props, by the spec's own wording. */
export function splitProps(
	spec: ComponentSpec,
	kind: ChartKind | undefined,
	values: Record<string, unknown>,
) {
	const chart: Record<string, unknown> = {};
	const series: Record<string, unknown> = {};
	for (const prop of spec.props) {
		const value = values[prop.name];
		if (value === undefined || value === "" || prop.control.kind === "none") continue;
		const part = prop.description.match(PART)?.[1];
		if (part && (!kind || part !== seriesPart(kind))) continue;
		(part ? series : chart)[prop.name] = normalise(prop.name, value);
	}
	return { chart, series };
}

// Dials hold "none"/"both" for fadeEdges and -1 for an unset dash index; components want
// a boolean and undefined.
function normalise(name: string, value: unknown): unknown {
	if (name === "fadeEdges")
		return value === "left" || value === "right" ? value : value !== "none";
	if (name === "dashFromIndex") return Number(value) >= 0 ? Number(value) : undefined;
	return value;
}

const MONTH = new Intl.DateTimeFormat("en", { month: "short", timeZone: "UTC" });

/** A category label for bar charts: dates read as their month, anything else as written. */
function category(x: string): string {
	const date = new Date(x);
	return /^\d{4}-\d{2}-\d{2}$/.test(x) && !Number.isNaN(date.getTime())
		? MONTH.format(date)
		: x;
}

/** A JS-safe key for a label: "Net revenue" becomes "netRevenue". */
export function seriesKey(label: string, index: number): string {
	const words = label.toLowerCase().match(/[a-z0-9]+/g) ?? [];
	const key = words.map((w, i) => (i ? w[0]?.toUpperCase() + w.slice(1) : w)).join("");
	return /^[a-z]/.test(key) ? key : `item${index + 1}`;
}

// Rows keyed by their label for slice, ring and radar shapes; duplicates get a suffix.
function rowKeys(dataset: ChartDataset): string[] {
	const seen = new Set<string>();
	return dataset.rows.map((row, i) => {
		let key = seriesKey(row.x, i);
		if (seen.has(key)) key = `${key}${i + 1}`;
		seen.add(key);
		return key;
	});
}

const color = (i: number) => `var(--chart-${(i % 5) + 1})`;

/** Cartesian rows: a Date under `date` for time charts, a label under `name` for bars. */
export const seriesData = (dataset: ChartDataset, kind: ChartKind) =>
	dataset.rows.map((row) => ({
		...(isTime(kind) ? { date: new Date(row.x) } : { name: category(row.x) }),
		...Object.fromEntries(dataset.series.map((s, i) => [s.key, row.values[i] ?? 0])),
	}));

/** Pie slices and rings: one row per label; rings carry their max as the second column. */
export const sliceData = (dataset: ChartDataset, ring: boolean) => {
	const keys = rowKeys(dataset);
	return dataset.rows.map((row, r) => ({
		name: keys[r] ?? "",
		value: row.values[0] ?? 0,
		...(ring ? { max: row.values[1] ?? 0 } : {}),
	}));
};

export const funnelData = (dataset: ChartDataset) =>
	dataset.rows.map((row) => ({ label: row.x, value: row.values[0] ?? 0 }));

/** Radar: rows are the axes, each series column one polygon. */
export const radarData = (dataset: ChartDataset) => {
	const keys = rowKeys(dataset);
	return {
		series: dataset.series.map((s, i) => ({
			key: s.key,
			label: s.label,
			values: Object.fromEntries(
				dataset.rows.map((row, r) => [keys[r] ?? "", row.values[i] ?? 0]),
			),
		})),
		metrics: dataset.rows.map((row, r) => ({ key: keys[r] ?? "", label: row.x })),
	};
};

/** Colours and labels: per series for cartesian and radar charts, per row for slices and rings. */
export function chartConfig(dataset: ChartDataset, shape: ChartShape) {
	if (shape === "series" || shape === "radar")
		return Object.fromEntries(
			dataset.series.map((s, i) => [s.key, { label: s.label, color: color(i) }]),
		);
	const keys = rowKeys(dataset);
	return Object.fromEntries(
		dataset.rows.map((row, i) => [keys[i] ?? "", { label: row.x, color: color(i) }]),
	);
}

/** Everything the copied code declares for a kind: data, config and radar's metrics. */
export function chartModel(dataset: ChartDataset, kind: ChartKind) {
	const shape = shapeOf(kind);
	const config = kind === "funnel" ? {} : chartConfig(dataset, shape);
	if (shape === "series") return { data: seriesData(dataset, kind), config, metrics: [] };
	if (shape === "radar") {
		const radar = radarData(dataset);
		return { data: radar.series, config, metrics: radar.metrics };
	}
	if (kind === "funnel") return { data: funnelData(dataset), config, metrics: [] };
	return { data: sliceData(dataset, shape === "ring"), config, metrics: [] };
}

/** Rows where a time chart can't read the date, by index, so the editor can flag them. */
export function badDates(dataset: ChartDataset, kind: ChartKind): Set<number> {
	if (!isTime(kind)) return new Set();
	return new Set(
		dataset.rows.flatMap((row, i) =>
			Number.isNaN(new Date(row.x).getTime()) ? [i] : [],
		),
	);
}

/** Header row of names, then one row per point; the first column is the x value. */
export function parseCsv(text: string, maxSeries: number): ChartDataset | null {
	const lines = text
		.trim()
		.split(/\r?\n/)
		.map((line) => line.split(",").map((cell) => cell.trim()));
	const [head, ...body] = lines;
	if (!head || head.length < 2 || body.length === 0) return null;
	const labels = head.slice(1, 1 + maxSeries);
	return {
		title: "",
		series: labels.map((label, i) => ({ key: seriesKey(label, i), label })),
		rows: body.map(([x = "", ...values]) => ({
			x,
			values: labels.map((_, i) => Number(values[i]) || 0),
		})),
	};
}

const literal = (value: unknown) =>
	typeof value === "string" ? JSON.stringify(value) : `{${JSON.stringify(value)}}`;
const attrs = (props: Record<string, unknown>, framework: Framework) =>
	Object.entries(props)
		.filter(([, value]) => value !== undefined)
		.map(([name, value]) =>
			value === true && framework === "react" ? ` ${name}` : ` ${name}=${literal(value)}`,
		)
		.join("");
// Source text for a value: bare keys, dates as constructor calls, one line per object.
function js(value: unknown): string {
	if (value instanceof Date)
		return `new Date(${JSON.stringify(value.toISOString().slice(0, 10))})`;
	if (Array.isArray(value)) return `[${value.map(js).join(", ")}]`;
	if (value && typeof value === "object")
		return `{ ${Object.entries(value)
			.map(
				([key, item]) =>
					`${/^[A-Za-z_$][\w$]*$/.test(key) ? key : JSON.stringify(key)}: ${js(item)}`,
			)
			.join(", ")} }`;
	return JSON.stringify(value);
}

type Template = {
	kindParts: string[];
	chartParts: string[];
	body: string[];
	extra?: string[];
};

function template(
	kind: ChartKind,
	dataset: ChartDataset,
	chart: string,
	series: string,
	model: ReturnType<typeof chartModel>,
): Template {
	const legend = "<ChartLegend />";
	if (kind === "pie" || kind === "ring") {
		const tag = kind === "pie" ? "PieChart" : "RingChart";
		return {
			kindParts: [tag],
			chartParts: ["type ChartConfig", "ChartContainer", "ChartLegend"],
			body: [`<${tag} data={data}${chart} />`, legend],
		};
	}
	if (kind === "funnel")
		return {
			kindParts: ["FunnelChart"],
			chartParts: ["ChartContainer"],
			body: [`<FunnelChart data={data}${chart} />`],
		};
	if (kind === "radar")
		return {
			kindParts: [
				"RadarArea",
				"RadarAxis",
				"RadarChart",
				"RadarGrid",
				"RadarLabels",
				"RadarTooltip",
			],
			chartParts: ["type ChartConfig", "ChartContainer", "ChartLegend"],
			extra: ["", `const metrics = ${js(model.metrics)};`],
			body: [
				`<RadarChart data={data} metrics={metrics}${chart}>`,
				"\t<RadarGrid />",
				"\t<RadarAxis />",
				"\t<RadarLabels />",
				...dataset.series.map((_, i) => `\t<RadarArea index={${i}}${series} />`),
				"\t<RadarTooltip />",
				"</RadarChart>",
				legend,
			],
		};
	const bar = kind === "bar";
	const k = {
		area: ["Area", "AreaChart"],
		line: ["Line", "LineChart"],
		bar: ["Bar", "BarChart"],
		scatter: ["Scatter", "ScatterChart"],
	}[kind];
	const [part = "", root = ""] = k;
	return {
		kindParts: bar ? [part, root, "BarTooltip", "BarXAxis", "BarYAxis"] : [part, root],
		chartParts: [
			"CartesianGrid",
			"type ChartConfig",
			"ChartContainer",
			"ChartLegend",
			...(bar ? [] : ["ChartTooltip", "XAxis", "YAxis"]),
		],
		body: [
			`<${root} data={data}${chart}>`,
			"\t<CartesianGrid />",
			...(bar ? ["\t<BarTooltip />"] : ["\t<YAxis />", "\t<XAxis />"]),
			...dataset.series.map((s) => `\t<${part} dataKey="${s.key}"${series} />`),
			...(bar
				? ["\t<BarXAxis />", "\t<BarYAxis />"]
				: [`\t<ChartTooltip${kind === "scatter" ? " dots={false}" : ""} />`]),
			`</${root}>`,
			legend,
		],
	};
}

/** The chart as copyable code: imports from the reader's registry paths, data inline. */
export function chartCode({
	framework,
	kind,
	dataset,
	chart,
	series,
	paths,
}: {
	framework: Framework;
	kind: ChartKind;
	dataset: ChartDataset;
	chart: Record<string, unknown>;
	series: Record<string, unknown>;
	paths: { kind: string; chart: string };
}): string {
	const model = chartModel(dataset, kind);
	const t = template(
		kind,
		dataset,
		attrs(chart, framework),
		attrs(series, framework),
		model,
	);
	const dataRows = model.data.map((row) => `\t${js(row)},`);
	const hasConfig = t.chartParts.includes("type ChartConfig");
	const title = dataset.title ? ` title=${JSON.stringify(dataset.title)}` : "";
	const square = shapeOf(kind) === "series" ? "" : ' aspect="square"';
	const body = (indent: string) =>
		[
			`<ChartContainer config={${hasConfig ? "config" : "{}"}}${title}${square}>`,
			...t.body.map((line) => `\t${line}`),
			"</ChartContainer>",
		].map((line) => indent + line);
	const imports = [
		`import { ${t.kindParts.join(", ")} } from "${paths.kind}";`,
		`import { ${t.chartParts.join(", ")} } from "${paths.chart}";`,
	];
	const declarations = [
		"const data = [",
		...dataRows,
		"];",
		...(t.extra ?? []),
		...(hasConfig
			? [
					"",
					"const config = {",
					...Object.entries(model.config).map(
						([key, value]) => `\t${key}: ${js(value)},`,
					),
					"} satisfies ChartConfig;",
				]
			: []),
	];
	if (framework === "react")
		return [
			...imports,
			"",
			...declarations,
			"",
			"export function Example() {",
			"\treturn (",
			...body("\t\t"),
			"\t);",
			"}",
			"",
		].join("\n");
	return [
		'<script lang="ts">',
		...imports,
		"",
		...declarations,
		"</script>",
		"",
		...body(""),
		"",
	].join("\n");
}
