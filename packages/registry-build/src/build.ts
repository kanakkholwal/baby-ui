import { readFile } from "node:fs/promises";
import { basename, resolve } from "node:path";
import {
	type ComponentSpec,
	type Framework,
	REGISTRY_ITEM_SCHEMA_URL,
	type RegistryItem,
	RegistryItemSchema,
} from "@baby-ui/registry-schema";
import { FRAMEWORK, SITE_URL } from "./config";
import { rewriteImports } from "./rewrite";

function targetFor(framework: Framework, path: string, type: string): string {
	const { uiTarget, libTarget } = FRAMEWORK[framework];
	if (type === "registry:lib" || type === "registry:hook") {
		return `${libTarget}/${basename(path)}`;
	}
	return `${uiTarget}/${path}`;
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

	return RegistryItemSchema.parse({
		$schema: REGISTRY_ITEM_SCHEMA_URL[framework],
		name: spec.slug,
		type: "registry:ui",
		title: spec.name,
		description: spec.description,
		dependencies: impl.dependencies,
		registryDependencies: impl.registryDependencies,
		files,
		cssVars: Object.keys(spec.cssVars).length ? { theme: spec.cssVars } : undefined,
		categories: [spec.category],
		meta: {
			tier: spec.tier,
			status: spec.status,
			frameworks: Object.keys(spec.impl),
			docs: `${SITE_URL}/components/${spec.category}/${spec.slug}`,
			...(spec.licenseOrigin ? { licenseOrigin: spec.licenseOrigin } : {}),
		},
	});
}
