import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORK } from "./config.js";

const RELATIVE_IMPORT = /(from\s+|import\s+)(["'])(\.[^"']+)\2/g;

/** `../lib/cn.js` becomes `@/lib/cn` (React) or `$lib/cn` (Svelte); siblings just
 * lose the `.js` that ESM resolution needs here but a shadcn consumer does not. */
export function rewriteImports(source: string, framework: Framework): string {
	const { libAlias } = FRAMEWORK[framework];
	return source.replace(
		RELATIVE_IMPORT,
		(_m, keyword: string, q: string, spec: string) => {
			let next = spec.replace(/\.js$/, "");
			if (next.startsWith("../lib/"))
				next = `${libAlias}/${next.slice("../lib/".length)}`;
			return `${keyword}${q}${next}${q}`;
		},
	);
}
