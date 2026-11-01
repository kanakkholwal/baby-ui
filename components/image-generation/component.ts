import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { imageGeneration as imageGenerationVariants } from "./variants";

const VARIANTS = ["compact", "fluid"];
const STATUSES = ["queued", "generating", "refining", "complete", "error"];

export const imageGeneration = defineComponent({
	slug: "image-generation",
	name: "Image Generation",
	description:
		"An image being made: a drifting dot field, then a blur that sharpens into the picture, with a status line, the prompt and a retry.",
	category: "agents",
	status: "beta",
	added: "2026-10-31",
	variants: variantsOf(imageGenerationVariants, ["variant"]),
	props: [
		{
			name: "status",
			type: STATUSES.map((s) => `"${s}"`).join(" | "),
			description:
				"ImageGeneration: where the image is. Drive it from your request; `refining` shows a soft preview through the field.",
			default: "generating",
			control: { kind: "select", options: STATUSES },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"ImageGeneration: `compact` is a 13rem tile for a chat turn; `fluid` fills its container.",
			default: "compact",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "label",
			type: "string",
			description:
				"ImageGenerationFrame: what the image is, read in its place: the prompt while it is made, a description once it is ready.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "aspectRatio",
			type: "string",
			description:
				"ImageGenerationFrame: reserved before the image exists, so nothing jumps when it lands.",
			default: '"1 / 1"',
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<Record<status, string>>",
			description:
				'ImageGenerationStatus: replaces the line for any status, e.g. `{ generating: "Painting" }`.',
			control: { kind: "none" },
		},
		{
			name: "onClick",
			type: "() => void",
			description:
				"ImageGenerationRetry: starts again. The button shows only after a failure.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"ImageGeneration: ImageGenerationFrame (ImageGenerationMedia, ImageGenerationField, ImageGenerationBadge), ImageGenerationCaption (ImageGenerationStatus, ImageGenerationPrompt), ImageGenerationRetry.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The dot field draws one still frame and the mark stops turning; the image fades in without blur or scale.",
		behaviour: [
			"The dot field swells around a point that wanders slowly, or follows a fine pointer inside the frame.",
			"The image sharpens from blur and a slight scale through queued, generating, refining and complete.",
			"The status line rises in when it changes; the four-square mark turns until the image is done.",
		],
	},
	a11y: {
		notes: [
			"The frame is an image named by its label; the busy state is on the root while it is made.",
			"Status changes are read from a polite live region.",
			"The dot field stops when offscreen and when the image is done.",
		],
	},
	guidance: {
		when: [
			"A chat turn or canvas where an agent makes an image and the person waits for it.",
		],
		whenNot: [
			{ text: "A plain placeholder while any image loads.", use: "skeleton" },
			{ text: "An indeterminate wait with no image to reveal.", use: "loading-state" },
		],
		responsive: [
			"The frame keeps its aspect ratio at any width; `compact` caps it at 13rem.",
		],
		performance: [
			"One canvas per frame, capped at 2x pixel density, drawing only while generating and on screen.",
		],
		ai: [
			"Set `label` to the prompt while generating and to a real description once complete.",
			"Show `refining` with a low-resolution preview in ImageGenerationMedia when the model streams one.",
		],
	},
	licenseOrigin: {
		source: "beui",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},
	// Files, npm and registry dependencies are derived from each port's imports by pnpm gen.
	impl: {
		react: { entry: "ImageGeneration" },
		svelte: { entry: "ImageGeneration" },
	},
	keywords: ["image", "generation", "ai", "dither", "placeholder", "agent", "prompt"],
});
