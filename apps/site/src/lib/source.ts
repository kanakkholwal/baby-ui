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

/** Highlighted install source, pre-built into static/source by scripts/build-source-json.mjs. */
export const installSourceUrl = (slug: string, framework: Framework) =>
	`/source/${slug}/${framework}.json`;
