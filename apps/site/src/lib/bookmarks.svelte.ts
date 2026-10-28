import { persisted } from "./persisted-state.svelte";

// Saved component slugs, newest first, in this browser only; no account or Pro needed.
const stored = persisted<string[]>("baby-ui:bookmarks", []);

// Storage is untrusted: another tab, an old build or a hand edit can leave junk or duplicates.
const list = (): string[] =>
	Array.isArray(stored.current)
		? [
				...new Set(
					stored.current.filter(
						(slug): slug is string => typeof slug === "string" && slug.length > 0,
					),
				),
			]
		: [];

export const bookmarks = {
	get slugs(): string[] {
		return list();
	},
	has(slug: string) {
		return list().includes(slug);
	},
	toggle(slug: string) {
		const current = list();
		stored.current = current.includes(slug)
			? current.filter((saved) => saved !== slug)
			: [slug, ...current];
	},
	/** Drops saved slugs the site no longer has, such as a removed or renamed component. */
	keepOnly(known: ReadonlySet<string>) {
		stored.current = list().filter((slug) => known.has(slug));
	},
};
