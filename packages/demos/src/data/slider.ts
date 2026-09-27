/** Per-look demo copy, after beUI's previews: what each slider is measuring and how it reads. */
export const SLIDER_PRESETS: Record<
	string,
	{ label: string; format: (value: number) => string }
> = {
	default: { label: "Volume", format: (v) => String(v) },
	track: { label: "Build time", format: (v) => `${v} hours` },
	inline: { label: "Icon size", format: (v) => `${v}px` },
	bubble: { label: "Hourly rate", format: (v) => `$${v}/hr` },
	fluid: { label: "Brightness", format: (v) => `${v}%` },
	wave: { label: "Gain", format: (v) => `${v} dB` },
	ruler: { label: "Weight", format: (v) => `${v} kg` },
};

export const SLIDER_MARKS = [
	{ value: 0, label: "0" },
	{ value: 25, label: "25" },
	{ value: 50, label: "50" },
	{ value: 75, label: "75" },
	{ value: 100, label: "100" },
];
