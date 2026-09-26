import { tv, type VariantProps } from "tailwind-variants";

export const splitFlap = tv({
	slots: {
		root: "inline-flex max-w-full flex-col gap-2 overflow-x-auto rounded-2xl p-4 font-bold font-mono",
		row: "flex items-stretch gap-1.5",
		cells: "flex gap-[3px]",
		cell: "relative shrink-0 select-none perspective-[400px]",
		top: "absolute inset-x-0 top-0 h-1/2 overflow-hidden rounded-t-[3px]",
		bottom: "absolute inset-x-0 bottom-0 h-1/2 overflow-hidden rounded-b-[3px]",
		glyph: "absolute inset-x-0 flex h-[200%] items-center justify-center leading-none",
		flap: "z-10 backface-hidden",
		divider: "pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-1/2",
		indicator: "w-1.5 shrink-0 rounded-[2px]",
	},
	variants: {
		variant: {
			solid: {
				root: "bg-foreground text-background shadow-xl",
				top: "bg-[color-mix(in_oklab,var(--foreground)_86%,var(--background))]",
				bottom: "bg-[color-mix(in_oklab,var(--foreground)_80%,var(--background))]",
				divider: "bg-foreground",
			},
			card: {
				root: "border border-border bg-muted text-foreground",
				cell: "rounded-[3px] ring-1 ring-border",
				top: "bg-card",
				bottom: "bg-[color-mix(in_oklab,var(--card)_94%,var(--foreground))]",
				divider: "bg-border",
			},
		},
		size: {
			sm: { cell: "h-9.5 w-6.5 text-base" },
			md: { cell: "h-13.5 w-9.5 text-2xl" },
			lg: { cell: "h-18 w-13 text-[34px]", cells: "gap-1" },
		},
		indicator: {
			none: {},
			success: { indicator: "bg-(--success)" },
			primary: { indicator: "bg-primary" },
			warning: { indicator: "bg-(--warning)" },
			destructive: { indicator: "bg-(--destructive)" },
		},
	},
	defaultVariants: { variant: "solid", size: "md", indicator: "success" },
});

export type SplitFlapVariant = NonNullable<VariantProps<typeof splitFlap>["variant"]>;
export type SplitFlapSize = NonNullable<VariantProps<typeof splitFlap>["size"]>;
export type SplitFlapIndicator = NonNullable<VariantProps<typeof splitFlap>["indicator"]>;
