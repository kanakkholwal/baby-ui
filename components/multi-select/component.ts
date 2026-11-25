import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { multiSelect as multiSelectVariants } from "./variants";

export const multiSelect = defineComponent({
	slug: "multi-select",
	name: "Multi Select",
	description:
		"Pick several options from a searchable list; choices show as removable chips, with select all, clear and a +N overflow.",
	category: "base",
	status: "beta",
	variants: variantsOf(multiSelectVariants, ["size"]),
	props: [
		{
			name: "options",
			type: "{ value: string; label: string; keywords?: string; disabled?: boolean }[]",
			description: "Options, in the order chips and the list show them.",
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "string[]",
			description:
				"Selected values. Omit it (React) to let the field own the selection; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "open",
			type: "boolean",
			description:
				"Whether the list is open. Pair with `onOpenChange` in React; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "name",
			type: "string",
			description:
				"Submits each chosen value under this name, so the field works inside a native form.",
			control: { kind: "none" },
		},
		{
			name: "max",
			type: "number",
			description:
				"Most choices allowed. Once reached, unchosen options turn off and a note says so.",
			control: { kind: "number", min: 1, max: 8, step: 1 },
		},
		{
			name: "loading",
			type: "boolean",
			description:
				"Options are still loading: the list shows a status line and the field is marked busy.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onCreate",
			type: "(label: string) => void",
			description:
				'Offers "Create" for search text no option matches. Add the option and select it in the handler.',
			control: { kind: "none" },
		},
		{
			name: "clearable",
			type: "boolean",
			description: "Shows a button in the field that clears every chip.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "maxChips",
			type: "number",
			description: "Chips shown before the rest collapse into +N.",
			default: 3,
			control: { kind: "number", min: 1, max: 6, step: 1 },
		},
		{
			name: "size",
			type: '"sm" | "default" | "lg" | "xl"',
			description: "Field height.",
			default: "default",
			control: { kind: "select", options: ["sm", "default", "lg", "xl"] },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the field.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		role: "combobox",
		keyboard: [
			{ keys: ["Enter", "Space"], action: "Opens the list" },
			{
				keys: ["Backspace"],
				action: "On the field or in an empty search, removes the last chip",
			},
			{ keys: ["Arrow keys"], action: "Moves through options and Enter toggles one" },
		],
		notes: [
			"Each chip has its own labelled remove button.",
			"Chosen options read as selected, apart from the list's own highlight.",
		],
	},
	impl: {
		react: {
			entry: "MultiSelect",
		},
		svelte: {
			entry: "MultiSelect",
		},
	},
	keywords: ["multi select", "multiselect", "chips", "combobox", "tags", "select many"],
});
