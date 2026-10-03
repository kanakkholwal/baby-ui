import { readFileSync } from "node:fs";
import { extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "detype";
import { hashOf, openCache } from "./cache";
import { REPO_ROOT } from "./config";

// Output depends on this file and on the transpiler versions the lockfile pins.
const transpiled = openCache(
	"tojs",
	hashOf(
		readFileSync(fileURLToPath(import.meta.url), "utf8"),
		readFileSync(resolve(REPO_ROOT, "pnpm-lock.yaml"), "utf8"),
	),
);

const SCRIPT = /<script\b([^>]*)\blang=["']ts["']([^>]*)>([\s\S]*?)<\/script>/;

/** Extension a JS counterpart should carry. */
export function jsPath(path: string): string {
	if (path.endsWith(".tsx")) return path.replace(/\.tsx$/, ".jsx");
	if (path.endsWith(".ts")) return path.replace(/\.ts$/, ".js");
	return path;
}

const IMPORT = /^import\s+(?!type\s)([\s\S]+?)\s+from\s+["'][^"']+["']/gm;

/** Value bindings an import clause introduces, so the template's usages can be asserted. */
function bindings(clause: string): string[] {
	const out: string[] = [];
	const named = clause.match(/\{([\s\S]*)\}/);
	for (const part of (named?.[1] ?? "").split(",")) {
		const spec = part.trim();
		if (!spec || spec.startsWith("type ")) continue;
		out.push(spec.split(/\s+as\s+/).pop() ?? spec);
	}
	const rest = clause.replace(/\{[\s\S]*\}/, "");
	for (const spec of rest.split(",")) {
		const name = spec.trim().replace(/^\*\s+as\s+/, "");
		if (name) out.push(name);
	}
	return out;
}

const KEEP = "/*__keep__*/";

/** JS counterpart of a TS/TSX/Svelte file, or null when nothing changes. Cached by content. */
export async function toJavaScript(code: string, path: string): Promise<string | null> {
	const cache = await transpiled;
	return cache.get(hashOf(extname(path), code), () => transpile(code, path));
}

/** Persists this run's transpiles, so unchanged files skip babel and prettier next run. */
export async function saveTranspileCache(): Promise<void> {
	await (await transpiled).save();
}

/** detype parses .ts/.tsx only, so a Svelte SFC gets its typed script block transformed in
 * place and `lang="ts"` dropped. */
async function transpile(code: string, path: string): Promise<string | null> {
	if (path.endsWith(".svelte")) {
		const match = code.match(SCRIPT);
		if (!match) return null;
		const [block, before, after, body = ""] = match;
		// Babel elides imports the script never reads, but the template reads them. A
		// synthetic use keeps every value import alive, then the marker line is removed.
		const names = [...body.matchAll(IMPORT)].flatMap((m) => bindings(m[1] ?? ""));
		const keep = names.length ? `\n${KEEP}void [${names.join(", ")}];\n` : "";
		// Prettier may spread the marker statement over several lines, so strip by pattern.
		const js = (await transform(body + keep, "block.ts"))
			.replace(/\s*\/\*__keep__\*\/\s*void \[[\s\S]*?\];\s*/, "\n")
			.replace(/^export \{\};\s*$/m, "");
		const attrs = `${before ?? ""}${after ?? ""}`.replace(/\s+/g, " ").trim();
		const open = attrs ? `<script ${attrs}>` : "<script>";
		return code.replace(block, `${open}\n${js.trimEnd()}\n</script>`);
	}
	if (/\.tsx?$/.test(path)) return transform(code, path);
	return null;
}
