import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import {
	chartStyleCss,
	evenTickIndices,
	interpolatePoints,
	nearestIndex,
	nextPhase,
	resolveDomain,
	shouldTweenDomain,
} from "../packages/ui-react/src/chart/core.ts";
import { cubicBezier, Spring, tween } from "../packages/ui-react/src/chart/motion.ts";

const SHARED = ["core.ts", "motion.ts"];

test("shared chart files are byte-identical across ports", async () => {
	for (const file of SHARED) {
		const react = await readFile(`packages/ui-react/src/chart/${file}`, "utf8");
		const svelte = await readFile(`packages/ui-svelte/src/lib/chart/${file}`, "utf8");
		assert.equal(svelte, react, file);
	}
});

test("cubicBezier matches the CSS curve at its endpoints and midpoint", () => {
	const ease = cubicBezier(0.85, 0, 0.15, 1);
	assert.equal(ease(0), 0);
	assert.equal(ease(1), 1);
	assert.ok(Math.abs(ease(0.5) - 0.5) < 1e-4);
	assert.ok(ease(0.25) < 0.1, "slow start");
	const linear = cubicBezier(0.25, 0.25, 0.75, 0.75);
	assert.ok(Math.abs(linear(0.3) - 0.3) < 1e-4);
});

test("tween settles synchronously at zero duration", () => {
	const seen = [];
	let done = false;
	tween({ duration: 0, onUpdate: (p) => seen.push(p), onComplete: () => (done = true) });
	assert.deepEqual(seen, [1]);
	assert.ok(done);
});

test("spring settles on target and keeps velocity across a retarget", async () => {
	const values = [];
	const spring = new Spring(0, { stiffness: 300, damping: 30 }, (v) => values.push(v));
	spring.set(100);
	await new Promise((r) => setTimeout(r, 80));
	const mid = spring.value;
	assert.ok(mid > 0 && mid < 100, `moving at 80ms: ${mid}`);
	spring.set(0);
	await new Promise((r) => setTimeout(r, 20));
	assert.ok(spring.value > mid - 40, "no jump back on retarget");
	await new Promise((r) => setTimeout(r, 1200));
	assert.equal(values.at(-1), 0);
});

test("underdamped spring overshoots by bklit's documented amount", async () => {
	let peak = 0;
	const spring = new Spring(
		0,
		{ stiffness: 400, damping: 20 },
		(v) => (peak = Math.max(peak, v)),
	);
	spring.set(100);
	await new Promise((r) => setTimeout(r, 900));
	assert.ok(peak > 112 && peak < 120, `peak ${peak}, expected ~116.3`);
});

test("resolveDomain follows bklit's headroom rules", () => {
	assert.deepEqual(resolveDomain([{ a: 10 }, { a: 90 }], ["a"]), [0, 100]);
	const mixed = resolveDomain([{ a: -50 }, { a: 50 }], ["a"]);
	assert.ok(mixed[0] <= -55 && mixed[1] >= 55);
	assert.deepEqual(resolveDomain([], ["a"]), [0, 100]);
});

test("shouldTweenDomain skips sub-2% moves", () => {
	assert.equal(shouldTweenDomain([0, 100], [0, 101]), false);
	assert.equal(shouldTweenDomain([0, 100], [0, 120]), true);
});

test("interpolatePoints grows new points from a neighbour", () => {
	const from = [{ key: "1", x: 0, y: 0 }];
	const to = [
		{ key: "1", x: 10, y: 10 },
		{ key: "2", x: 20, y: 20 },
	];
	const half = interpolatePoints(from, to, 0.5);
	assert.deepEqual(half[0], { key: "1", x: 5, y: 5 });
	assert.deepEqual(half[1], { key: "2", x: 10, y: 10 });
});

test("nearestIndex snaps to the closer datum", () => {
	const data = [{ d: 0 }, { d: 10 }, { d: 20 }];
	assert.equal(nearestIndex(data, "d", 4), 0);
	assert.equal(nearestIndex(data, "d", 6), 1);
	assert.equal(nearestIndex(data, "d", 99), 2);
});

test("evenTickIndices keeps both ends and dedupes labels", () => {
	const ticks = evenTickIndices(
		30,
		5,
		(i) => i * 10,
		(i) => String(i),
	);
	assert.equal(ticks[0], 0);
	assert.equal(ticks.at(-1), 29);
	assert.ok(ticks.length >= 4 && ticks.length <= 6);
	const deduped = evenTickIndices(
		10,
		5,
		(i) => i,
		(i) => String(Math.floor(i / 5)),
	);
	assert.equal(new Set(deduped.map((i) => Math.floor(i / 5))).size, deduped.length);
});

test("phase machine walks bklit's lifecycle", () => {
	assert.equal(nextPhase("loading", "status-ready"), "gridTweenReady");
	assert.equal(nextPhase("gridTweenReady", "done"), "revealing");
	assert.equal(nextPhase("revealing", "done"), "ready");
	assert.equal(nextPhase("ready", "status-loading"), "concealing");
	assert.equal(nextPhase("concealing", "done"), "gridTweenLoading");
	assert.equal(nextPhase("gridTweenLoading", "done"), "loading");
	assert.equal(nextPhase("ready", "status-ready"), null);
});

test("chartStyleCss scopes light and dark colours to the chart id", () => {
	const css = chartStyleCss("c1", {
		revenue: { color: "var(--chart-1)" },
		profit: { theme: { light: "#000", dark: "#fff" } },
	});
	assert.match(
		css,
		/\[data-chart=c1\] \{\n {2}--color-revenue: var\(--chart-1\);\n {2}--color-profit: #000;/,
	);
	assert.match(css, /\.dark \[data-chart=c1\] \{[^}]*--color-profit: #fff;/);
});

test("sunburst and funnel geometry are shared verbatim and lay out correctly", async () => {
	for (const dir of ["sunburst-chart", "funnel-chart"]) {
		for (const file of ["geometry.ts", "variants.ts"]) {
			const react = await readFile(`packages/ui-react/src/${dir}/${file}`, "utf8");
			const svelte = await readFile(`packages/ui-svelte/src/lib/${dir}/${file}`, "utf8");
			assert.equal(svelte, react, `${dir}/${file}`);
		}
	}
	const sb = await import("../packages/ui-react/src/sunburst-chart/geometry.ts");
	const tree = {
		name: "root",
		children: [
			{
				name: "a",
				children: [
					{ name: "a1", value: 3 },
					{ name: "a2", value: 1 },
				],
			},
			{ name: "b", value: 4 },
		],
	};
	const layout = sb.buildLayout(tree);
	assert.equal(layout.total, 8);
	assert.equal(layout.maxDepth, 2);
	const a = layout.arcs.find((arc) => arc.id === "root / a");
	assert.ok(Math.abs(a.a1 - a.a0 - Math.PI) < 1e-9, "a is half the circle");
	assert.equal(sb.buildLayout(tree, new Set(["b"])).total, 4);
	const { delays } = sb.enterDelays(layout.arcs);
	assert.equal(delays.get("root / a / a1"), 120);
	const focus = layout.focusById.get("root / a");
	const g = sb.geometryFor(
		layout.arcs.find((arc) => arc.id === "root / a / a1"),
		focus,
		2,
		100,
		false,
	);
	assert.ok(Math.abs(g.a1 - g.a0 - 1.5 * Math.PI) < 1e-9, "zoom rescales a1 to 3/4 turn");
	const mid = sb.lerpGeometry(
		{ a0: 3, a1: 3.2, innerR: 0, outerR: 10 },
		{ a0: -3.1, a1: -2.9, innerR: 0, outerR: 10 },
		0.5,
	);
	assert.ok(Math.abs(mid.a0 + mid.a1) > 6, "lerps the short way across pi");
	const fn = await import("../packages/ui-react/src/funnel-chart/geometry.ts");
	const cells = fn.funnelCells(
		[
			{ label: "x", value: 100 },
			{ label: "y", value: 25 },
		],
		204,
		100,
		4,
		3,
		true,
		false,
	);
	assert.equal(cells[1].offset, 104);
	assert.equal(cells[1].ratio, 0.25);
	assert.equal(
		fn.stageColor(0, 5, {}),
		"color-mix(in oklch, var(--chart-scale-5) 100%, var(--chart-scale-2))",
	);
	assert.equal(
		fn.stageColor(4, 5, {}),
		"color-mix(in oklch, var(--chart-scale-5) 0%, var(--chart-scale-2))",
	);
});

test("heatmap calendar and sankey layout are shared verbatim and lay out correctly", async () => {
	for (const file of [
		"heatmap-chart/calendar.ts",
		"heatmap-chart/shimmer.ts",
		"heatmap-chart/variants.ts",
		"sankey-chart/layout.ts",
		"sankey-chart/variants.ts",
	]) {
		const react = await readFile(`packages/ui-react/src/${file}`, "utf8");
		const svelte = await readFile(`packages/ui-svelte/src/lib/${file}`, "utf8");
		assert.equal(svelte, react, file);
	}
	const hm = await import("../packages/ui-react/src/heatmap-chart/calendar.ts");
	const data = [
		{ date: "2026-03-04", value: 8 },
		{ date: "2026-03-06", value: 2 },
		{ date: "2026-03-11", value: 1 },
	];
	const cal = hm.buildCalendar(data, {
		dateKey: "date",
		valueKey: "value",
		weekStart: 1,
	});
	assert.equal(cal.cells.length, 8, "fills every day between first and last");
	assert.equal(cal.cells[0].row, 2, "Wednesday is row 2 in a Monday week");
	assert.equal(
		cal.cells[7].col - cal.cells[0].col,
		1,
		"a week later is one column right",
	);
	assert.deepEqual(
		cal.cells.map((c) => c.level),
		[4, 0, 1, 0, 0, 0, 0, 1],
	);
	assert.equal(hm.levelOf(5, 8, [1, 3, 6]), 3);
	assert.equal(hm.enterDelay(3, 4, 1), 0, "default fade leaves no spread, as in bklit");
	const random = hm.seeded(42);
	const again = hm.seeded(42);
	assert.equal(random(), again(), "seeded PRNG repeats");
	assert.equal(hm.heatmapNext("ready", "status-loading"), "concealing");
	assert.equal(hm.heatmapNext("concealing", "done"), "loading");
	assert.equal(hm.heatmapNext("loading", "status-ready"), "revealing");
	assert.equal(hm.heatmapNext("revealing", "done"), "ready");

	const sk = await import("../packages/ui-react/src/sankey-chart/layout.ts");
	const flows = {
		nodes: [{ name: "a" }, { name: "b" }, { name: "c" }],
		links: [
			{ source: 0, target: 2, value: 30 },
			{ source: 1, target: 2, value: 10 },
		],
	};
	const h = sk.layoutSankey(flows, {
		width: 400,
		height: 200,
		nodeWidth: 10,
		nodePadding: 10,
		flow: "horizontal",
	});
	assert.equal(h.links[0].share, 1);
	assert.ok(h.nodes[2].x0 > h.nodes[0].x1, "target column sits right of the sources");
	const v = sk.layoutSankey(flows, {
		width: 400,
		height: 200,
		nodeWidth: 10,
		nodePadding: 10,
		flow: "vertical",
	});
	assert.ok(v.nodes[2].y0 > v.nodes[0].y1, "vertical flow runs top to bottom");
	assert.equal(Math.round(sk.SANKEY_TIMING.link(0, 10)), 220);
	assert.equal(Math.round(sk.SANKEY_TIMING.node(5, 10)), 132);
});
