import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { type ComponentSpec, type Framework, installDir } from "@baby-ui/registry-schema";
import { FRAMEWORK, REPO_ROOT } from "./config";
import { toJavaScript } from "./tojs";

const USAGE_DIR = resolve(REPO_ROOT, "packages/demos/src/usage");
const PRO_USAGE_DIR = resolve(REPO_ROOT, "pro/packages/demos/src/usage");

const EXT: Record<Framework, string> = { react: "tsx", svelte: "svelte" };
/** `@baby-ui/react/chart` names another item, so one snippet can import a chart and its base.
 * Pro snippets import `@baby-ui/pro-react` / `@baby-ui/pro-svelte`, installed the same way. */
const SUBPATH: Record<Framework, RegExp> = {
	react: /@baby-ui\/(?:pro-)?react(?:\/([a-z0-9-]+))?/g,
	svelte: /@baby-ui\/(?:pro-)?svelte(?:\/([a-z0-9-]+))?/g,
};
const PACKAGE: Record<Framework, RegExp> = {
	react: /@baby-ui\/react/g,
	svelte: /@baby-ui\/svelte/g,
};

export function usagePath(slug: string, framework: Framework, pro = false): string {
	return resolve(pro ? PRO_USAGE_DIR : USAGE_DIR, framework, `${slug}.${EXT[framework]}`);
}

/** Snippets import the workspace package so they type-check; readers need the copied path,
 * which sits in the item's install folder (`components/og/og-blog-post`). */
function rewritePackage(
	source: string,
	framework: Framework,
	spec: ComponentSpec,
	specs: readonly ComponentSpec[],
): string {
	const base = FRAMEWORK[framework].uiAlias.replace(/\/ui$/, "");
	return source.replace(SUBPATH[framework], (_m, sub?: string) => {
		const item = sub ? (specs.find((s) => s.slug === sub) ?? spec) : spec;
		return `${base}/${installDir(item)}/${sub ?? spec.slug}`;
	});
}

export type UsageVariant = { path: string; ts: string; js: string | null };

export async function buildUsage(
	spec: ComponentSpec,
	framework: Framework,
	specs: readonly ComponentSpec[],
): Promise<UsageVariant | null> {
	const file = usagePath(spec.slug, framework, spec.tier === "pro");
	const raw = await readFile(file, "utf8").catch(() => null);
	if (raw === null) return null;
	const path = `${spec.slug}.${EXT[framework]}`;
	const ts = rewritePackage(raw, framework, spec, specs);
	return { path, ts, js: await toJavaScript(ts, path).catch(() => null) };
}

export async function verifyUsage(specs: ComponentSpec[]): Promise<string[]> {
	const errors: string[] = [];
	for (const spec of specs) {
		for (const framework of Object.keys(spec.impl) as Framework[]) {
			const file = usagePath(spec.slug, framework);
			const raw = await readFile(file, "utf8").catch(() => null);
			if (raw === null) {
				errors.push(`${spec.slug} (${framework}): no usage snippet at ${file}`);
			} else if (!PACKAGE[framework].test(raw)) {
				PACKAGE[framework].lastIndex = 0;
				errors.push(
					`${spec.slug} (${framework}): usage snippet must import from the workspace package`,
				);
			}
			PACKAGE[framework].lastIndex = 0;
		}
	}
	return errors;
}
