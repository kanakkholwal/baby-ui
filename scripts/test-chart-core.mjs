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
