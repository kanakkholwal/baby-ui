/** Picsum stock photo by id, cropped to size; served with CORS headers. */
export const photo = (id: number, width: number, height: number) =>
	`https://picsum.photos/id/${id}/${width}/${height}`;

/** Stock portrait by pravatar index; `size` in px, square. */
export const avatar = (index: number, size = 160) =>
	`https://i.pravatar.cc/${size}?img=${index}`;

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

/** Mux's public HLS test stream (Big Buck Bunny) with several renditions; served with CORS headers. */
export const SAMPLE_VIDEO = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";

/** The only bundled demo images (site static/demos): light/dark product shots, reuse them. */
const SHOTS = "/demos";
export const PRODUCT_SHOTS = {
	inbox: {
		light: `${SHOTS}/mail2-light.png`,
		dark: `${SHOTS}/mail2.png`,
		alt: "The workspace inbox with a conversation open",
		width: 2700,
		height: 1440,
	},
	payments: {
		light: `${SHOTS}/payments-light.png`,
		dark: `${SHOTS}/payments.png`,
		alt: "A payments dashboard with recent transfers",
		width: 1207,
		height: 929,
	},
	charts: {
		light: `${SHOTS}/charts-light.png`,
		dark: `${SHOTS}/charts.png`,
		alt: "An analytics dashboard with revenue charts",
		width: 2572,
		height: 868,
	},
};
