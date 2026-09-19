import { transform } from "detype";

const SCRIPT = /<script\b([^>]*)\blang=["']ts["']([^>]*)>([\s\S]*?)<\/script>/;

/** Extension a JS counterpart should carry. */
export function jsPath(path: string): string {
	if (path.endsWith(".tsx")) return path.replace(/\.tsx$/, ".jsx");
	if (path.endsWith(".ts")) return path.replace(/\.ts$/, ".js");
	return path;
}

/**
 * detype parses .ts/.tsx only, so a Svelte SFC gets its typed script block
 * transformed in place and `lang="ts"` dropped. Returns null when nothing changes.
 */
export async function toJavaScript(code: string, path: string): Promise<string | null> {
	if (path.endsWith(".svelte")) {
		const match = code.match(SCRIPT);
		if (!match) return null;
		const [block, before, after, body] = match;
		const js = await transform(body ?? "", "block.ts");
		const attrs = `${before ?? ""}${after ?? ""}`.replace(/\s+/g, " ").trim();
		const open = attrs ? `<script ${attrs}>` : "<script>";
		return code.replace(block, `${open}\n${js.trimEnd()}\n</script>`);
	}
	if (/\.tsx?$/.test(path)) return transform(code, path);
	return null;
}
