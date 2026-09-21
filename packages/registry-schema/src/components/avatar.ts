import { defineComponent } from "../index";

export const avatar = defineComponent({
	slug: "avatar",
	name: "Avatar",
	description: "User image with initials underneath, shown until the image really loads.",
	category: "base",
	status: "stable",
	variants: { size: ["sm", "md", "lg", "xl"], shape: ["circle", "square"] },
	props: [
		{
			name: "src",
			type: "string",
			description:
				"AvatarImage source. The fallback renders until it loads, and stays if it errors.",
			control: { kind: "text", placeholder: "https://…" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Diameter of the avatar.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
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
				{ path: "avatar/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Avatar",
			files: [
				{ path: "avatar/avatar.svelte", type: "registry:ui" },
				{ path: "avatar/avatar-image.svelte", type: "registry:ui" },
				{ path: "avatar/avatar-fallback.svelte", type: "registry:ui" },
				{ path: "avatar/context.ts", type: "registry:ui" },
				{ path: "avatar/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["avatar", "profile", "user", "initials"],
});
