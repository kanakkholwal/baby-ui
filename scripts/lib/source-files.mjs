import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const ROOTS = ["packages", "apps", "scripts"].map((dir) => join(ROOT, dir));
const SKIP = new Set([
	"node_modules",
	"dist",
	".svelte-kit",
	".docvia",
	"build",
	".turbo",
	".wrangler",
	"static",
	"public",
]);

export const repoPath = (file) => relative(ROOT, file).replaceAll(sep, "/");

const gated = (file, ext) =>
	ext.test(file) &&
	!file.endsWith(".d.ts") &&
	ROOTS.some((root) => file.startsWith(root + sep)) &&
	!relative(ROOT, file)
		.split(sep)
		.some((part) => SKIP.has(part));

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else yield path;
	}
}

/**
 * Files a repo gate checks: the paths given on the command line (a git hook's staged files), or
 * every matching file under packages/, apps/ and scripts/ when none are given or with `--all`.
 */
export async function sourceFiles(args, ext) {
	const paths = args.filter((arg) => !arg.startsWith("--"));
	if (paths.length && !args.includes("--all")) {
		return paths
			.map((path) => resolve(path))
			.filter((file) => existsSync(file) && gated(file, ext));
	}
	const files = [];
	for (const root of ROOTS)
		for await (const file of walk(root)) if (gated(file, ext)) files.push(file);
	return files;
}
