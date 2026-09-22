import { tv, type VariantProps } from "tailwind-variants";

export const message = tv({
	slots: {
		root: "group/message flex w-full gap-3",
		stack: "flex min-w-0 flex-col gap-1.5",
		bubble: "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
	},
	variants: {
		tone: {
			surface: { bubble: "border border-border bg-card text-foreground" },
			solid: { bubble: "bg-primary text-primary-foreground" },
			muted: { bubble: "bg-muted text-foreground" },
			outline: { bubble: "border border-border bg-transparent text-foreground" },
			destructive: { bubble: "bg-destructive text-destructive-foreground" },
			raw: { bubble: "bg-transparent" },
		},
		layout: {
			default: { stack: "max-w-[85%]" },
			compact: { stack: "max-w-[85%]" },
			wide: { stack: "max-w-full" },
		},
		motion: {
			none: { root: "" },
			fade: { root: "fade-in" },
			slide: { root: "card-fade-up" },
			imessage: { root: "imessage-in" },
		},
	},
	defaultVariants: { tone: "surface", layout: "default", motion: "none" },
});

export type MessageTone = NonNullable<VariantProps<typeof message>["tone"]>;
export type MessageLayout = NonNullable<VariantProps<typeof message>["layout"]>;
export type MessageMotion = NonNullable<VariantProps<typeof message>["motion"]>;
