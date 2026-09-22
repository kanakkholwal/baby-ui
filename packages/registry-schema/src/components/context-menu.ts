import { defineComponent } from "../index";

export const contextMenu = defineComponent({
	slug: "context-menu",
	name: "Context Menu",
	description: "Right-click menu positioned at the pointer, clamped to the viewport.",
	category: "base",
	status: "alpha",
	props: [],
	motion: {
		springs: [],
		reducedMotion: "The menu appears without the scale.",
		behaviour: [
			"Opens at the pointer and is clamped so it never renders partly off screen (Radix/bits-ui popper collision detection).",
			"A submenu opens to the right of its trigger on hover or click/arrow-right/enter.",
		],
	},
	a11y: {
		role: "menu",
		keyboard: [
			"Escape closes the entire menu, including any open submenu",
			"On a submenu trigger: ArrowRight or Enter opens it and focuses its first item",
			"Inside an open submenu: ArrowLeft closes just that submenu and returns focus to its trigger",
		],
		notes: [
			"Right-click has no keyboard equivalent on every platform, so anything here must also be reachable another way.",
			"Positioning, focus trapping, roving tabindex, outside-dismiss and portaling are all delegated to Radix UI (React) and bits-ui (Svelte); this component only owns the classes and data-slots.",
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
				{ path: "lib/menu.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"@radix-ui/react-context-menu",
			],
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
				{ path: "context-menu/context-menu-shortcut.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-sub.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-sub-content.svelte", type: "registry:ui" },
				{ path: "context-menu/context-menu-sub-trigger.svelte", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/menu.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "bits-ui"],
		},
	},
	keywords: ["context", "menu", "overlay"],
});
