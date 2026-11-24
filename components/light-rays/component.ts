import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { lightRays as lightRaysVariants } from "./variants";

const VARIANTS = ["soft", "crisp"];
const TONES = ["primary", "spectrum", "ember", "mono"];
const SPEEDS = ["slow", "normal", "fast"];
const POSITIONS = ["absolute", "fixed"];

export const lightRays = defineComponent({
	slug: "light-rays",
	name: "Light Rays",
	description:
		"Vertical shafts of light that fade up, hold and fade out, drawn in WebGL from theme tokens.",
	category: "backgrounds",
	status: "stable",
	variants: variantsOf(lightRaysVariants, ["variant", "tone", "speed", "position"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "`soft` is a few wide hazy shafts; `crisp` is many fine hairlines.",
			default: "soft",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description: "Token palette the beams sample across.",
			default: "primary",
			control: { kind: "select", options: TONES },
		},
		{
			name: "speed",
			type: SPEEDS.map((v) => `"${v}"`).join(" | "),
			description: "How fast beams rise, hold and fade.",
			default: "normal",
			control: { kind: "select", options: SPEEDS },
		},
		{
			name: "position",
			type: POSITIONS.map((v) => `"${v}"`).join(" | "),
			description: "Fill the nearest positioned parent, or the viewport.",
			default: "absolute",
			control: { kind: "none" },
		},
		{
			name: "intensity",
			type: "number",
			description: "Beam strength, 0 to 2.",
			default: 1,
			control: { kind: "number", min: 0, max: 2, step: 0.1 },
		},
		{
			name: "count",
			type: "number",
			description: "Beams alive at once, 1 to 64. Defaults to 17 for soft, 36 for crisp.",
			control: { kind: "number", min: 1, max: 64, step: 1 },
		},
		{
			name: "seed",
			type: "number",
			description: "Reshuffles beam positions, widths and phases.",
			default: 34,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description: "Content layered above the beams.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "One static frame is drawn and nothing moves.",
		behaviour: [
			"The frame loop runs at 30fps and pauses while the element is off screen or the tab is hidden.",
			"Colours resolve from theme tokens and resample when the theme changes.",
			"The canvas stays transparent until the first frame, then fades in. Without WebGL nothing is drawn.",
		],
	},
	a11y: {
		keyboard: [],
		notes: ["The canvas is aria-hidden; children stay in the reading order."],
	},
	impl: {
		react: {
			entry: "LightRays",
		},
		svelte: {
			entry: "LightRays",
		},
	},
	keywords: ["background", "rays", "light", "beams", "webgl", "shader", "hero"],
});
