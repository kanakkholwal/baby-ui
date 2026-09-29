import { tv, type VariantProps } from "tailwind-variants";

export const button = tv({
	base: [
		"relative inline-flex shrink-0 select-none items-center justify-center gap-2",
		"whitespace-nowrap rounded-lg border border-transparent font-medium text-sm",
		// Colour answers at once; the squish settles slower so it reads soft, not twitchy.
		"transition-[transform,scale,translate,background-color,border-color,color,box-shadow]",
		"[transition-duration:250ms,250ms,250ms,100ms,100ms,100ms,100ms] ease-[var(--ease-smooth)]",
		"active:scale-[var(--press-scale)]",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		"aria-busy:cursor-progress",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	],
	variants: {
		variant: {
			// Hover darkens toward --foreground: white on a lightened blue fell to 4.05:1.
			default: "bg-primary text-primary-foreground hover:bg-primary-hover",
			default_soft: "border-primary/10 bg-primary/8 text-primary hover:bg-primary/15",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline:
				"border-input bg-background hover:bg-foreground/[0.06] hover:text-foreground",
			ghost: "hover:bg-foreground/[0.06] hover:text-foreground",
			link: "text-primary underline-offset-4 hover:underline active:scale-100",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			destructive_soft:
				"border-destructive/10 bg-destructive/10 text-destructive hover:bg-destructive/15",
			// The dark palette lifts these hues for use as text, so the solid fill takes dark text there.
			success: "bg-success text-white hover:bg-success/90 dark:text-[#151515]",
			success_soft: "border-success/10 bg-success/10 text-success hover:bg-success/15",
			warning: "bg-warning text-white hover:bg-warning/90 dark:text-[#151515]",
			warning_soft: "border-warning/10 bg-warning/10 text-warning hover:bg-warning/15",
			info: "bg-info text-white hover:bg-info/90 dark:text-[#151515]",
			info_soft: "border-info/10 bg-info/10 text-info hover:bg-info/15",
			dark: "bg-foreground text-background hover:bg-foreground/90",
			light: "bg-white text-black hover:bg-white/90 dark:bg-black dark:text-white",
			raw: "h-auto rounded-none border-0 p-0 active:scale-100",
		},
		size: {
			xs: "h-6 gap-1.5 rounded-md px-2 text-[11px] active:scale-[var(--press-scale-sm)] [&_svg]:size-3",
			sm: "h-8 gap-1.5 px-3 text-xs active:scale-[var(--press-scale-sm)] [&_svg]:size-3.5",
			md: "h-9 px-4 [&_svg]:size-4",
			lg: "h-10 px-5 active:scale-[var(--press-scale-lg)] [&_svg]:size-4",
			xl: "h-12 px-7 text-base active:scale-[var(--press-scale-lg)] [&_svg]:size-5",
			"icon-xs":
				"size-6 rounded-md p-0 active:scale-[var(--press-scale-icon)] [&_svg]:size-3",
			"icon-sm": "size-8 p-0 active:scale-[var(--press-scale-icon)] [&_svg]:size-3.5",
			icon: "size-9 p-0 [&_svg]:size-4",
			"icon-lg": "size-10 p-0 active:scale-[var(--press-scale-lg)] [&_svg]:size-4",
			"icon-xl": "size-12 p-0 active:scale-[var(--press-scale-lg)] [&_svg]:size-5",
		},
	},
	defaultVariants: { variant: "default", size: "md" },
});

export type ButtonVariant = NonNullable<VariantProps<typeof button>["variant"]>;
export type ButtonSize = NonNullable<VariantProps<typeof button>["size"]>;

/** Square sizes show the spinner alone while loading; the label goes to assistive tech. */
export function isIconSize(size: ButtonSize | undefined): boolean {
	return size?.startsWith("icon") ?? false;
}
