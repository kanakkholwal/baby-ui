import { FRAMEWORKS, type Framework } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { error, json } from "@sveltejs/kit";
import { installSource } from "$lib/install-source.server";
import { findSpec } from "$lib/registry";
import type { EntryGenerator, RequestHandler } from "./$types";

export const prerender = true;

// Every port of every component, charts included: the page fetches these, nothing links them.
export const entries: EntryGenerator = () =>
	specs.flatMap((spec) =>
		FRAMEWORKS.filter((f) => spec.impl[f]).map((framework) => ({
			category: spec.category,
			slug: spec.slug,
			framework,
		})),
	);

export const GET: RequestHandler = async ({ params }) => {
	const spec = findSpec(params.category, params.slug);
	const framework = params.framework as Framework;
	if (!spec?.impl[framework]) throw error(404);
	return json(await installSource(spec.slug, framework));
};
