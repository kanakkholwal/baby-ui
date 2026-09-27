import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const HEADER =
	"# Written by scripts/generate.mjs (pnpm gen). Edit the sources, not these.";
const MANIFEST = ".generated.json";

export const read = (path) => (existsSync(path) ? readFileSync(path, "utf8") : null);
export const posix = (path) => path.replaceAll("\\", "/");
export const rel = (path) => posix(relative(ROOT, path));
const hash = (text) => createHash("sha1").update(text).digest("hex");

/** Collects generated files; each lands under exactly one root, which lists it in a .gitignore. */
export class Output {
	constructor(roots) {
		this.roots = roots.map((root) => join(ROOT, root));
		this.files = new Map();
		this.keep = new Set();
	}

	add(path, content) {
		this.files.set(path, content);
	}

	/** A path that must survive even though this run no longer generates it (port-specific files). */
	protect(path) {
		this.keep.add(path);
	}

	rootOf(path) {
		const root = this.roots
			.filter((r) => path.startsWith(r + sep))
			.sort((a, b) => b.length - a.length)[0];
		if (!root) throw new Error(`gen: ${rel(path)} is outside every root`);
		return root;
	}
}

/** What the previous run generated under a root, path to content hash (null when unknown). */
export function previousFor(root) {
	const manifest = read(join(root, MANIFEST));
	if (manifest) {
		return new Map(
			Object.entries(JSON.parse(manifest)).map(([path, sum]) => [join(root, path), sum]),
		);
	}
	const ignore = read(join(root, ".gitignore"));
	if (!ignore) return new Map();
	return new Map(
		ignore
			.split(/\r?\n/)
			.filter(
				(line) =>
					line.startsWith("/") && line !== "/.gitignore" && line !== `/${MANIFEST}`,
			)
			.map((line) => [join(root, line.slice(1)), null]),
	);
}

/**
 * Writes changed files and prunes ones it generated before but no longer does. It never touches a
 * file it did not write, or one edited since, and reports those as conflicts instead.
 */
export function flush(output, { check }) {
	const stale = [];
	const conflicts = [];
	const byRoot = new Map(output.roots.map((root) => [root, []]));
	for (const path of output.files.keys()) byRoot.get(output.rootOf(path))?.push(path);

	for (const [root, paths] of byRoot) {
		const before = previousFor(root);
		const written = {};
		for (const path of paths) {
			const content = output.files.get(path);
			const current = read(path);
			if (current !== null && current !== content && !before.has(path)) {
				conflicts.push(`${rel(path)} exists and was not generated; not overwriting it`);
				continue;
			}
			written[posix(relative(root, path))] = hash(content);
			if (current === content) continue;
			stale.push(path);
			if (!check) {
				mkdirSync(dirname(path), { recursive: true });
				writeFileSync(path, content);
			}
		}
		for (const [old, sum] of before) {
			if (output.files.has(old) || output.keep.has(old) || !existsSync(old)) continue;
			const current = read(old);
			if (sum && current !== null && hash(current) !== sum) {
				conflicts.push(`${rel(old)} was generated, then edited; left in place`);
				continue;
			}
			stale.push(old);
			if (!check) rmSync(old);
		}

		const lines = Object.keys(written)
			.map((path) => `/${path}`)
			.sort();
		const ignore = lines.length
			? [HEADER, "/.gitignore", `/${MANIFEST}`, ...lines, ""].join("\n")
			: null;
		const manifest = lines.length
			? `${JSON.stringify(Object.fromEntries(Object.entries(written).sort()), null, "\t")}\n`
			: null;
		for (const [file, content] of [
			[join(root, ".gitignore"), ignore],
			[join(root, MANIFEST), manifest],
		]) {
			const current = read(file);
			if (current === content) continue;
			stale.push(file);
			if (check) continue;
			if (content === null) rmSync(file);
			else writeFileSync(file, content);
		}
	}
	return { generated: [...output.files.keys()], stale, conflicts };
}
