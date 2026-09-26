import { docviaSource } from "virtual:docvia/source";
import { createFromSource, createSearchHandler } from "@docvia/search";
import type { RequestHandler } from "./$types";

// Queries arrive as `?q=`, so this runs in the Worker instead of being prerendered.
export const prerender = false;

type Collection =
	(typeof docviaSource.collections)[keyof typeof docviaSource.collections];

// Drafts (the hidden changelog) 404 as pages, so they stay out of search too.
const published = (collection: Collection) => ({
	getPages: () => collection.getPages(),
	getPage: async (slugs: string[]) => {
		const page = await collection.getPage(slugs);
		return (page?.data as { draft?: boolean } | undefined)?.draft ? undefined : page;
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
