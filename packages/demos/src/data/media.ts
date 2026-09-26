/** Picsum stock photo by id, cropped to size; served with CORS headers. */
export const photo = (id: number, width: number, height: number) =>
	`https://picsum.photos/id/${id}/${width}/${height}`;

/** Stock portrait by pravatar index. */
export const avatar = (index: number) => `https://i.pravatar.cc/160?img=${index}`;

/** Brand logos from the Simple Icons CDN; used as a mask so they take the text colour. */
export const BRANDS = [
	{ name: "Vercel", logo: "https://cdn.simpleicons.org/vercel" },
	{ name: "GitHub", logo: "https://cdn.simpleicons.org/github" },
	{ name: "Stripe", logo: "https://cdn.simpleicons.org/stripe" },
	{ name: "Figma", logo: "https://cdn.simpleicons.org/figma" },
	{ name: "Notion", logo: "https://cdn.simpleicons.org/notion" },
	{ name: "Linear", logo: "https://cdn.simpleicons.org/linear" },
	{ name: "Supabase", logo: "https://cdn.simpleicons.org/supabase" },
	{ name: "Cloudflare", logo: "https://cdn.simpleicons.org/cloudflare" },
];
