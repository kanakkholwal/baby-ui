import { tv } from "tailwind-variants";

export const button = tv({
	base: [
		"relative inline-flex shrink-0 select-none items-center justify-center gap-2",
		"whitespace-nowrap rounded-md font-medium text-sm",
		"transition-[transform,background-color,border-color,color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"active:scale-[var(--press-scale)]",
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
				"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
		},
		size: {
			sm: "h-8 px-3 text-xs [&_svg]:size-3.5",
			md: "h-9 px-4 [&_svg]:size-4",
			lg: "h-10 px-6 [&_svg]:size-4",
			icon: "size-9 p-0 [&_svg]:size-4",
		},
	},
	defaultVariants: { variant: "default", size: "md" },
});

export type ButtonVariant = keyof typeof button.variants.variant;
export type ButtonSize = keyof typeof button.variants.size;
