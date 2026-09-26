import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import {
	type ComponentSpec,
	docsPath,
	type Framework,
	REGISTRY_ITEM_SCHEMA_URL,
	type RegistryItem,
	RegistryItemSchema,
} from "@baby-ui/registry-schema";
import { cssFor } from "./component-css";
import { FRAMEWORK, REGISTRY_URL, SITE_URL } from "./config";
import { rewriteImports } from "./rewrite";
import { bareVars, tokensUrl } from "./theme";
import { jsPath, toJavaScript } from "./tojs";

/** A bare slug in a spec's `registryDependencies` resolves to that item's own URL,
 * so `add command` also fetches `shortcut`; an already-qualified URL passes through. */
function resolveRegistryDep(framework: Framework, dep: string): string {
	return dep.startsWith("http")
		? dep
		: `${REGISTRY_URL}/${FRAMEWORK[framework].routePrefix}/${dep}.json`;
}

const isLib = (type: string) => type === "registry:lib" || type === "registry:hook";

function targetFor(framework: Framework, path: string, type: string): string {
	const { uiTarget, libTarget, aliasRelativeTargets } = FRAMEWORK[framework];
	const file = isLib(type) ? basename(path) : path;
	if (aliasRelativeTargets) return file;
	return `${isLib(type) ? libTarget : uiTarget}/${file}`;
}

/** Where the file lands in the project, for the Manual install view. */
export function projectPath(framework: Framework, target: string, type: string): string {
	const { uiTarget, libTarget, aliasRelativeTargets } = FRAMEWORK[framework];
	if (!aliasRelativeTargets) return target;
	return `${isLib(type) ? libTarget : uiTarget}/${target}`;
}

const EXPORT_FROM = /export\s+(?:type\s+)?\{[^}]*\}\s+from\s+"\.\/([^"]+)";/g;

/**
 * An `index.ts` for the item's own folder, re-exporting what the package index exports from
 * it, so `@/components/ui/<slug>` resolves. Only files this item ships are re-exported.
 */
async function barrelFor(
	framework: Framework,
	folder: string,
	shipped: Set<string>,
): Promise<string | null> {
	const index = await readFile(resolve(FRAMEWORK[framework].srcDir, "index.ts"), "utf8");
	const lines: string[] = [];
	for (const match of index.matchAll(EXPORT_FROM)) {
		const module = match[1] as string;
		if (!module.startsWith(`${folder}/`)) continue;
		const file = [module, `${module}.ts`, `${module}.tsx`].find((f) => shipped.has(f));
		if (!file) continue;
		lines.push(match[0].replace(`"./${folder}/`, '"./').replace(/\s+/g, " "));
	}
	return lines.length ? `${lines.join("\n")}\n` : null;
}

/** Runtime packages that ship no types of their own; strict TS projects need these to compile. */
const TYPES: Record<string, string[]> = {
	"d3-array": ["@types/d3-array"],
	"d3-geo": ["@types/d3-geo", "@types/geojson"],
	"d3-sankey": ["@types/d3-sankey"],
	"d3-scale": ["@types/d3-scale"],
	"d3-shape": ["@types/d3-shape"],
	"topojson-client": ["@types/topojson-client", "@types/geojson"],
};

function typesFor(dependencies: string[]): string[] | undefined {
	const types = [...new Set(dependencies.flatMap((dep) => TYPES[dep.replace(/@[^@/]*$/, "")] ?? []))];
	return types.length ? types.sort() : undefined;
}

export async function buildItem(
	spec: ComponentSpec,
	framework: Framework,
): Promise<RegistryItem | null> {
	const impl = spec.impl[framework];
	if (!impl) return null;

	const { srcDir } = FRAMEWORK[framework];
	const files = await Promise.all(
		impl.files.map(async (file) => {
			const abs = resolve(srcDir, file.path);
			const raw = await readFile(abs, "utf8").catch(() => {
				throw new Error(
					`${spec.slug} (${framework}): spec lists ${file.path}, which does not exist at ${abs}`,
				);
			});
			return {
				path: file.path,
				content: rewriteImports(raw, framework),
				type: file.type,
				target: file.target ?? targetFor(framework, file.path, file.type),
			};
		}),
	);

	const own = files.some((f) => f.path.startsWith(`${spec.slug}/`)) ? spec.slug : null;
	const barrel =
		own && !files.some((f) => f.path === `${own}/index.ts`)
			? await barrelFor(framework, own, new Set(files.map((f) => f.path)))
			: null;
	if (own && barrel) {
		files.push({
			path: `${own}/index.ts`,
			content: rewriteImports(barrel, framework),
			type: "registry:ui",
			target: targetFor(framework, `${own}/index.ts`, "registry:ui"),
		});
	}

	return RegistryItemSchema.parse({
		$schema: REGISTRY_ITEM_SCHEMA_URL[framework],
		name: spec.slug,
		type: "registry:ui",
		title: spec.name,
		description: spec.description,
		dependencies: impl.dependencies,
		devDependencies: typesFor(impl.dependencies),
		// Every component reads the motion variables, so the CLI has to bring them along.
		registryDependencies: [
			...impl.registryDependencies.map((dep) => resolveRegistryDep(framework, dep)),
			tokensUrl(framework),
		],
		files,
		cssVars: Object.keys(spec.cssVars).length ? bareVars({ theme: spec.cssVars }) : undefined,
		css: await cssFor(files.map((f) => f.content)),
		categories: [spec.category],
		meta: {
			tier: spec.tier,
			status: spec.status,
			frameworks: Object.keys(spec.impl),
			docs: `${SITE_URL}${docsPath(spec)}`,
			...(spec.licenseOrigin ? { licenseOrigin: spec.licenseOrigin } : {}),
		},
	});
}

/** The same item with every file transpiled. Null when any file has no JS counterpart. */
export async function toJsItem(item: RegistryItem): Promise<RegistryItem | null> {
	const files = await Promise.all(
		item.files.map(async (file) => {
			const content = await toJavaScript(file.content, file.path).catch(() => null);
			if (!content) return null;
			return {
				...file,
				path: jsPath(file.path),
				target: file.target ? jsPath(file.target) : undefined,
				content,
			};
		}),
	);
	if (files.some((file) => file === null)) return null;
	return { ...item, files: files as RegistryItem["files"] };
}
