import { defineComponent } from "../index.ts";

export const form = defineComponent({
	slug: "form",
	name: "Form",
	description:
		"shadcn-svelte's form parts on formsnap and Superforms: typed fields with labels and errors wired for you. In React, use Field with react-hook-form.",
	category: "base",
	status: "beta",
	variants: { spacing: ["compact", "comfortable"] },
	props: [
		{
			name: "spacing",
			type: '"compact" | "comfortable"',
			description: "FormField only. Gap between label, control, description and errors.",
			default: "comfortable",
			control: { kind: "select", options: ["compact", "comfortable"] },
		},
		{
			name: "form",
			type: "SuperForm<T>",
			description:
				"FormField, FormFieldset and FormElementField. The object superForm() returns.",
			control: { kind: "none" },
		},
		{
			name: "name",
			type: "FormPath<T>",
			description:
				"The field's path in the form's data, type-checked against the schema.",
			control: { kind: "none" },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"formsnap wires the label, description and errors to the control with ids and aria-describedby, and sets aria-invalid from the field's errors.",
		],
	},
	licenseOrigin: {
		source: "shadcn-svelte",
		url: "https://github.com/huntabyte/shadcn-svelte",
		license: "MIT",
		copyright: "Copyright (c) 2023 Hunter Johnston, CokaKoala, shadcn",
	},
	impl: {
		svelte: {
			entry: "FormField",
			files: [
				{ path: "form/form-button.svelte", type: "registry:ui" },
				{ path: "form/form-description.svelte", type: "registry:ui" },
				{ path: "form/form-element-field.svelte", type: "registry:ui" },
				{ path: "form/form-field-errors.svelte", type: "registry:ui" },
				{ path: "form/form-field.svelte", type: "registry:ui" },
				{ path: "form/form-fieldset.svelte", type: "registry:ui" },
				{ path: "form/form-label.svelte", type: "registry:ui" },
				{ path: "form/form-legend.svelte", type: "registry:ui" },
				{ path: "form/control.ts", type: "registry:ui" },
				{ path: "form/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: [
				"clsx",
				"tailwind-merge",
				"tailwind-variants",
				"formsnap",
				"sveltekit-superforms",
			],
			registryDependencies: ["label", "button"],
		},
	},
	keywords: ["form", "formsnap", "superforms", "validation", "zod"],
});
