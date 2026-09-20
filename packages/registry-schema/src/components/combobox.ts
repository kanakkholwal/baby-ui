import { defineComponent } from "../index";

export const combobox = defineComponent({
	slug: "combobox",
	name: "Combobox",
	description:
		"Filtering input with an anchored result list and full keyboard selection.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "options",
			type: "ComboOption[]",
			description: "All options; the list filters as you type.",
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "string",
			description: "Selected value. Bindable.",
			control: { kind: "text" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Shown when nothing is selected.",
			default: "Search\u2026",
			control: { kind: "text" },
		},
		{
			name: "emptyLabel",
			type: "string",
			description: "Shown when nothing matches.",
			default: "No matches",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The list appears without the scale.",
		behaviour: [
			"The list matches the input width and is repositioned as results filter, so it never hangs off a shorter list.",
			"Highlighting resets to the first result whenever the query changes.",
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
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "Combobox",
			files: [
				{ path: "combobox/combobox.svelte", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["combobox", "overlay"],
});
