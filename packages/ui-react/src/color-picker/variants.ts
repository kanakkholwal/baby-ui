import { tv, type VariantProps } from "tailwind-variants";

const thumb =
	"-translate-x-1/2 -translate-y-1/2 pointer-events-none absolute size-3.5 rounded-full border-2 border-white shadow-[0_1px_4px_rgb(0_0_0/0.5)]";

/**
 * One colour component, many shapes: `inline` is the full picker, `field` a swatch + hex field,
 * `area` the saturation square, `slider` the hue strip, `swatch` one disc, `swatches` a picker row.
 */
export const colorPicker = tv({
	slots: {
		// Sized to its content, a swatch plus "#RRGGBB", not the InputGroup's full width.
		field: "w-fit",
		trigger:
			"grid place-items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none",
		swatch: [
			"block shrink-0 rounded-md ring-1 ring-foreground/10 ring-inset",
			"transition-[scale,background-color] duration-150 ease-[var(--ease-out)] active:scale-[var(--press-scale-icon)] motion-reduce:transition-none",
		],
		hexInput: "w-[10ch] flex-none font-mono uppercase tabular-nums",
		content: "w-auto border-0 bg-transparent p-0 shadow-2xl",
		extras: "flex flex-wrap items-center gap-1.5 border-border border-t p-2",
		extrasLabel: "w-full font-mono text-[10px] text-muted-foreground uppercase",
		eyedropper:
			"ms-auto grid size-6 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5",
		// The square and the strip take the keyboard as well as the pointer.
		area: "relative w-full cursor-crosshair touch-none outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		areaThumb: thumb,
		slider: "flex flex-col gap-1.5",
		sliderHeader: "flex items-center justify-between font-medium text-foreground text-xs",
		sliderValue: "text-muted-foreground tabular-nums",
		track:
			"relative h-2.5 w-full cursor-ew-resize touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		trackThumb: [thumb, "top-1/2"],
		disc: "block shrink-0 rounded-full ring-1 ring-foreground/10 ring-inset",
		discs: "flex flex-wrap items-center gap-2",
		// A native radio sits under each disc, so arrow keys and forms work as radios do.
		discLabel:
			"relative block shrink-0 cursor-pointer transition-[scale] duration-150 ease-[var(--ease-out)] hover:scale-110 active:scale-[var(--press-scale-icon)] has-disabled:pointer-events-none has-disabled:opacity-50 motion-reduce:transition-none",
		// The chosen disc is ringed in its own colour, offset so the ring reads on any surface.
		discOption: [
			"block rounded-full ring-1 ring-foreground/10 ring-inset transition-[box-shadow] duration-150 ease-[var(--ease-out)] motion-reduce:transition-none",
			"peer-checked:shadow-[0_0_0_2px_var(--background),0_0_0_4px_var(--disc)]",
			"peer-focus-visible:outline-2 peer-focus-visible:outline-ring peer-focus-visible:outline-offset-4",
		],
	},
	variants: {
		variant: {
			inline: {},
			field: {},
			area: { area: "overflow-hidden rounded-xl" },
			slider: {},
			swatch: {},
			swatches: {},
		},
		size: {
			sm: {
				swatch: "size-4",
				area: "size-36",
				slider: "w-40",
				disc: "size-6",
				discOption: "size-6",
			},
			md: {
				swatch: "size-5",
				area: "size-48",
				slider: "w-48",
				disc: "size-8",
				discOption: "size-8",
			},
			lg: {
				swatch: "size-6",
				area: "size-60",
				slider: "w-60",
				disc: "size-10",
				discOption: "size-10",
			},
		},
	},
	compoundVariants: [
		// Inside the full picker the square spans the panel and sits flush with its top.
		{ variant: ["inline", "field"], class: { area: "h-36 w-full rounded-none" } },
	],
	defaultVariants: { variant: "inline", size: "md" },
});

export type ColorPickerVariant = NonNullable<VariantProps<typeof colorPicker>["variant"]>;
export type ColorPickerSize = NonNullable<VariantProps<typeof colorPicker>["size"]>;

/** Arrow keys move by 1, Shift by 10; the result is clamped to the channel's range. */
export function arrowStep(
	key: string,
	shift: boolean,
): { dx: number; dy: number } | null {
	const n = shift ? 10 : 1;
	if (key === "ArrowRight") return { dx: n, dy: 0 };
	if (key === "ArrowLeft") return { dx: -n, dy: 0 };
	if (key === "ArrowUp") return { dx: 0, dy: n };
	if (key === "ArrowDown") return { dx: 0, dy: -n };
	return null;
}

/** Reads a colour off screen through the EyeDropper API, where the browser has one. */
export async function pickScreenColor(): Promise<string | null> {
	const Dropper = (
		globalThis as { EyeDropper?: new () => { open(): Promise<{ sRGBHex: string }> } }
	).EyeDropper;
	if (!Dropper) return null;
	try {
		return (await new Dropper().open()).sRGBHex;
	} catch {
		return null;
	}
}

export const hasEyeDropper = () => "EyeDropper" in globalThis;
