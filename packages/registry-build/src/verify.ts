import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
	ComponentDocRequiredSchema,
	type ComponentSpec,
	type Framework,
} from "@baby-ui/registry-schema";
import { type SpringName, spring } from "@baby-ui/tokens";
import { parse as parseYaml } from "yaml";
import { FRAMEWORK } from "./config";

const ENTRY = /\b(snappy|gentle|bouncy)\s*:\s*\{([^}]*)\}/g;
const FIELD = /(\w+)\s*:\s*(-?[\d.]+)/g;

/**
 * Registry components are copied out standalone, so they inline their spring values
 * instead of importing @baby-ui/tokens. This is what keeps those copies honest.
 */
export async function verifySprings(
	specs: ComponentSpec[],
	framework: Framework,
): Promise<string[]> {
	const errors: string[] = [];
	const { srcDir } = FRAMEWORK[framework];

	for (const spec of specs) {
		const impl = spec.impl[framework];
		if (!impl) continue;

		for (const file of impl.files) {
			const source = await readFile(resolve(srcDir, file.path), "utf8").catch(() => null);
			if (!source) continue;

			for (const [, name, body] of source.matchAll(ENTRY)) {
				const expected =
					spring[name as SpringName][framework === "react" ? "motion" : "svelte"];
				const actual = Object.fromEntries(
					[...(body ?? "").matchAll(FIELD)].map(([, k, v]) => [k, Number(v)]),
				);
				for (const [key, value] of Object.entries(expected)) {
					if (actual[key] !== value) {
						errors.push(
							`${spec.slug} (${framework}) ${file.path}: spring.${name}.${key} is ${actual[key]}, tokens say ${value}`,
						);
					}
				}
			}
		}
	}
	return errors;
}

const SIBLING_IMPORT = /(?:from\s+|import\s+)["']\.\.\/([^/"']+)/g;

/** Every folder a shipped file imports from must come with it, or the install breaks. */
export async function verifyRegistryDependencies(
	specs: ComponentSpec[],
	framework: Framework,
): Promise<string[]> {
	const errors: string[] = [];
	const { srcDir } = FRAMEWORK[framework];
	// A folder belongs to the spec named after it; other specs that list its files only borrow them.
	const owner = new Map<string, string>();
	for (const spec of specs)
		for (const file of spec.impl[framework]?.files ?? []) {
			const [folder] = file.path.split("/");
			if (!folder || folder === "lib" || !file.path.includes("/")) continue;
			if (folder === spec.slug || !owner.has(folder)) owner.set(folder, spec.slug);
		}

	for (const spec of specs) {
		const impl = spec.impl[framework];
		if (!impl) continue;
		const shipped = new Set(impl.files.map((f) => f.path.split("/")[0]));
		const declared = new Set(impl.registryDependencies ?? []);
		for (const file of impl.files) {
			const source = await readFile(resolve(srcDir, file.path), "utf8").catch(() => "");
			for (const [, folder = ""] of source.matchAll(SIBLING_IMPORT)) {
				const dep = owner.get(folder);
				if (folder === "lib" || shipped.has(folder) || !dep || declared.has(dep))
					continue;
				errors.push(
					`${spec.slug} (${framework}) ${file.path}: imports ../${folder}, so registryDependencies needs "${dep}"`,
				);
			}
		}
	}
	return [...new Set(errors)];
}

/** docvia applies one frontmatter schema to every collection, so it cannot require
 * `component`/`category` of component docs alone. `missing` lists specs with no page yet. */
export async function verifyComponentDocs(
	specs: ComponentSpec[],
	docsDir: string,
): Promise<{ errors: string[]; missing: string[] }> {
	const errors: string[] = [];
	const missing: string[] = [];
	const known = new Set(specs.map((s) => s.slug));
	const seen = new Set<string>();

	const files = await readdir(docsDir).catch(() => [] as string[]);
	for (const file of files.filter((f) => f.endsWith(".md"))) {
		const raw = await readFile(resolve(docsDir, file), "utf8");
		const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
		if (!match?.[1]) {
			errors.push(`docs/components/${file}: no frontmatter`);
			continue;
		}

		const parsed = ComponentDocRequiredSchema.safeParse(parseYaml(match[1]));
		if (!parsed.success) {
			for (const issue of parsed.error.issues) {
				errors.push(
					`docs/components/${file}: ${issue.path.join(".") || "(root)"} ${issue.message}`,
				);
			}
			continue;
		}

		const { component, category } = parsed.data;
		seen.add(component);
		if (!known.has(component)) {
			errors.push(`docs/components/${file}: no spec for component "${component}"`);
			continue;
		}
		const spec = specs.find((s) => s.slug === component);
		if (spec && spec.category !== category) {
			errors.push(
				`docs/components/${file}: category is "${category}", spec says "${spec.category}"`,
			);
		}
	}

	for (const spec of specs) {
		if (!seen.has(spec.slug))
			missing.push(`${spec.slug}: no doc page at docs/components/${spec.slug}.md`);
	}
	return { errors, missing };
}
