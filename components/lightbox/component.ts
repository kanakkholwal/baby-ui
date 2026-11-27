import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { lightbox as lightboxVariants } from "./variants";

const VARIANTS = ["immersive", "themed"];

export const lightbox = defineComponent({
	slug: "lightbox",
	name: "Lightbox",
	description:
		"Full-screen lightbox that steps through a set of pictures, with zoom, pan, a filmstrip and a details panel.",
	category: "base",
	status: "alpha",
	variants: variantsOf(lightboxVariants, ["variant"]),
	props: [
		{
			name: "images",
			type: "{ src: string; alt: string; thumbnail?: string; width?: number; height?: number }[]",
			description:
				"The set to step through. Width and height let a picture lay out before it loads.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "open",
			type: "boolean",
			description: "Whether the viewer is shown. Bindable.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "index",
			type: "number",
			description:
				"The picture on show. Controlled, or `defaultIndex` to let it drive itself. On `LightboxTrigger` it is the picture that trigger opens, and the trigger becomes its thumbnail.",
			default: "0",
			control: { kind: "none" },
		},
		{
			name: "detailsOpen",
			type: "boolean",
			description: "Whether the details panel is open.",
			default: true,
			control: { kind: "none" },
		},
		{
			name: "origin",
			type: "(index: number) => HTMLElement | null | undefined",
			description:
				"Lightbox: the thumbnail element for a picture, so it flies out of and back into it. Triggers with an `index` register themselves, so this is only for tiles you render yourself.",
			control: { kind: "none" },
		},
		{
			name: "loop",
			type: "boolean",
			description: "Wrap from the last picture to the first, and back.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"A dark room for the picture in either theme, or the page's own surface.",
			default: "immersive",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The viewer still fades, but the picture neither flies nor slides, the filmstrip jumps instead of gliding and the zoom transform is not animated.",
		behaviour: [
			"Opens as a fade over the whole window while the picture flies out of its thumbnail over --duration-slow, clipped to the thumbnail until it lands.",
			"Closing sends a fitted picture back into its thumbnail over --duration-base, as long as the window takes to fade out; a zoomed picture just fades.",
			"Stepping to another picture slides it in 48px from the side it came from.",
			"A picture fades in once it has loaded; zoom and reset ease over 200ms, a drag follows the pointer with no easing.",
			"The details panel animates its width so the picture grows into the space.",
		],
	},
	a11y: {
		notes: [
			"A modal dialog: focus is trapped, Escape closes, and the page behind is inert.",
			"Keys: + and - zoom, 0 fits, arrows step between pictures while the picture is fitted.",
			"The counter is a polite live region; the filmstrip is a tablist with the current picture selected.",
		],
	},
	guidance: {
		when: [
			"Looking closely at one picture out of a set: a gallery, a generation history, attachments.",
		],
		whenNot: [
			{ text: "Comparing two versions of one picture.", use: "image-compare" },
			{ text: "A swipeable strip inside the page.", use: "carousel" },
		],
		responsive: [
			"The details panel hides below 768px; the toolbar and filmstrip scroll rather than wrap.",
		],
		performance: [
			"The neighbouring pictures are preloaded; the filmstrip uses `thumbnail` when given.",
		],
		ai: [
			"Compose parts inside LightboxContent. Read the current picture with useLightbox() to fill LightboxDetails.",
		],
	},
	impl: {
		react: { entry: "Lightbox" },
		svelte: { entry: "Lightbox" },
	},
	keywords: ["lightbox", "gallery", "zoom", "pan", "image", "preview", "slideshow"],
});
