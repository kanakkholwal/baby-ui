import { tv, type VariantProps } from "tailwind-variants";

export const doubleUnderline = tv({
	slots: {
		root: "group/underline relative inline-block cursor-pointer font-medium tracking-tight transition-[letter-spacing,color] duration-[var(--du-duration,500ms)] ease-[cubic-bezier(0.22,1,0.36,1)] hover:tracking-[-0.01em]",
		bottom:
			"pointer-events-none absolute -bottom-[3px] left-0 h-px w-full bg-gradient-to-r from-transparent via-current/70 to-transparent transition-opacity duration-[var(--du-duration,500ms)] ease-[cubic-bezier(0.22,1,0.36,1)]",
		top: "pointer-events-none absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-current to-transparent transition-[top,opacity] duration-[var(--du-duration,500ms)] ease-[cubic-bezier(0.22,1,0.36,1)]",
	},
	variants: {
		trigger: {
			hover: {
				bottom: "opacity-100 group-hover/underline:opacity-50",
				top: "top-[calc(100%-3px)] opacity-0 group-hover/underline:-top-px group-hover/underline:opacity-100",
			},
			always: {
				bottom: "opacity-50",
				top: "-top-px opacity-100",
			},
		},
	},
	defaultVariants: { trigger: "hover" },
});

export type DoubleUnderlineTrigger = NonNullable<
	VariantProps<typeof doubleUnderline>["trigger"]
>;
