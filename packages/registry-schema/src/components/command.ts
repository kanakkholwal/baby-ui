import { defineComponent } from "../index";

export const command = defineComponent({
	slug: "command",
	name: "Command Palette",
	description: "Searchable action list driven entirely from the keyboard.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the palette is shown. Bindable.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Input placeholder.",
			default: "Type a command or search\u2026",
			control: { kind: "text" },
		},
		{
			name: "description",
			type: "string",
			description:
				"Sr-only description announced alongside the dialog's accessible name.",
			default: "Search for a command to run\u2026",
			control: { kind: "text" },
		},
		{
			name: "emptyLabel",
			type: "string",
			description: "Shown when nothing matches.",
			default: "No results",
			control: { kind: "text" },
		},
		{
			name: "variant",
			type: '"default" | "framed"',
			description:
				"`framed` insets the search input and results in the same rim as Dialog. `default` is a single flat surface, matching shadcn/ui's cmdk-based Command.",
			default: "default",
			control: { kind: "select", options: ["default", "framed"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The panel fades in place instead of dropping from above its shortcut.",
		behaviour: [
			"The panel scales and drops from above its shortcut, same duration tokens as Dialog.",
			"A single marker glides between rows on arrow keys, rather than repainting a background per row.",
			"The highlight resets to the first result on every keystroke.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow keys move through results",
			"Enter runs the highlighted command",
			"Escape closes the palette",
		],
		notes: [
			"aria-activedescendant keeps focus in the input while the list is navigated.",
			"CommandDialog carries a real, sr-only Title/Description (aria-labelledby/aria-describedby), matching shadcn's own pattern, rather than a bare aria-label.",
			"The palette is a real modal dialog (Base UI React, bits-ui Svelte), so the page behind it is inert without extra work; it also unmounts on close, so reopening always starts from an empty search with no special-cased reset.",
			"Filtering, roving highlight, keyboard nav (arrows, Home, End, Enter) and hiding empty groups/results are delegated to cmdk (React) and bits-ui's own `command` module (Svelte); this component only owns the sliding-highlight marker, motion and data-slots.",
			"Search is real fuzzy matching (cmdk's own scoring, bits-ui's own port of the same algorithm), not a plain case-insensitive substring check like the pre-migration version — a query can now match on a looser, ranked basis.",
			"The result count next to the input and a debounced live region both read from the same filtered count the primitive already tracks, so a screen reader and a sighted user see the same number.",
			"Part names and data-slot values match shadcn/ui, so this replaces an existing command without touching call sites.",
			'CommandHeader hoists into the dialog\'s rim (the same inset-frame treatment as Dialog and the Card `framed` variant); the card below it holds the search input and results. The "esc" cap is literal text, not the Shortcut glyph, since a spoken-word key name reads more clearly at this size.',
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
			entry: "Command",
			files: [
				{ path: "command/command.tsx", type: "registry:ui" },
				{ path: "command/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"cmdk",
				"@base-ui/react",
			],
			// Reuses Dialog's DIALOG_BACKDROP and DialogVariant type.
			registryDependencies: ["dialog"],
		},
		svelte: {
			entry: "Command",
			files: [
				{ path: "command/command.svelte", type: "registry:ui" },
				{ path: "command/command-dialog.svelte", type: "registry:ui" },
				{ path: "command/command-header.svelte", type: "registry:ui" },
				{ path: "command/command-input.svelte", type: "registry:ui" },
				{ path: "command/command-list.svelte", type: "registry:ui" },
				{ path: "command/command-empty.svelte", type: "registry:ui" },
				{ path: "command/command-group.svelte", type: "registry:ui" },
				{ path: "command/command-item.svelte", type: "registry:ui" },
				{ path: "command/command-shortcut.svelte", type: "registry:ui" },
				{ path: "command/command-separator.svelte", type: "registry:ui" },
				{ path: "command/context.ts", type: "registry:ui" },
				{ path: "command/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "bits-ui"],
			// Reuses Dialog's DIALOG_BACKDROP and DialogVariant type.
			registryDependencies: ["dialog"],
		},
	},
	keywords: ["command"],
});
