import { readdir, readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";

// House rule: relative imports carry no .js extension. Bundlers resolve them, and the
// published registry output would otherwise ship a specifier a consumer has to fix.
const ROOTS = ["packages", "apps", "scripts"];
const SKIP = new Set([
	"node_modules",
	"dist",
	".svelte-kit",
	".docvia",
	"build",
	".turbo",
	"static",
	"public",
]);
const SOURCE = /\.(ts|tsx|svelte|mjs|js)$/;
const RELATIVE = /(?:from|import)\s*\(?\s*["'](\.[^"']*)["']/g;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (SOURCE.test(entry.name) && !entry.name.endsWith(".d.ts")) yield path;
	}
}

const problems = [];
for (const root of ROOTS) {
	for await (const file of walk(resolve(root))) {
		const source = await readFile(file, "utf8");
		for (const [, spec] of source.matchAll(RELATIVE)) {
			if (/\.jsx?$/.test(spec)) {
				problems.push(`${relative(process.cwd(), file)}: "${spec}"`);
			}
		}
	}
}

if (problems.length) {
	console.error("Relative imports must not carry a .js extension:");
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log("Import extensions OK");
