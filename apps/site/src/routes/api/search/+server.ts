import { docviaSource } from "virtual:docvia/source";
import { createFromSource, createSearchHandler } from "@docvia/search";
import { specs } from "$lib/server/registry";
import type { RequestHandler } from "./$types";

// Queries arrive as `?q=`, so this runs in the Worker instead of being prerendered.
export const prerender = false;

type Collection =
	(typeof docviaSource.collections)[keyof typeof docviaSource.collections];

const retired = new Set(specs.filter((s) => s.retired).map((s) => s.slug));

// Drafts (the hidden changelog) 404 as pages and retired components are unlisted, so
// neither shows up in search.
const published = (collection: Collection) => ({
	getPages: () => collection.getPages(),
	getPage: async (slugs: string[]) => {
		const page = await collection.getPage(slugs);
		const data = page?.data as { draft?: boolean; component?: string } | undefined;
		if (data?.draft || (data?.component && retired.has(data.component))) return undefined;
		return page;
	},
});

// Built on the first query and kept for the life of the Worker instance.
let handler: Promise<(request: Request) => Promise<Response>> | null = null;
const getHandler = () =>
	(handler ??= createFromSource({
		collections: Object.fromEntries(
			Object.entries(docviaSource.collections).map(([name, c]) => [name, published(c)]),
		),
	}).then(createSearchHandler));

export const GET: RequestHandler = async ({ request }) => (await getHandler())(request);
