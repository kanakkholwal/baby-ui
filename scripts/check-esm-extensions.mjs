import { readdir, readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

// Node's ESM loader won't resolve an extensionless relative import, and the failure
// only shows up when a package is consumed outside a bundler.
const ROOTS = ["packages", "apps"];
const SKIP = new Set([
	"node_modules",
	"dist",
	".svelte-kit",
	".docvia",
	"build",
	".turbo",
]);
const BAD = /\bfrom\s+"(\.[^"]*?)"/g;

async function* walk(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) continue;
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* walk(path);
		else if (/\.(ts|tsx)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) yield path;
	}
}

const problems = [];
for (const root of ROOTS) {
	for await (const file of walk(resolve(root))) {
		const source = await readFile(file, "utf8");
		for (const [, spec] of source.matchAll(BAD)) {
			// ./$types is SvelteKit's virtual module and is correctly extensionless.
			if (spec === "./$types") continue;
			if (!/\.(js|jsx|svelte|css|json)$/.test(spec)) problems.push(`${file}: "${spec}"`);
		}
	}
}

if (problems.length) {
	console.error("Relative imports missing an extension:");
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log("ESM extensions OK");
