import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { FRAMEWORKS, type Framework } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { buildItem } from "./build.js";
import { FRAMEWORK, OUT_DIR, REGISTRY_NAME, REPO_ROOT, SITE_URL } from "./config.js";
import { buildThirdPartyLicenses } from "./licenses.js";
import { buildLlmsTxt } from "./llms.js";
import { verifyComponentDocs, verifySprings } from "./verify.js";

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

		for (const spec of specs) {
			const item = await buildItem(spec, framework);
			if (!item) continue;
			written.push(await writeJson(`${routePrefix}/${spec.slug}.json`, item));
			const { $schema: _, files: __, ...summary } = item;
			index.push(summary);
		}

		written.push(
			await writeJson(`${routePrefix}/registry.json`, {
				$schema:
					framework === "react"
						? "https://ui.shadcn.com/schema/registry.json"
						: "https://shadcn-svelte.com/schema/registry.json",
				name: REGISTRY_NAME,
				homepage: SITE_URL,
				items: index,
			}),
		);
	}

	written.push(await writeJson("r/specs.json", { site: SITE_URL, specs }));

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
