import type { Framework } from "@baby-ui/registry-schema";
import sources from "./generated/sources.json";

export type SourceFile = {
	path: string;
	target: string;
	ts: string;
	js: string | null;
	jsPath: string | null;
};

const BY_SLUG = sources as Record<string, Partial<Record<Framework, SourceFile[]>>>;

export function sourceFiles(slug: string, framework: Framework): SourceFile[] {
	return BY_SLUG[slug]?.[framework] ?? [];
}

/** Namespaced form, matching what the install command shows. */
export function installCommand(slug: string, framework: Framework, site: string): string {
	return framework === "react"
		? `npx shadcn@latest add ${site}/r/${slug}.json`
		: `npx shadcn-svelte@latest add ${site}/svelte/r/${slug}.json`;
}
