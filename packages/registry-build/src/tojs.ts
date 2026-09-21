import { transform } from "detype";

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

/**
 * detype parses .ts/.tsx only, so a Svelte SFC gets its typed script block
 * transformed in place and `lang="ts"` dropped. Returns null when nothing changes.
 */
export async function toJavaScript(code: string, path: string): Promise<string | null> {
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
