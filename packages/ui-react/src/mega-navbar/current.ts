/** A group's trigger is current anywhere under its href. */
export function isCurrentSection(href: string, active?: string): boolean {
	if (!active) return false;
	return active === href || active.startsWith(`${href}/`);
}

type Linked = { href: string };

/** Every link a navbar renders: group items, their "more" links, then plain links. */
export function groupHrefs(
	groups: readonly { items: readonly Linked[]; more?: { links: readonly Linked[] } }[],
	links: readonly Linked[] = [],
): string[] {
	return [
		...groups.flatMap((group) => [...group.items, ...(group.more?.links ?? [])]),
		...links,
	].map((link) => link.href);
}

/** The single current link: the longest href `active` sits under, so `/docs` stays unlit on
 * `/docs/installation` beside its own link. */
export function currentHref(
	hrefs: readonly string[],
	active?: string,
): string | undefined {
	let best: string | undefined;
	for (const href of hrefs) {
		if (isCurrentSection(href, active) && href.length > (best?.length ?? -1)) best = href;
	}
	return best;
}
