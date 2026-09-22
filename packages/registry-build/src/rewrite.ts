import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORK } from "./config";

const RELATIVE_IMPORT = /(from\s+|import\s+)(["'])(\.[^"']+)\2/g;

/** `../lib/cn` becomes `@/lib/cn`/`$lib/cn`; other `../x/y` cross-component imports become
 * `@/components/ui/x/y`/`$lib/components/ui/x/y` — a consumer's tree isn't our monorepo layout. */
export function rewriteImports(source: string, framework: Framework): string {
	const { libAlias, uiAlias } = FRAMEWORK[framework];
	return source.replace(
		RELATIVE_IMPORT,
		(_m, keyword: string, q: string, spec: string) => {
			let next = spec.replace(/\.js$/, "");
			if (next.startsWith("../lib/")) {
				next = `${libAlias}/${next.slice("../lib/".length)}`;
			} else if (next.startsWith("../")) {
				next = `${uiAlias}/${next.slice("../".length)}`;
			}
			return `${keyword}${q}${next}${q}`;
		},
	);
}
