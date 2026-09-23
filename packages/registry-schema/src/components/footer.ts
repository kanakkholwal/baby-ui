import { defineComponent } from "../index";

export const footer = defineComponent({
	slug: "footer",
	name: "Footer",
	description:
		"Marketing site footer: brand and socials, link columns, an optional giant wordmark.",
	category: "blocks",
	status: "alpha",
	props: [
		{
			name: "columns",
			type: "FooterColumn[]",
			description: "Link columns shown beside the brand block.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "brand",
			type: "ReactNode",
			description: "Logo and wordmark slot above the description.",
			control: { kind: "none" },
		},
		{
			name: "description",
			type: "string",
			description: "One line under the brand.",
			control: { kind: "text" },
		},
		{
			name: "socials",
			type: "FooterSocialLink[]",
			description: "Icon links row under the description.",
			default: "[]",
			control: { kind: "none" },
		},
		{
			name: "copyright",
			type: "ReactNode",
			description: "Copyright line under the socials.",
			control: { kind: "none" },
		},
		{
			name: "wordmark",
			type: "string",
			description: "Giant animated background text. Omit to skip that section entirely.",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The wordmark's sheen stops sweeping and flattens to a two-stop gradient instead of freezing mid-sweep.",
		behaviour: [
			"The wordmark is a `background-clip: text` gradient sweeping left, matching the same shimmer family as Reasoning's own text shimmer.",
		],
	},
	a11y: {
		notes: ["A real <footer> landmark; the wordmark is decorative text, not a heading."],
	},
	impl: {
		react: {
			entry: "Footer",
			files: [
				{ path: "footer/footer.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Footer",
			files: [
				{ path: "footer/footer.svelte", type: "registry:ui" },
				{ path: "footer/types.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["footer", "site footer", "links", "marketing", "wordmark"],
});
