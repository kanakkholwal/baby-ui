import { PACKS } from "@baby-ui/registry-schema/packs";
import { cardItems } from "#lib/server/registry.js";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = () => ({
	packs: PACKS.map((pack) => ({
		id: pack.id,
		label: pack.label,
		blurb: pack.blurb,
		names: cardItems([...pack.slugs]).map((item) => item.name),
	})),
});
