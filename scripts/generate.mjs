import { existsSync, watch } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { flush, Output, ROOT, rel } from "./gen/core.mjs";
import { autoDemos } from "./gen/demos.mjs";
import { indexes } from "./gen/indexes.mjs";
import { isShared, sharedFiles } from "./gen/shared.mjs";
import { usageFiles } from "./gen/usage.mjs";

/** React is the source for every shared .ts; the Svelte port gets generated copies. */
export const TARGETS = [
	{
		name: "public",
		react: "packages/ui-react/src",
		svelte: "packages/ui-svelte/src/lib",
	},
	{
		name: "pro",
		react: "pro/packages/react/src",
		svelte: "pro/packages/svelte/src/lib",
	},
];

// Every generated file sits under one of these, and each keeps a .gitignore listing its own.
const PUBLIC_ROOTS = [
	"packages/ui-react/src",
	"packages/ui-svelte/src/lib",
	"packages/registry-schema/src/components",
	"packages/demos/src/react",
	"packages/demos/src/svelte",
	"packages/demos/src/usage",
];
// The private Pro submodule joins in whenever it is checked out.
const HAS_PRO = existsSync(join(ROOT, "pro/packages/react/src"));
const PRO_ROOTS = HAS_PRO ? ["pro/packages/svelte/src/lib"] : [];

/**
 * Brings generated files up to date. Writes only files whose content changed, so a dev server
 * watching them reloads once. With `check`, writes nothing and reports what is stale.
 */
export function generate({ check = false, quiet = false } = {}) {
	const output = new Output([...PUBLIC_ROOTS, ...PRO_ROOTS]);
	const report = { collisions: [], unmatched: [], demoless: [] };
	for (const target of TARGETS) {
		sharedFiles(output, target);
	}
	autoDemos(output, report);
	usageFiles(output, report);
	indexes(output, report);
	const result = { ...flush(output, { check }), report };
	if (!quiet) {
		const verb = check ? "stale" : "updated";
		console.log(
			`gen: ${result.generated.length} generated files, ${result.stale.length} ${verb}`,
		);
		for (const path of result.stale) console.log(`  ${rel(path)}`);
		for (const line of report.unmatched) console.log(`  unmatched demo export ${line}`);
		for (const line of report.usageMissing ?? [])
			console.log(`  usage needs a default for ${line}`);
		for (const line of result.conflicts) console.log(`  conflict: ${line}`);
	}
	return result;
}

/** Folders whose edits can change generated output. */
export function watchRoots() {
	return [
		"packages/ui-react/src",
		"packages/ui-svelte/src/lib",
		"packages/registry-schema/src/components",
		"packages/demos/src",
		...(HAS_PRO ? ["pro/packages/react/src"] : []),
	].map((path) => join(ROOT, path));
}

const isMain =
	process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	const args = new Set(process.argv.slice(2));
	if (args.has("--list")) {
		for (const path of generate({ check: true, quiet: true }).generated)
			console.log(rel(path));
	} else if (args.has("--check")) {
		const result = generate({ check: true });
		if (result.stale.length > 0 || result.conflicts.length > 0) process.exit(1);
	} else {
		if (generate().conflicts.length > 0) process.exitCode = 1;
		if (args.has("--watch")) {
			let timer;
			for (const dir of watchRoots()) {
				watch(dir, { recursive: true }, (_event, file) => {
					if (!file || /index\.tsx?$|\.gitignore$/.test(file)) return;
					if (!/\.(tsx?|svelte)$/.test(file) && !isShared(file)) return;
					clearTimeout(timer);
					timer = setTimeout(() => generate(), 150);
				});
			}
			console.log("gen: watching sources");
		}
	}
}
