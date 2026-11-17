import { tv, type VariantProps } from "tailwind-variants";

export const themeToggle = tv({
	base: [
		"flex items-center justify-center rounded-md text-muted-foreground outline-none",
		"transition-[color,background-color,scale] duration-(--duration-press) ease-(--ease-ui-out)",
		"hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale)",
		"disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none motion-reduce:active:scale-100",
	],
	variants: {
		variant: {
			rectangle: "",
			circle: "",
			"circle-blur": "",
			blinds: "",
			// A disc sweeps across from the start side, the halves part from the centre, or the page rises in.
			eclipse: "",
			split: "",
			rise: "",
		},
		start: {
			"top-left": "",
			"top-right": "",
			"bottom-left": "",
			"bottom-right": "",
			center: "",
			"bottom-up": "",
		},
	},
	defaultVariants: { variant: "rectangle", start: "bottom-up" },
});

export type ThemeToggleVariant = NonNullable<VariantProps<typeof themeToggle>["variant"]>;
export type ThemeToggleStart = NonNullable<VariantProps<typeof themeToggle>["start"]>;
export type ThemeToggleValue = "light" | "dark";
