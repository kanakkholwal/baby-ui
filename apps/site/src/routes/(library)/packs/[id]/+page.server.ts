import { findPack, PACKS } from "@baby-ui/registry-schema/packs";
import { error } from "@sveltejs/kit";
import { cardItems } from "#lib/server/registry.js";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = () => PACKS.map((pack) => ({ id: pack.id }));

export const load: PageServerLoad = ({ params }) => {
	const pack = findPack(params.id);
	if (!pack) error(404, "No such pack");
	return {
		pack: { id: pack.id, label: pack.label, blurb: pack.blurb },
		items: cardItems([...pack.slugs]),
		others: PACKS.filter((p) => p.id !== pack.id).map((p) => ({
			id: p.id,
			label: p.label,
		})),
	};
};
