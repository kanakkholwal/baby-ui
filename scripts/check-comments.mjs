import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

const ROOTS = ["packages", "apps", "scripts"];
const SKIP = new Set([
	"node_modules",
	"dist",
	".svelte-kit",
	".docvia",
	"build",
	".turbo",
	".wrangler",
	"static",
]);
const EXT = /\.(ts|tsx|js|jsx|mjs|svelte)$/;

// Directives are machine-read, not prose, so the length rules don't apply.
const DIRECTIVE =
	/^\s*(\/\/|\/\*)\s*(biome-ignore|eslint-|@ts-|svelte-ignore|prettier-ignore|oxlint-|#!|<reference)/;
const LICENSE = /^\s*(\/\/|\/\*|\*)\s*(Copyright|SPDX-|Licensed under|MIT License)/i;
const ALLOWED_DIVIDER = /^\s*\/\/ --- .+ --- ?$/;
const BANNER = /(.)\1{5,}/;
const MAX_LINES = 2;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (EXT.test(entry.name) && !entry.name.endsWith(".d.ts")) yield path;
	}
}

/** Whole-line comments only; a trailing comment is one line by definition. */
function collectBlocks(lines) {
	const blocks = [];
	let current = null;
	let inStar = false;

	lines.forEach((line, index) => {
		const trimmed = line.trim();
		if (inStar) {
			current.lines.push(line);
			if (trimmed.includes("*/")) {
				blocks.push(current);
				current = null;
				inStar = false;
			}
			return;
		}
		if (trimmed.startsWith("/*")) {
			current = { start: index + 1, lines: [line], star: true };
			if (trimmed.includes("*/")) {
				blocks.push(current);
				current = null;
			} else inStar = true;
			return;
		}
		if (trimmed.startsWith("//")) {
			if (current && !current.star) current.lines.push(line);
			else current = { start: index + 1, lines: [line], star: false };
			return;
		}
		if (current && !current.star) {
			blocks.push(current);
			current = null;
		}
	});
	if (current) blocks.push(current);
	return blocks;
}

/** Delimiter-only lines aren't prose, so `/** x *\/` counts as one. */
function proseLineCount(block) {
	if (!block.star) return block.lines.length;
	return block.lines.filter((l) => {
		const t = l
			.trim()
			.replace(/^\/\*+/, "")
			.replace(/\*+\/$/, "")
			.replace(/^\*/, "")
			.trim();
		return t.length > 0;
	}).length;
}

const problems = [];

for (const root of ROOTS) {
	for await (const file of walk(resolve(root))) {
		const source = await readFile(file, "utf8");
		const lines = source.split(/\r?\n/);
		const rel = relative(process.cwd(), file);
		const firstCode = lines.findIndex((l) => {
			const t = l.trim();
			return t && !t.startsWith("//") && !t.startsWith("/*") && !t.startsWith("*");
		});

		for (const block of collectBlocks(lines)) {
			const text = block.lines.join("\n");
			if (DIRECTIVE.test(text) || LICENSE.test(text)) continue;

			const count = proseLineCount(block);
			if (count > MAX_LINES) {
				problems.push(
					`${rel}:${block.start}: comment is ${count} lines (max ${MAX_LINES})`,
				);
			}
			if (block.lines.some((l) => l.trim() === "//" || l.trim() === "*")) {
				problems.push(`${rel}:${block.start}: blank comment line`);
			}
			for (const line of block.lines) {
				const body = line.trim().replace(/^(\/\/|\/\*+|\*)/, "");
				if (BANNER.test(body) && !ALLOWED_DIVIDER.test(line)) {
					problems.push(`${rel}:${block.start}: banner or divider comment`);
					break;
				}
			}
			// A header block is separated from the code; a doc comment sits against it.
			const endsAt = block.start + block.lines.length - 1;
			if (block.start === 1 && firstCode > endsAt && count > 1) {
				problems.push(`${rel}:1: file-header comment block`);
			}
		}
	}
}

if (problems.length) {
	console.error(`Comment gate: ${problems.length} problem(s)`);
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log("Comment gate: clean");
