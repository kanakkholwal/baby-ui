import { defineComponent } from "../index";

export const contextMenu = defineComponent({
	slug: "context-menu",
	name: "Context Menu",
	description: "Right-click menu positioned at the pointer, clamped to the viewport.",
	category: "base",
	status: "beta",
	props: [],
	motion: {
		springs: [],
		reducedMotion: "The menu appears without the scale.",
		behaviour: [
			"Opens at the pointer and is clamped so it never renders partly off screen.",
			"transform-origin is the top left corner, which is where the pointer is.",
		],
	},
	a11y: {
		role: "menu",
		keyboard: ["Escape closes the menu"],
		notes: [
			"Right-click has no keyboard equivalent on every platform, so anything here must also be reachable another way.",
			"The menu is positioned from the pointer, so it clamps to the viewport rather than flipping.",
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
			entry: "ContextMenu",
			files: [
				{ path: "context-menu/context-menu.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ContextMenu",
			files: [
				{ path: "context-menu/context-menu.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-trigger.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-content.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-item.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-label.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-separator.svelte", type: "registry:ui" },
				{ path: "context-menu/context.ts", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["context", "menu", "overlay"],
});
