export type Product = {
	name: string;
	tag: string;
	headline: string;
	blurb: string;
	href: string;
};

/** Sibling products from nexonauts.com, shown one at a time under the rail. */
export const PRODUCTS: Product[] = [
	{
		name: "Docvia",
		headline: "Markdown in, typed modules out.",
		tag: "Build tool",
		blurb: "Pre-rendered docs for React and Svelte. This site runs on it.",
		href: "https://docvia.dev/?ref=baby-ui",
	},
	{
		name: "Orbit",
		headline: "Every PDF job, in the tab.",
		tag: "PDF",
		blurb: "Merge, split, sign and compress without uploading anything.",
		href: "https://orbit.nexonauts.com/?ref=baby-ui",
	},
	{
		name: "Glyphtex",
		headline: "LaTeX that compiles as you type.",
		tag: "LaTeX",
		blurb: "A browser editor with in-tab compile and Git history.",
		href: "https://glyphtex.nexonauts.com/?ref=baby-ui",
	},
	{
		name: "Recast",
		headline: "Record once, edit as you go.",
		tag: "Recorder",
		blurb: "A screen recorder that cuts, zooms and captions while you record.",
		href: "https://recast.li/?ref=baby-ui",
	},
];

/** Stable pick per page, so a component always shows the same neighbour. */
export function productFor(seed: string): Product {
	let h = 0;
	for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
	return PRODUCTS[h % PRODUCTS.length];
}
