/** One of every control PropertyPanelControls renders, as a card tweak panel. */
export const CARD_SCHEMA = {
	title: "Launch week",
	radius: [16, 0, 48],
	scale: [1, 0.5, 1.5],
	opacity: [0.9, 0, 1],
	padding: 24,
	accent: "#7dd3fc",
	visible: true,
	fit: { type: "select", options: ["cover", "contain", "fill"] },
	align: { type: "segmented", options: ["left", "center", "right"] },
	font: {
		type: "combobox",
		placeholder: "Pick a font",
		options: [
			{ value: "inter", label: "Inter" },
			{ value: "satoshi", label: "Satoshi" },
			{ value: "jetbrains", label: "JetBrains Mono" },
			{ value: "serif", label: "Source Serif" },
		],
	},
	shadow: {
		enabled: true,
		offsetY: [8, 0, 32],
		blur: [24, 0, 64],
	},
	reset: { type: "action", label: "Reset to defaults" },
} as const;
