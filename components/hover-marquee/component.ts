import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { hoverMarquee as hoverMarqueeVariants } from "./variants";

const VARIANTS = ["ellipsis", "fade"];

export const hoverMarquee = defineComponent({
	slug: "hover-marquee",
	name: "Hover Marquee",
	description:
		"Truncated text that slides right to left on hover or focus to reveal the rest.",
	category: "text",
	status: "alpha",
	variants: variantsOf(hoverMarqueeVariants, ["variant"]),
	props: [
		{
			name: "text",
			type: "string",
			description: "The full single-line text.",
			required: true,
			control: { kind: "text" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "How the clipped text ends at rest: an ellipsis or a soft fade.",
			default: "ellipsis",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "pixelsPerSecond",
			type: "number",
			description:
				"Slide speed. Duration scales with the hidden width, between 0.6s and 8s.",
			default: "45",
			control: { kind: "number", min: 10, max: 200, step: 5 },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"No slide; the ellipsis stays and the full text becomes the native title.",
		behaviour: [
			"Slides to the end at a steady speed on pointer enter or focus, and back in 250ms on leave.",
		],
	},
	a11y: {
		notes: [
			"Focusable, so keyboard users get the same reveal as pointer users.",
			"The full text stays in the DOM; only the visual is clipped.",
		],
	},
	guidance: {
		when: [
			"Chat titles, sidebar rows and headers where a single line is all the room there is.",
		],
		whenNot: [
			{ text: "Paths or ids where both ends matter.", use: "middle-truncation" },
			{ text: "Prose that can wrap.", use: "typography" },
		],
		responsive: ["Overflow is measured on each hover, so resizing needs no observer."],
		performance: ["Only a transform is animated."],
		ai: ["Give it a width through the parent or className; it never sets one itself."],
	},
	impl: {
		react: { entry: "HoverMarquee" },
		svelte: { entry: "HoverMarquee" },
	},
	keywords: ["marquee", "truncate", "ellipsis", "hover", "scroll text"],
});
