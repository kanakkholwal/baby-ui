import { tv, type VariantProps } from "tailwind-variants";

export const responseStream = tv({
	slots: {
		root: "text-foreground",
		caret:
			"stream-caret ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] bg-current",
	},
	variants: {
		size: {
			sm: { root: "text-xs leading-normal" },
			md: { root: "text-sm leading-relaxed" },
			lg: { root: "text-base leading-relaxed" },
		},
	},
	defaultVariants: { size: "md" },
});

export type ResponseStreamSize = NonNullable<VariantProps<typeof responseStream>["size"]>;
