import type { Framework } from "@baby-ui/registry-schema";

export type UsageSnippet = { path: string; ts: string; js: string | null };

type UsageModule = { default: Partial<Record<Framework, UsageSnippet>> };

// One module per component instead of one combined import: a request for a single slug
// only ever loads that slug's file, not every component's source text.
const modules = import.meta.glob<UsageModule>("./generated/usage/*.json");

export async function usageSnippet(
	slug: string,
	framework: Framework,
): Promise<UsageSnippet | null> {
	const load = modules[`./generated/usage/${slug}.json`];
	if (!load) return null;
	const mod = await load();
	return mod.default[framework] ?? null;
}
