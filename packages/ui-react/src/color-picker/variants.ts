import { tv, type VariantProps } from "tailwind-variants";

/** `inline` shows the picker in place; `popover` puts it behind a swatch-and-hex trigger. */
export const colorPicker = tv({
	slots: {
		trigger: [
			"inline-flex h-9 items-center gap-2 rounded-lg border border-input bg-background ps-1.5 pe-3 text-sm",
			"outline-none transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
			"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none",
		],
		swatch: "size-6 shrink-0 rounded-md ring-1 ring-foreground/10 ring-inset",
		hex: "font-mono text-foreground text-xs uppercase tabular-nums",
		content: "w-auto border-0 bg-transparent p-0 shadow-2xl",
		extras: "flex flex-wrap items-center gap-1.5 border-border border-t p-2",
		extrasLabel: "w-full font-mono text-[10px] text-muted-foreground uppercase",
		eyedropper:
			"ms-auto grid size-6 place-items-center rounded-md text-muted-foreground outline-none transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5",
	},
	variants: {
		variant: {
			inline: {},
			popover: {},
		},
	},
	defaultVariants: { variant: "inline" },
});

export type ColorPickerVariant = NonNullable<VariantProps<typeof colorPicker>["variant"]>;

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
