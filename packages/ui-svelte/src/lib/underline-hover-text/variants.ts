import { tv, type VariantProps } from "tailwind-variants";

export const underlineHoverText = tv({
	slots: {
		root: "group/underline relative inline-block cursor-pointer px-1 pb-1.5 tracking-tight transition-transform duration-[var(--uht-duration,500ms)] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform hover:-translate-y-[2px]",
		label: "relative z-10",
		baseline:
			"pointer-events-none absolute bottom-0 left-0 h-px w-full bg-current opacity-25",
		stroke:
			"pointer-events-none absolute -bottom-px left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full transition-[width] duration-[var(--uht-duration,500ms)] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/underline:w-full",
	},
	variants: {
		tone: {
			default: { root: "text-foreground", stroke: "bg-foreground" },
			primary: { root: "text-primary", stroke: "bg-primary" },
			accent: { root: "text-accent", stroke: "bg-accent" },
		},
	},
	defaultVariants: { tone: "default" },
});

export type UnderlineHoverTextTone = NonNullable<
	VariantProps<typeof underlineHoverText>["tone"]
>;
