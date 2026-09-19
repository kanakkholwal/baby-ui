import { components } from "virtual:docvia/source";
import type { Framework } from "@baby-ui/registry-schema";
import { FRAMEWORKS } from "@baby-ui/registry-schema";
import { error } from "@sveltejs/kit";
import { highlight, langFor } from "$lib/highlight";
import { findSpec } from "$lib/registry";
import { installCommand, registryItem } from "$lib/registry-items";
import { SITE_URL } from "$lib/site";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	if (!spec) throw error(404, `No ${params.category} component named "${params.slug}"`);

	const doc = await components.getPage([params.slug]);

	const ports = await Promise.all(
		FRAMEWORKS.filter((f) => spec.impl[f]).map(async (framework: Framework) => {
			const install = installCommand(spec.slug, framework, SITE_URL);
			const files = await Promise.all(
				(registryItem(spec.slug, framework)?.files ?? []).map(async (file) => {
					const lang = langFor(file.path);
					return {
						path: file.path,
						code: file.content,
						lang,
						html: await highlight(file.content, lang),
					};
				}),
			);
			return {
				framework,
				install,
				installHtml: await highlight(install, "bash"),
				dependencies: spec.impl[framework]?.dependencies ?? [],
				files,
			};
		}),
	);

	return { spec, ports, prose: doc?.content ?? null };
};
