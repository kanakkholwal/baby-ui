import { readFile } from "node:fs/promises";
import { repoPath, sourceFiles } from "./lib/source-files.mjs";

const EXT = /\.(ts|tsx|js|jsx|mjs|svelte)$/;

// Directives are machine-read, not prose, so the length rules don't apply.
const DIRECTIVE =
	/^\s*(\/\/|\/\*)\s*(biome-ignore|eslint-|@ts-|svelte-ignore|prettier-ignore|oxlint-|#!|<reference)/;
const LICENSE = /^\s*(\/\/|\/\*|\*)\s*(Copyright|SPDX-|Licensed under|MIT License)/i;
const ALLOWED_DIVIDER = /^\s*\/\/ --- .+ --- ?$/;
// Punctuation runs only: a number like 1.1800000001 is not a divider.
const BANNER = /([^\p{L}\p{N}\s])\1{5,}/u;
const MAX_LINES = 2;

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

for (const file of await sourceFiles(process.argv.slice(2), EXT)) {
	const source = await readFile(file, "utf8");
	const lines = source.split(/\r?\n/);
	const rel = repoPath(file);
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

if (problems.length) {
	console.error(`Comment gate: ${problems.length} problem(s)`);
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log("Comment gate: clean");
