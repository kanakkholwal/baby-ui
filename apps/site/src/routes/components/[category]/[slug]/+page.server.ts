import { components } from "virtual:docvia/source";
import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORKS } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { highlight, langFor } from "$lib/highlight";
import { findSpec } from "$lib/registry";
import { sourceFiles } from "$lib/registry-items";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404, `No ${params.category} component named "${params.slug}"`);

	const doc = await components.getPage([params.slug]);

	const ports = await Promise.all(
		FRAMEWORKS.filter((f) => spec.impl[f]).map(async (framework: Framework) => {
			const files = await Promise.all(
				sourceFiles(spec.slug, framework).map(async (file) => {
					const tsLang = langFor(file.path);
					const jsLang = file.jsPath ? langFor(file.jsPath) : tsLang;
					return {
						path: file.path,
						jsPath: file.jsPath,
						ts: { code: file.ts, lang: tsLang, html: await highlight(file.ts, tsLang) },
						js: file.js
							? { code: file.js, lang: jsLang, html: await highlight(file.js, jsLang) }
							: null,
					};
				}),
			);
			const dependencies = spec.impl[framework]?.dependencies ?? [];
			const depCommand = `pnpm add ${dependencies.join(" ")}`;
			return {
				framework,
				dependencies,
				depsHtml: await highlight(depCommand, "bash"),
				files,
			};
		}),
	);

	return { spec, ports, prose: doc?.content ?? null };
};
