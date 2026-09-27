import { type ComponentSpec, type Framework, installDir } from "@baby-ui/registry-schema";
import { FRAMEWORK } from "./config";

const RELATIVE_IMPORT = /(from\s+|import\s+)(["'])(\.[^"']+)\2/g;

/** Source folder (`email-kit`) to install folder (`emails/ui`), from every spec that ships it. */
export function folderDirs(specs: readonly ComponentSpec[]): Map<string, string> {
	const dirs = new Map<string, string>();
	for (const spec of specs)
		for (const impl of [spec.impl.react, spec.impl.svelte])
			for (const file of impl?.files ?? []) {
				const folder = file.path.split("/")[0];
				if (folder && folder !== "lib" && file.path.includes("/"))
					dirs.set(folder, installDir(spec));
			}
	return dirs;
}

/** `../lib/cn` becomes `@/lib/cn`/`$lib/cn`; other `../x/y` imports go to x's install folder,
 * e.g. `@/components/emails/ui/email-kit/...`: a consumer's tree isn't our monorepo layout. */
export function rewriteImports(
	source: string,
	framework: Framework,
	dirs: ReadonlyMap<string, string>,
): string {
	const { libAlias, uiAlias } = FRAMEWORK[framework];
	const components = uiAlias.replace(/\/ui$/, "");
	return source.replace(
		RELATIVE_IMPORT,
		(_m, keyword: string, q: string, spec: string) => {
			let next = spec.replace(/\.js$/, "");
			if (next.startsWith("../lib/")) {
				next = `${libAlias}/${next.slice("../lib/".length)}`;
			} else if (next.startsWith("../")) {
				const rest = next.slice("../".length);
				next = `${components}/${dirs.get(rest.split("/")[0] ?? "") ?? "ui"}/${rest}`;
			}
			return `${keyword}${q}${next}${q}`;
		},
	);
}
