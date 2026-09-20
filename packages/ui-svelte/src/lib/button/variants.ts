import { tv } from "tailwind-variants";

export const button = tv({
	base: [
		"relative inline-flex shrink-0 select-none items-center justify-center gap-2",
		"whitespace-nowrap rounded-md font-medium text-sm",
		"transition-[transform,scale,translate,background-color,border-color,color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"hover:scale-[var(--hover-scale)] active:scale-[var(--press-scale)]",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"disabled:pointer-events-none disabled:opacity-50",
		"aria-busy:cursor-progress",
		"[&_svg]:pointer-events-none [&_svg]:shrink-0",
	],
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline:
				"border border-input bg-background hover:bg-foreground/[0.06] hover:text-foreground",
			ghost: "hover:bg-foreground/[0.06] hover:text-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
		},
		size: {
			sm: "h-8 px-3 text-xs [&_svg]:size-3.5",
			md: "h-9 px-4 [&_svg]:size-4",
			lg: "h-10 px-6 [&_svg]:size-4",
			xl: "h-12 px-8 text-base [&_svg]:size-5",
			icon: "size-9 p-0 [&_svg]:size-4",
		},
	},
	defaultVariants: { variant: "default", size: "md" },
});

export type ButtonVariant = keyof typeof button.variants.variant;
export type ButtonSize = keyof typeof button.variants.size;
