import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

// Proves the Pro feature flag held in a finished build: `--expect=absent` (the public site)
// fails on any Pro module or slug, `--expect=present` fails when Pro never got bundled.
const ROOT = resolve(import.meta.dirname, "..");
const SITE = join(ROOT, "apps/site");
const PRO = join(ROOT, "pro/packages");
const BUILT = [join(SITE, ".svelte-kit/output"), join(SITE, ".svelte-kit/cloudflare")];
const MARKERS = ["pro/packages/", "@baby-ui/pro-"];
const TEXT = new Set([".js", ".mjs", ".json", ".html", ".css", ".txt", ".map"]);

const expect = process.argv
	.find((a) => a.startsWith("--expect="))
	?.slice("--expect=".length);
if (expect !== "absent" && expect !== "present") {
	console.error("Usage: node scripts/check-pro-bundle.mjs --expect=absent|present");
	process.exit(1);
}
if (!existsSync(PRO)) {
	if (expect === "present") {
		console.error("Pro bundle: pro/ is not checked out, so there is nothing to bundle.");
		process.exit(1);
	}
	console.log("Pro bundle: pro/ is not checked out; nothing could leak.");
	process.exit(0);
}
if (!BUILT.some(existsSync)) {
	console.error(
		"Pro bundle: no build output under apps/site/.svelte-kit. Run the build first.",
	);
	process.exit(1);
}

function* files(dir) {
	if (!existsSync(dir)) return;
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* files(path);
		else if (TEXT.has(extname(name))) yield path;
	}
}

const folders = (dir) =>
	existsSync(dir)
		? readdirSync(dir).filter((n) => n !== "lib" && statSync(join(dir, n)).isDirectory())
		: [];
// A slug the public packages also ship is public, whatever Pro builds on it.
const publicSlugs = new Set([
	...folders(join(ROOT, "packages/ui-svelte/src/lib")),
	...folders(join(ROOT, "packages/ui-react/src")),
]);
const proSlugs = new Set(
	[...folders(join(PRO, "svelte/src/lib")), ...folders(join(PRO, "react/src"))].filter(
		(slug) => !publicSlugs.has(slug),
	),
);

const hits = [];
for (const dir of BUILT)
	for (const path of files(dir)) {
		const text = readFileSync(path, "utf8");
		const marker = MARKERS.find((m) => text.includes(m));
		if (marker) hits.push(`${relative(ROOT, path)} contains "${marker}"`);
	}
// Usage snippets and registry items are written per slug, so a Pro slug there is a leak by name.
for (const slug of proSlugs)
	for (const path of [
		join(SITE, "src/lib/generated/usage", `${slug}.json`),
		join(SITE, "static/r", `${slug}.json`),
		join(SITE, "static/svelte/r", `${slug}.json`),
	])
		if (existsSync(path)) hits.push(`${relative(ROOT, path)} is a Pro item`);

if (expect === "absent" && hits.length) {
	console.error(
		`Pro bundle: ${hits.length} Pro reference(s) in a build with the flag off:`,
	);
	for (const hit of hits.slice(0, 20)) console.error(`  ${hit}`);
	console.error(
		"Gate the import at its glob with `__SHOW_PRO__ ? import.meta.glob(...) : {}`.",
	);
	process.exit(1);
}
if (expect === "present" && !hits.length) {
	console.error("Pro bundle: the flag is on but no Pro module reached the build.");
	process.exit(1);
}
console.log(
	expect === "absent"
		? `Pro bundle: no Pro module or slug in the build (${proSlugs.size} Pro slugs checked).`
		: `Pro bundle: Pro is bundled (${hits.length} references).`,
);
