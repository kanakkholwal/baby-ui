import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { watchAndRun } from "./lib/watch.mjs";

const DEBOUNCE = 50;
const wait = (ms) => new Promise((done) => setTimeout(done, ms));

function fixture(options) {
	const root = mkdtempSync(join(tmpdir(), "baby-ui-watch-"));
	const runs = [];
	const errors = [];
	const watcher = watchAndRun({
		roots: [root],
		debounceMs: DEBOUNCE,
		onError: (error) => errors.push(error),
		...options,
		run: async () => {
			runs.push(Date.now());
			await options?.run?.(runs.length);
		},
	});
	const close = () => {
		watcher.close();
		rmSync(root, { recursive: true, force: true });
	};
	return { root, runs, errors, close };
}

test("a burst of writes coalesces into one run", async () => {
	const { root, runs, close } = fixture();
	for (let i = 0; i < 10; i++) writeFileSync(join(root, `file-${i}.ts`), `${i}`);
	await wait(DEBOUNCE * 8);
	close();
	assert.equal(runs.length, 1);
});

test("a throwing run is reported and the next change still runs", async () => {
	const { root, runs, errors, close } = fixture({
		run: (count) => {
			if (count === 1) throw new Error("half-written spec");
		},
	});
	writeFileSync(join(root, "spec.ts"), "");
	await wait(DEBOUNCE * 6);
	writeFileSync(join(root, "spec.ts"), "export const x = 1;");
	await wait(DEBOUNCE * 6);
	close();
	assert.equal(errors.length, 1);
	assert.equal(errors[0].message, "half-written spec");
	assert.equal(runs.length, 2);
});

test("changes during a run queue exactly one follow-up, never an overlap", async () => {
	let active = 0;
	let overlapped = false;
	const { root, runs, close } = fixture({
		run: async () => {
			active++;
			if (active > 1) overlapped = true;
			await wait(DEBOUNCE * 4);
			active--;
		},
	});
	writeFileSync(join(root, "a.ts"), "a");
	await wait(DEBOUNCE * 2);
	for (let i = 0; i < 5; i++) writeFileSync(join(root, `b-${i}.ts`), "b");
	await wait(DEBOUNCE * 14);
	close();
	assert.equal(overlapped, false);
	assert.equal(runs.length, 2);
});

test("ignored paths never schedule a run", async () => {
	const { root, runs, close } = fixture({
		ignore: (path) => path.endsWith("index.ts"),
	});
	writeFileSync(join(root, "index.ts"), "generated");
	await wait(DEBOUNCE * 6);
	close();
	assert.equal(runs.length, 0);
});

test("deleting a watched folder mid-run does not crash the watcher", async () => {
	const { root, runs, errors, close } = fixture();
	const dir = join(root, "component");
	mkdirSync(dir);
	for (const name of ["a.ts", "b.ts", "c.svelte"]) writeFileSync(join(dir, name), name);
	await wait(DEBOUNCE * 6);
	rmSync(dir, { recursive: true });
	await wait(DEBOUNCE * 6);
	close();
	assert.equal(errors.length, 0);
	assert.equal(runs.length, 2);
});
