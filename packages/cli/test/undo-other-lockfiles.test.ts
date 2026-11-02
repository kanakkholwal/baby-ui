import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { add } from "../src/commands/add.ts";
import { revertCommand } from "../src/commands/history.ts";
import type { PackageManager } from "../src/project/pm.ts";
import * as deps from "../src/write/deps.ts";
import { sha256 } from "../src/write/lock.ts";
import { commit, conflicts, listJournals, readJournal, revert } from "../src/write/tx.ts";
import { fixture } from "./fixture.ts";

interface LockCase {
	pm: PackageManager;
	file: string;
	before: Buffer;
	after: Buffer;
}

const cases: LockCase[] = [
	{
		pm: "npm",
		file: "package-lock.json",
		before: Buffer.from('{"lockfileVersion":3}\n'),
		after: Buffer.from('{"lockfileVersion":3,"packages":{}}\n'),
	},
	{
		pm: "yarn",
		file: "yarn.lock",
		before: Buffer.from("# yarn lockfile v1\n"),
		after: Buffer.from('# yarn lockfile v1\nclsx@2.1.1:\n  version "2.1.1"\n'),
	},
	{
		pm: "bun",
		file: "bun.lock",
		before: Buffer.from('{"lockfileVersion":1}\n'),
		after: Buffer.from('{"lockfileVersion":1,"packages":{}}\n'),
	},
	{
		pm: "bun",
		file: "bun.lockb",
		before: Buffer.from([0, 255, 128, 1]),
		after: Buffer.from([0, 254, 129, 2]),
	},
];
const config = {
	$schema: "https://ui.shadcn.com/schema.json",
	tailwind: { css: "src/index.css" },
	aliases: { components: "@/components", utils: "@/lib/utils" },
};

function app(lock: LockCase, existing = true) {
	const root = fixture({
		"package.json": { name: "consumer", packageManager: `${lock.pm}@1.0.0` },
		"components.json": config,
		"tsconfig.json": { compilerOptions: { paths: { "@/*": ["./src/*"] } } },
		"src/index.css": '@import "tailwindcss";\n',
	});
	if (existing) writeFileSync(join(root, lock.file), lock.before);
	return root;
}

function installer(lock: LockCase, lockRoot: string, fail = false) {
	vi.spyOn(deps, "install").mockImplementation(async (project, packages) => {
		if (!packages.length) return;
		const manifest = join(project.root, "package.json");
		const pkg = JSON.parse(readFileSync(manifest, "utf8"));
		pkg.dependencies = { clsx: "2.1.1" };
		writeFileSync(manifest, JSON.stringify(pkg));
		writeFileSync(join(lockRoot, lock.file), lock.after);
		if (fail) throw new Error("Install failed after writing lockfile");
	});
}

let item: string;
beforeEach(() => {
	vi.spyOn(process.stdout, "write").mockReturnValue(true);
	vi.spyOn(console, "log").mockReturnValue();
	const registry = fixture({
		"example.json": {
			name: "example",
			type: "registry:ui",
			dependencies: ["clsx"],
			files: [
				{ path: "ui/example.tsx", type: "registry:ui", content: "export const X = 1;" },
			],
		},
	});
	item = pathToFileURL(join(registry, "example.json")).href;
});
afterEach(() => vi.restoreAllMocks());

describe.each(cases)("$pm undo ($file)", (lock) => {
	it("restores the manifest and exact lockfile bytes through undo and redo", async () => {
		const root = app(lock);
		const manifest = readFileSync(join(root, "package.json"));
		installer(lock, root);
		await add({ cwd: root, items: [item] });
		await revertCommand({ cwd: root });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.before);
		expect(readFileSync(join(root, "package.json"))).toEqual(manifest);
		const [undo] = await listJournals(root);
		await revertCommand({ cwd: root, id: undo?.id });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.after);
		expect(
			JSON.parse(readFileSync(join(root, "package.json"), "utf8")).dependencies,
		).toEqual({ clsx: "2.1.1" });
	});

	it("removes a newly created lockfile on undo and restores it on redo", async () => {
		const root = app(lock, false);
		installer(lock, root);
		await add({ cwd: root, items: [item] });
		await revertCommand({ cwd: root });
		expect(existsSync(join(root, lock.file))).toBe(false);
		const [undo] = await listJournals(root);
		await revertCommand({ cwd: root, id: undo?.id });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.after);
	});

	it("refuses to overwrite later user edits", async () => {
		const root = app(lock);
		installer(lock, root);
		await add({ cwd: root, items: [item] });
		const edited = Buffer.from(lock.after);
		edited[1] = edited[1] === 254 ? 255 : 120;
		writeFileSync(join(root, lock.file), edited);
		await expect(revertCommand({ cwd: root })).rejects.toThrow(/cancelled/);
		expect(readFileSync(join(root, lock.file))).toEqual(edited);
	});

	it("restores the workspace root lockfile from a nested app", async () => {
		const root = fixture({
			"package.json": { name: "workspace", private: true, workspaces: ["apps/*"] },
			"apps/web/package.json": { name: "web" },
			"apps/web/components.json": config,
			"apps/web/tsconfig.json": { compilerOptions: { paths: { "@/*": ["./src/*"] } } },
			"apps/web/src/index.css": '@import "tailwindcss";\n',
		});
		writeFileSync(join(root, lock.file), lock.before);
		const cwd = join(root, "apps/web");
		installer(lock, root);
		await add({ cwd, items: [item] });
		await revertCommand({ cwd });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.before);
		expect(existsSync(join(cwd, lock.file))).toBe(false);
	});

	it("leaves unrelated lockfile edits alone when installation is skipped", async () => {
		const root = app(lock);
		await add({ cwd: root, items: [item], install: false });
		writeFileSync(join(root, lock.file), lock.after);
		await revertCommand({ cwd: root });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.after);
	});

	it("restores package-manager writes after an install failure", async () => {
		const root = app(lock);
		installer(lock, root, true);
		await expect(add({ cwd: root, items: [item] })).rejects.toThrow(/Install failed/);
		await revertCommand({ cwd: root });
		expect(readFileSync(join(root, lock.file))).toEqual(lock.before);
		expect(
			JSON.parse(readFileSync(join(root, "package.json"), "utf8")).dependencies,
		).toBeUndefined();
	});
});

it("undoes and redoes a Bun migration from binary to text lockfile", async () => {
	const binary = cases.find((lock) => lock.file === "bun.lockb");
	if (!binary) throw new Error("Missing binary fixture");
	const root = app(binary);
	vi.spyOn(deps, "install").mockImplementation(async (_project, packages) => {
		if (!packages.length) return;
		rmSync(join(root, "bun.lockb"));
		writeFileSync(join(root, "bun.lock"), '{"lockfileVersion":1}\n');
	});
	await add({ cwd: root, items: [item] });
	await revertCommand({ cwd: root });
	expect(readFileSync(join(root, "bun.lockb"))).toEqual(binary.before);
	expect(existsSync(join(root, "bun.lock"))).toBe(false);
	const [undo] = await listJournals(root);
	await revertCommand({ cwd: root, id: undo?.id });
	expect(existsSync(join(root, "bun.lockb"))).toBe(false);
	expect(readFileSync(join(root, "bun.lock"), "utf8")).toBe('{"lockfileVersion":1}\n');
});

it("rolls back original binary bytes when a later write fails", async () => {
	const root = fixture({ "blocked/child.txt": "existing directory" });
	const file = join(root, "binary.lock");
	const before = Buffer.from([0, 255, 128]);
	writeFileSync(file, before);
	await expect(
		commit(root, "test", [
			{ path: file, content: "changed" },
			{ path: join(root, "blocked"), content: "cannot replace a directory" },
		]),
	).rejects.toThrow();
	expect(readFileSync(file)).toEqual(before);
});

it("keeps old text journals readable", async () => {
	const id = "20260101000000000";
	const root = fixture({
		"text.txt": "after",
		[`.baby-ui/history/${id}/files/0`]: "before",
		[`.baby-ui/history/${id}/journal.json`]: {
			id,
			command: "legacy install",
			createdAt: "2026-01-01T00:00:00.000Z",
			createdDirs: [],
			ops: [
				{
					path: "text.txt",
					before: { exists: true, hash: sha256("before"), snapshot: "files/0" },
					after: { exists: true, hash: sha256("after") },
				},
			],
		},
	});
	const file = join(root, "text.txt");
	const journal = await readJournal(root, id);
	if (!journal) throw new Error("Legacy journal was not loaded");
	expect(await conflicts(root, journal)).toEqual([]);
	await revert(root, journal);
	expect(readFileSync(file, "utf8")).toBe("before");
});
