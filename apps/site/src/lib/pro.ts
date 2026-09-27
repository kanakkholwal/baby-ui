import type { DemoLoader } from "@baby-ui/demos/svelte";
import type { Component } from "svelte";

// The only client-safe module reaching into the optional pro/ checkout. Each glob matches
// nothing in a public checkout, and builds without `__SHOW_PRO__` drop them entirely.

// Prop types live in the Pro repo, which public CI never checks out.
// biome-ignore lint/suspicious/noExplicitAny: see above
type AnyComponent = Component<any>;
type Lazy<T> = Record<string, () => Promise<T>>;
type Samples = Record<string, Record<string, unknown>>;
type Template = { default: Component<Record<string, unknown>> };

const bySlug = <T>(globbed: Record<string, T>, suffix: string) =>
	Object.fromEntries(
		Object.entries(globbed).map(([path, value]) => [
			path.slice(path.lastIndexOf("/") + 1, -suffix.length),
			value,
		]),
	);
const first = <T>(globbed: Lazy<T>) => Object.values(globbed)[0]?.();

/** Pro demos by slug, following the public `<slug>-demo.svelte` convention. */
export const proDemos: Record<string, DemoLoader> = bySlug(
	__SHOW_PRO__
		? (import.meta.glob("$pro/demos/src/svelte/*-demo.svelte") as Record<
				string,
				DemoLoader
			>)
		: {},
	"-demo.svelte",
);

const screens: Lazy<{ default: AnyComponent }> = __SHOW_PRO__
	? import.meta.glob<{ default: AnyComponent }>("$pro/demos/src/screens/*-screen.svelte")
	: {};
// biome-ignore lint/suspicious/noExplicitAny: typed in the Pro repo
const screenSample: Lazy<Record<string, any>> = __SHOW_PRO__
	? import.meta.glob("$pro/demos/src/screens/sample.ts")
	: {};

/** A Pro screen and its sample data, or undefined when this build has no Pro. */
export async function proScreen(name: string) {
	const load = bySlug(screens, "-screen.svelte")[name];
	if (!load || !Object.keys(screenSample).length) return undefined;
	const [mod, sample] = await Promise.all([load(), first(screenSample)]);
	return sample && { Screen: mod.default, sample };
}

export const proEmailTemplates: Lazy<Template> = __SHOW_PRO__
	? import.meta.glob<Template>("$pro/svelte/src/lib/email-*/email-*.svelte")
	: {};
export const proOgTemplates: Lazy<Template> = __SHOW_PRO__
	? import.meta.glob<Template>("$pro/svelte/src/lib/og-*/og-*.svelte")
	: {};

const emailSamples: Lazy<Samples> = __SHOW_PRO__
	? import.meta.glob<Samples>("$pro/demos/src/data/email-samples.ts", {
			import: "EMAIL_SAMPLES",
		})
	: {};
const ogSamples: Lazy<Samples> = __SHOW_PRO__
	? import.meta.glob<Samples>("$pro/demos/src/data/og-samples.ts", {
			import: "OG_SAMPLES",
		})
	: {};

/** Sample props for a Pro email or OG template, when Pro is present. */
export const proEmailSample = async (slug: string) => (await first(emailSamples))?.[slug];
export const proOgSample = async (slug: string) => (await first(ogSamples))?.[slug];
