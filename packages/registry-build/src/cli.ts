import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { FRAMEWORKS, type Framework } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { buildItem, toJsItem } from "./build";
import { cssText } from "./component-css";
import {
	FRAMEWORK,
	OUT_DIR,
	REGISTRY_NAME,
	REGISTRY_URL,
	REPO_ROOT,
	SITE_URL,
} from "./config";
import { buildThirdPartyLicenses } from "./licenses";
import { buildLlmsTxt } from "./llms";
import { buildThemeItems } from "./theme";
import { buildThemeCss } from "./theme-css";
import { jsPath, toJavaScript } from "./tojs";
import { buildUsage, verifyUsage } from "./usage";
import { verifyComponentDocs, verifySprings } from "./verify";

async function writeJson(relative: string, value: unknown) {
	const path = resolve(OUT_DIR, relative);
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, `${JSON.stringify(value, null, 2)}\n`, "utf8");
	return relative;
}

async function main() {
	const errors = [
		...(await Promise.all(FRAMEWORKS.map((f) => verifySprings([...specs], f)))).flat(),
		...(await verifyComponentDocs(
			[...specs],
			resolve(REPO_ROOT, "apps/site/src/docs/components"),
		)),
		...(await verifyUsage([...specs])),
	];
	if (errors.length) {
		console.error("registry-build failed:");
		for (const e of errors) console.error(`  - ${e}`);
		process.exit(1);
	}

	const written: string[] = [];

	for (const framework of FRAMEWORKS as readonly Framework[]) {
		const { routePrefix } = FRAMEWORK[framework];
		const index: unknown[] = [];
		const jsIndex: unknown[] = [];

		// No files to transpile, so the JS route gets the same JSON.
		for (const item of await buildThemeItems(framework)) {
			written.push(await writeJson(`${routePrefix}/${item.name}.json`, item));
			written.push(await writeJson(`${routePrefix}/js/${item.name}.json`, item));
			const { $schema: _, files: __, ...summary } = item;
			index.push(summary);
			jsIndex.push(summary);
		}

		for (const spec of specs) {
			const item = await buildItem(spec, framework);
			if (!item) continue;
			written.push(await writeJson(`${routePrefix}/${spec.slug}.json`, item));
			const { $schema: _, files: __, ...summary } = item;
			index.push(summary);

			// A JS route, so the site's language switch changes what the CLI actually writes.
			const js = await toJsItem(item);
			if (js) {
				written.push(await writeJson(`${routePrefix}/js/${spec.slug}.json`, js));
				jsIndex.push(summary);
			}
		}

		const schema =
			framework === "react"
				? "https://ui.shadcn.com/schema/registry.json"
				: "https://shadcn-svelte.com/schema/registry.json";

		for (const [prefix, items] of [
			[routePrefix, index],
			[`${routePrefix}/js`, jsIndex],
		] as const) {
			written.push(
				await writeJson(`${prefix}/registry.json`, {
					$schema: schema,
					name: REGISTRY_NAME,
					homepage: SITE_URL,
					items,
				}),
			);
		}
	}

	written.push(
		await writeJson("r/specs.json", { site: SITE_URL, registry: REGISTRY_URL, specs }),
	);

	// TS and its JS counterpart per file, generated here so prettier and babel never
	// reach the Worker. The site imports this instead of re-reading the registry JSON.
	const sources: Record<string, Record<string, unknown[]>> = {};
	const css: Record<string, Record<string, string>> = {};
	for (const spec of specs) {
		const perFramework: Record<string, unknown[]> = {};
		sources[spec.slug] = perFramework;
		const perFrameworkCss: Record<string, string> = {};
		css[spec.slug] = perFrameworkCss;
		for (const framework of FRAMEWORKS as readonly Framework[]) {
			const item = await buildItem(spec, framework);
			if (!item) continue;
			if (item.css)
				perFrameworkCss[framework] = cssText(item.css as Parameters<typeof cssText>[0]);
			perFramework[framework] = await Promise.all(
				item.files.map(async (file) => {
					const js = await toJavaScript(file.content, file.path).catch(() => null);
					return {
						path: file.path,
						target: file.target,
						ts: file.content,
						js,
						jsPath: js ? jsPath(file.path) : null,
					};
				}),
			);
		}
	}
	const cssPath = resolve(REPO_ROOT, "apps/site/src/lib/generated/css.json");
	await mkdir(dirname(cssPath), { recursive: true });
	await writeFile(
		cssPath,
		`${JSON.stringify(css, null, 2)}
`,
		"utf8",
	);
	written.push("../src/lib/generated/css.json");

	const usage: Record<string, Record<string, unknown>> = {};
	for (const spec of specs) {
		const perFramework: Record<string, unknown> = {};
		usage[spec.slug] = perFramework;
		for (const framework of FRAMEWORKS as readonly Framework[]) {
			const snippet = await buildUsage(spec, framework);
			if (snippet) perFramework[framework] = snippet;
		}
	}
	const usagePath = resolve(REPO_ROOT, "apps/site/src/lib/generated/usage.json");
	await mkdir(dirname(usagePath), { recursive: true });
	await writeFile(
		usagePath,
		`${JSON.stringify(usage, null, 2)}
`,
		"utf8",
	);
	written.push("../src/lib/generated/usage.json");

	const themeCssPath = resolve(REPO_ROOT, "apps/site/src/lib/generated/theme-css.json");
	await writeFile(
		themeCssPath,
		`${JSON.stringify({ css: await buildThemeCss() })}
`,
		"utf8",
	);
	written.push("../src/lib/generated/theme-css.json");

	const originsPath = resolve(REPO_ROOT, "apps/site/src/lib/generated/origins.json");
	await mkdir(dirname(originsPath), { recursive: true });
	await writeFile(
		originsPath,
		`${JSON.stringify({ site: SITE_URL, registry: REGISTRY_URL }, null, 2)}
`,
		"utf8",
	);
	written.push("../src/lib/generated/origins.json");

	const sourcesPath = resolve(REPO_ROOT, "apps/site/src/lib/generated/sources.json");
	await mkdir(dirname(sourcesPath), { recursive: true });
	await writeFile(
		sourcesPath,
		`${JSON.stringify(sources, null, 2)}
`,
		"utf8",
	);
	written.push("../src/lib/generated/sources.json");

	await writeFile(resolve(OUT_DIR, "llms.txt"), buildLlmsTxt([...specs]), "utf8");
	written.push("llms.txt");

	await writeFile(
		resolve(REPO_ROOT, "THIRD_PARTY_LICENSES.md"),
		buildThirdPartyLicenses([...specs]),
		"utf8",
	);
	written.push("../../THIRD_PARTY_LICENSES.md");

	console.log(`registry-build wrote ${written.length} files to apps/site/static`);
	for (const w of written) console.log(`  ${w}`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
