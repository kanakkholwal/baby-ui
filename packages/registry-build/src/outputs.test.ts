import { afterEach, describe, expect, test } from "bun:test";
import {
	existsSync,
	mkdirSync,
	mkdtempSync,
	rmSync,
	statSync,
	writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { openCache } from "./cache";
import { createOutputs } from "./outputs";

const dirs: string[] = [];
const scratch = () => {
	const dir = mkdtempSync(join(tmpdir(), "registry-build-"));
	dirs.push(dir);
	return dir;
};
afterEach(() => {
	for (const dir of dirs.splice(0)) rmSync(dir, { recursive: true, force: true });
});

describe("outputs", () => {
	test("unchanged content is not rewritten", async () => {
		const dir = scratch();
		const file = join(dir, "r/button.json");
		await createOutputs([dir]).write(file, "{}\n");
		const before = statSync(file).mtimeMs;
		await Bun.sleep(20);
		const again = createOutputs([dir]);
		await again.write(file, "{}\n");
		expect(statSync(file).mtimeMs).toBe(before);
		expect(again.summary()).toEqual({ written: 1, changed: 0 });
	});

	test("prune removes owned files a build no longer writes, and nothing outside", async () => {
		const dir = scratch();
		const owned = join(dir, "r");
		const outside = join(dir, "emails");
		mkdirSync(join(owned, "js"), { recursive: true });
		mkdirSync(outside);
		writeFileSync(join(owned, "removed.json"), "{}");
		writeFileSync(join(owned, "js/removed.json"), "{}");
		writeFileSync(join(outside, "welcome.json"), "{}");

		const outputs = createOutputs([owned]);
		await outputs.write(join(owned, "kept.json"), "{}");
		const pruned = await outputs.prune();

		expect(pruned.length).toBe(2);
		expect(existsSync(join(owned, "kept.json"))).toBe(true);
		expect(existsSync(join(owned, "removed.json"))).toBe(false);
		expect(existsSync(join(outside, "welcome.json"))).toBe(true);
	});
});

describe("cache", () => {
	const name = `test-${process.pid}`;
	afterEach(() => {
		rmSync(join(import.meta.dir, `../node_modules/.cache/registry-build/${name}.json`), {
			force: true,
		});
	});

	test("a saved value is reused by the next run, and a new version drops it", async () => {
		let computed = 0;
		const compute = async () => {
			computed++;
			return "js";
		};
		const first = await openCache(name, "v1");
		expect(await first.get("key", compute)).toBe("js");
		await first.save();

		expect(await (await openCache(name, "v1")).get("key", compute)).toBe("js");
		expect(computed).toBe(1);
		expect(await (await openCache(name, "v2")).get("key", compute)).toBe("js");
		expect(computed).toBe(2);
	});

	test("parallel callers share one compute, and a failure is not cached", async () => {
		let computed = 0;
		const cache = await openCache(name, "v1");
		const slow = async () => {
			computed++;
			await Bun.sleep(10);
			return "js";
		};
		await Promise.all([cache.get("a", slow), cache.get("a", slow)]);
		expect(computed).toBe(1);

		await cache.get("b", () => Promise.reject(new Error("babel"))).catch(() => null);
		expect(await cache.get("b", async () => "recovered")).toBe("recovered");
	});
});
