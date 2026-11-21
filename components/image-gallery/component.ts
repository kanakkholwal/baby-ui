import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { imageGallery as imageGalleryVariants } from "./variants";

const VARIANTS = ["masonry", "grid", "bento"];

export const imageGallery = defineComponent({
	slug: "image-gallery",
	name: "Image Gallery",
	description:
		"Responsive picture gallery that keeps each picture's ratio, with hover info, selection mode and an empty state.",
	category: "advanced",
	status: "alpha",
	variants: variantsOf(imageGalleryVariants, ["variant"]),
	props: [
		{
			name: "images",
			type: "{ src: string; alt: string; width?: number; height?: number; caption?: string }[]",
			description:
				"The pictures. Width and height reserve each one's height before it loads.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"Flowing columns that keep each ratio, even cropped squares, or a bento mix where every fifth picture is a large tile.",
			default: "masonry",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "selectable",
			type: "boolean",
			description: "Selection mode: a click toggles the picture instead of opening it.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "selected",
			type: "number[]",
			description:
				"Indexes of the selected pictures. Controlled, or `defaultSelected` to let it drive itself.",
			default: "[]",
			control: { kind: "none" },
		},
		{
			name: "columnWidth",
			type: "number",
			description:
				"Preferred column width in rem; the column count follows the available width.",
			default: "14",
			control: { kind: "number", min: 8, max: 24, step: 1 },
		},
		{
			name: "onOpen",
			type: "(index: number) => void",
			description:
				"Called with the picture's index outside selection mode; pair it with Image Viewer.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Pictures stop zooming on hover; the info and the selection tick change by opacity and colour only.",
		behaviour: [
			"A picture eases up 3% on hover; its info rises in over the lower edge, and on keyboard focus too.",
			"Selecting a picture shrinks it slightly and fills the tick.",
		],
	},
	a11y: {
		notes: [
			"Each picture is a button: outside selection mode it announces `Open <alt>`; in selection mode it is a toggle with aria-pressed.",
			"Hover info is also shown on keyboard focus.",
		],
	},
	guidance: {
		when: ["A set of pictures to browse, then open one in the Image Viewer."],
		whenNot: [
			{ text: "A swipeable strip.", use: "carousel" },
			{ text: "One picture in a lightbox.", use: "image-viewer" },
		],
		responsive: [
			"The column count follows the width through CSS column-width; no breakpoints.",
		],
		performance: ["Pictures load lazily; give width and height to avoid layout shift."],
		ai: [
			"Wire onOpen to ImageViewer's index and open. Put EmptyHeader and a button inside ImageGalleryEmpty.",
		],
	},
	impl: {
		react: { entry: "ImageGallery" },
		svelte: { entry: "ImageGallery" },
	},
	keywords: ["gallery", "masonry", "grid", "images", "photos", "selection"],
});
