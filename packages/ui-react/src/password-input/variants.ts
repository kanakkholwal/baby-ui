import { tv, type VariantProps } from "tailwind-variants";

export const passwordInput = tv({
	slots: {
		root: "flex w-full min-w-0 flex-col gap-2",
		control:
			"font-mono tracking-wide [&:placeholder-shown]:font-sans [&:placeholder-shown]:tracking-normal",
		caps: "flex items-center gap-1.5 text-[color-mix(in_oklch,var(--warning)_80%,var(--foreground))] text-xs",
		meter: "grid grid-cols-4 gap-1",
		segment:
			"h-1 rounded-full bg-muted transition-colors duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none",
		level: "text-muted-foreground text-xs tabular-nums",
		rules: "flex flex-col gap-1 text-xs",
		rule: "flex items-center gap-2 text-muted-foreground data-[met=true]:text-foreground",
		ruleIcon: "size-3.5 shrink-0",
	},
	variants: {
		size: { sm: {}, md: {}, lg: {} },
		// How much of the strength feedback shows once `rules` are given.
		feedback: {
			meter: { rules: "hidden" },
			checklist: { meter: "hidden", level: "hidden" },
			both: {},
		},
	},
	defaultVariants: { size: "md", feedback: "both" },
});

/** Filled segment colour per score, low to high. */
export const STRENGTH_TONES = [
	"",
	"bg-[var(--destructive)]",
	"bg-[var(--warning)]",
	"bg-[var(--info)]",
	"bg-[var(--success)]",
] as const;

export type PasswordInputSize = NonNullable<VariantProps<typeof passwordInput>["size"]>;
export type PasswordInputFeedback = NonNullable<
	VariantProps<typeof passwordInput>["feedback"]
>;
