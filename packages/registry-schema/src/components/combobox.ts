import { defineComponent } from "../index";

export const combobox = defineComponent({
	slug: "combobox",
	name: "Combobox",
	description:
		"A Popover whose content is a Command: searchable selection, shadcn/ui's own recipe.",
	category: "base",
	status: "alpha",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state. Bindable.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The list appears without the scale, and rows no longer stagger in.",
		behaviour: [
			"Positioning, dismiss and layout are Popover's; filtering, the active-row marker and keyboard nav are Command's. Combobox itself adds no motion of its own.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow keys move through the filtered results",
			"Enter selects the highlighted result",
			"Escape closes the list",
		],
		notes: [
			"aria-activedescendant points at the highlighted option, so focus stays in the input while the list is navigated.",
			"The empty state is rendered rather than collapsing the list, so the absence of matches is announced.",
			"There is no dedicated Combobox markup: ComboboxTrigger/ComboboxContent are thin Popover wrappers, and ComboboxInput/List/Empty/Group/Item are Command's own parts re-exported under a Combobox-friendly name.",
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
			entry: "Combobox",
			files: [
				{ path: "combobox/combobox.tsx", type: "registry:ui" },
				{ path: "popover/popover.tsx", type: "registry:ui" },
				{ path: "command/command.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "@floating-ui/dom"],
		},
		svelte: {
			entry: "Combobox",
			files: [
				{ path: "combobox/combobox.svelte", type: "registry:ui" },
				{ path: "combobox/combobox-trigger.svelte", type: "registry:ui" },
				{ path: "combobox/combobox-content.svelte", type: "registry:ui" },
				{ path: "popover/popover.svelte", type: "registry:ui" },
				{ path: "popover/popover-trigger.svelte", type: "registry:ui" },
				{ path: "popover/popover-content.svelte", type: "registry:ui" },
				{ path: "popover/context.ts", type: "registry:ui" },
				{ path: "command/command.svelte", type: "registry:ui" },
				{ path: "command/command-input.svelte", type: "registry:ui" },
				{ path: "command/command-list.svelte", type: "registry:ui" },
				{ path: "command/command-empty.svelte", type: "registry:ui" },
				{ path: "command/command-group.svelte", type: "registry:ui" },
				{ path: "command/command-item.svelte", type: "registry:ui" },
				{ path: "command/context.ts", type: "registry:ui" },
				{ path: "command/variants.ts", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "@floating-ui/dom"],
		},
	},
	keywords: ["combobox", "overlay"],
});
