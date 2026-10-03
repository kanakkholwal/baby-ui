import { readFile, writeFile } from "node:fs/promises";
import { repoPath, sourceFiles } from "./lib/source-files.mjs";

// House rule: relative imports carry no .js extension. Bundlers resolve them, and the
// published registry output would otherwise ship a specifier a consumer has to fix.
const SOURCE = /\.(ts|tsx|svelte|mjs|js)$/;
const RELATIVE = /((?:from|import)\s*\(?\s*["'])(\.[^"']*?)\.jsx?(["'])/g;

const args = process.argv.slice(2);
const write = args.includes("--write");
const problems = [];
let fixed = 0;

for (const file of await sourceFiles(args, SOURCE)) {
	const source = await readFile(file, "utf8");
	const matches = [...source.matchAll(RELATIVE)];
	if (!matches.length) continue;
	if (write) {
		await writeFile(file, source.replace(RELATIVE, "$1$2$3"));
		fixed += matches.length;
		continue;
	}
	for (const [specifier] of matches) problems.push(`${repoPath(file)}: ${specifier}`);
}

if (problems.length) {
	console.error("Relative imports must not carry a .js extension (fix: --write):");
	for (const p of problems) console.error(`  ${p}`);
	process.exit(1);
}
console.log(fixed ? `Import extensions: removed ${fixed}` : "Import extensions OK");
