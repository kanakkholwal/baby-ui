import type { Framework } from "@baby-ui/registry-schema";

export type SourceVariant = { code: string; lang: string; html: string };
export type SourceFile = {
	path: string;
	jsPath: string | null;
	ts: SourceVariant;
	js: SourceVariant | null;
};
export type InstallSource = {
	files: SourceFile[];
	css: { code: string; html: string } | null;
};

/** Where the page fetches `installSource` from; the real route, so reroutes never apply. */
export const installSourceUrl = (category: string, slug: string, framework: Framework) =>
	`/components/${category}/${slug}/source/${framework}.json`;
