import { tv, type VariantProps } from "tailwind-variants";

export const upvoteButton = tv({
	slots: {
		root: "relative inline-flex",
		button:
			"relative isolate inline-flex items-center justify-center overflow-hidden border font-medium text-sm tabular-nums outline-none transition-[color,background-color,border-color,scale] duration-(--duration-base) ease-(--ease-ui-out) focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.94] disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none",
		// The fill rises like a level on a vote and drains a little faster than it rose.
		fill: "-z-10 absolute inset-0 bg-(--upvote-color) transition-[clip-path] ease-(--ease-ui-out) motion-reduce:transition-none",
		arrows: "relative inline-flex size-[18px] shrink-0 overflow-hidden",
		// Both arrows sit in one slot: a vote sends the outline out the top as the filled one rises in.
		arrow:
			"absolute inset-0 inline-flex items-center justify-center transition-[translate] duration-(--duration-slow) ease-(--ease-ui-out) motion-reduce:transition-none [&_svg]:size-[18px]",
		float:
			"upvote-float pointer-events-none absolute -top-1 left-1/2 font-medium text-(--upvote-color) text-xs tabular-nums",
	},
	variants: {
		// `vertical` stacks the arrow over the count in a tall card; `horizontal` is a 36px pill.
		orientation: {
			vertical: { button: "min-w-12 flex-col gap-0.5 rounded-2xl px-2.5 py-2" },
			horizontal: { button: "h-9 gap-1.5 rounded-full ps-2.5 pe-3.5" },
		},
		// The colour of the fill: two variables, so any colour works by setting them on the class.
		variant: {
			default: {
				root: "[--upvote-color:var(--primary)] [--upvote-on:var(--primary-foreground)]",
			},
			secondary: {
				root: "[--upvote-color:var(--foreground)] [--upvote-on:var(--background)]",
			},
			success: {
				root: "[--upvote-color:var(--success)] [--upvote-on:var(--success-foreground)]",
			},
			warning: {
				root: "[--upvote-color:var(--warning)] [--upvote-on:var(--warning-foreground)]",
			},
			info: { root: "[--upvote-color:var(--info)] [--upvote-on:var(--info-foreground)]" },
			destructive: {
				root: "[--upvote-color:var(--destructive)] [--upvote-on:var(--destructive-foreground)]",
			},
		},
		voted: {
			true: {
				button: "border-(--upvote-color) text-(--upvote-on)",
				fill: "[clip-path:inset(0)] duration-(--duration-slow)",
			},
			false: {
				button: "border-border text-foreground hover:bg-muted/60",
				fill: "[clip-path:inset(100%_0_0_0)] duration-(--duration-base)",
			},
		},
	},
	defaultVariants: { orientation: "vertical", variant: "default", voted: false },
});

export type UpvoteVariant = NonNullable<VariantProps<typeof upvoteButton>["variant"]>;

export type UpvoteOrientation = NonNullable<
	VariantProps<typeof upvoteButton>["orientation"]
>;
