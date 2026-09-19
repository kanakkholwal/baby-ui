import { defineComponent } from "../index.js";

export const avatar = defineComponent({
	slug: "avatar",
	name: "Avatar",
	description: "User image with an initials fallback that shows only after the image actually fails.",
	category: "base",
	status: "stable",
	variants: { size: ["xs", "sm", "md", "lg"], shape: ["circle", "square"] },
	props: [
		{
			name: "src",
			type: "string",
			description: "Image URL. The fallback renders until it loads, and stays if it errors.",
			control: { kind: "text", placeholder: "https://…" },
		},
		{
			name: "name",
			type: "string",
			description: "Full name. Supplies the alt text and the initials fallback.",
			required: true,
			control: { kind: "text" },
		},
		{
			name: "size",
			type: '"xs" | "sm" | "md" | "lg"',
			description: "Diameter of the avatar.",
			default: "md",
			control: { kind: "select", options: ["xs", "sm", "md", "lg"] },
		},
		{
			name: "shape",
			type: '"circle" | "square"',
			description: "Circle for people, square for organisations.",
			default: "circle",
			control: { kind: "select", options: ["circle", "square"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The image appears without the fade.",
		behaviour: [
			"The image fades in over 200ms once loaded, so a cached image does not flash against the fallback.",
			"Initials are the first letter of the first and last word of `name`, uppercased.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"The image carries `name` as alt text; the initials fallback is aria-hidden because the name is already announced.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: {
			entry: "Avatar",
			files: [
				{ path: "avatar/avatar.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Avatar",
			files: [
				{ path: "avatar/avatar.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["avatar", "profile", "user", "initials"],
});
