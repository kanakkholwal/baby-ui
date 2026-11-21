import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { loadedModels as loadedModelsVariants } from "./variants";

const VARIANTS = ["ghost", "secondary"];

export const loadedModels = defineComponent({
	slug: "loaded-models",
	name: "Loaded Models",
	description:
		"Popover that shows which models are in memory, their state and speed, with load and unload actions.",
	category: "advanced",
	status: "alpha",
	variants: variantsOf(loadedModelsVariants, ["variant"]),
	props: [
		{
			name: "models",
			type: "{ id: string; name: string; kind: string; state: 'loading' | 'ready' | 'idle'; status?: string; measurement?: { value: number; tone: string; label: string; badge?: string } }[]",
			description:
				"Every model the app knows about. `loading` and `ready` count as in memory; `idle` is set up but not loaded.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "The trigger button: quiet text, or a filled secondary button.",
			default: "ghost",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "open",
			type: "boolean",
			description: "Whether the popover is open. Bindable.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "onUnload",
			type: "(id: string) => void",
			description:
				"Adds an Unload action to models that are ready. Omit it and no button shows.",
			control: { kind: "none" },
		},
		{
			name: "onLoad",
			type: "(id: string) => void",
			description: "Adds a Load action to idle models. Omit it and no button shows.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The loading dot stops pulsing; colours still change.",
		behaviour: [
			"The popover opens with the shared anchored motion.",
			"The status dot and each row's dot change colour as a model moves between loading, ready and idle.",
		],
	},
	a11y: {
		notes: [
			'The trigger is named "Models in memory" whatever its visible label says.',
			"State is written out in each row, never colour alone.",
			"Load and Unload render only when their handlers are passed.",
		],
	},
	guidance: {
		when: [
			"Any app running local models that should answer what is using memory and how to free it.",
		],
		whenNot: [{ text: "A plain list of items with actions.", use: "popover" }],
		responsive: [
			"The panel is at most 30rem and never wider than the viewport minus 2rem.",
		],
		performance: ["Pure render of `models`; keep measurements in your own store."],
		ai: [
			"Map your engines to the `models` shape. Pass `measurement` only after a real speed test.",
		],
	},
	impl: {
		react: { entry: "LoadedModels" },
		svelte: { entry: "LoadedModels" },
	},
	keywords: ["models", "memory", "llm", "unload", "popover", "status"],
});
