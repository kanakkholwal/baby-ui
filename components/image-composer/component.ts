import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { imageComposer as imageComposerVariants } from "./variants";

const VARIANTS = ["docked", "inline"];

export const imageComposer = defineComponent({
	slug: "image-composer",
	name: "Image Composer",
	description:
		"Prompt box for image generation with a shape toggle drawn as outlines, a model badge and a submit that becomes stop.",
	category: "advanced",
	status: "alpha",
	variants: variantsOf(imageComposerVariants, ["variant"]),
	props: [
		{
			name: "shape",
			type: "string",
			description:
				"The chosen shape's value. Controlled, or `defaultShape` to let it drive itself; starts at the first shape.",
			control: { kind: "none" },
		},
		{
			name: "shapes",
			type: "{ value: string; label: string; ratio: number }[]",
			description:
				"The choices. Defaults to square, portrait and landscape; each outline is drawn from its ratio.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "A card that docks at the bottom of a page, or no surface of its own.",
			default: "docked",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "loading",
			type: "boolean",
			description:
				"A picture is being made: the shape toggle locks and send becomes stop.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onSubmit",
			type: "(prompt: string, shape: string) => void",
			description: "Called with the trimmed prompt and the chosen shape.",
			control: { kind: "none" },
		},
		{
			name: "onStop",
			type: "() => void",
			description: "Called when stop is pressed while `loading`.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The shape pill and the send and stop icons change without sliding.",
		behaviour: [
			"The selected shape pill glides between options.",
			"The send icon swaps to stop with a short rise.",
		],
	},
	a11y: {
		notes: [
			'The shape group is named "Shape"; each outline is decorative and the label stays for assistive tech even when hidden on narrow screens.',
			"Enter sends, Shift+Enter adds a line, as in Composer.",
		],
	},
	guidance: {
		when: ["Text-to-image prompts where the output shape is a first-class choice."],
		whenNot: [{ text: "A plain chat box.", use: "composer" }],
		responsive: ["Shape labels hide below the sm breakpoint; the outlines stay."],
		performance: ["No effects of its own; Composer owns the input."],
		ai: [
			"Compose ComposerInput, ComposerToolbar, ImageComposerShapes and ImageComposerTools (with ImageComposerModel and ComposerSubmit) inside ImageComposer.",
		],
	},
	impl: {
		react: { entry: "ImageComposer" },
		svelte: { entry: "ImageComposer" },
	},
	keywords: ["image", "prompt", "generate", "aspect ratio", "shape", "composer"],
});
