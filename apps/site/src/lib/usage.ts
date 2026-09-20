import type { Framework } from "@baby-ui/registry-schema";
import usage from "./generated/usage.json";

export type UsageSnippet = { path: string; ts: string; js: string | null };

const BY_SLUG = usage as Record<string, Partial<Record<Framework, UsageSnippet>>>;

export function usageSnippet(slug: string, framework: Framework): UsageSnippet | null {
	return BY_SLUG[slug]?.[framework] ?? null;
}
