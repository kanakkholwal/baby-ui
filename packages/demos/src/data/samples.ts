import { OG_SAMPLE_BY_PROPS } from "./og-samples";

// Auto demos import one typed sample per slug, named in SCREAMING_SNAKE (OG_BLOG_POST).
export * from "./demo-samples";
export * from "./email-samples";
export * from "./og-samples";

/** Samples that follow a control value, keyed by slug. */
export const SAMPLE_BY_PROPS: Record<
	string,
	(props: Record<string, unknown>) => Record<string, unknown>
> = { ...OG_SAMPLE_BY_PROPS };

/** Control values minus the unset ones, typed as the component's props (controls come from its spec). */
export function controlProps<Props>(props: Record<string, unknown> | undefined): Props {
	return Object.fromEntries(
		Object.entries(props ?? {}).filter(
			([, value]) => value !== undefined && value !== "",
		),
	) as Props;
}
