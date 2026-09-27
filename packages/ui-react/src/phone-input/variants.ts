import { tv, type VariantProps } from "tailwind-variants";

export const phoneInput = tv({
	slots: {
		root: "flex w-full min-w-0 items-stretch",
		trigger:
			"w-auto shrink-0 gap-1.5 rounded-r-none border-r-0 px-2.5 focus-visible:z-10 [&_svg]:size-3.5",
		flag: "text-base leading-none",
		dial: "text-muted-foreground tabular-nums",
		input: "min-w-0 flex-1 rounded-l-none font-mono tabular-nums tracking-wide",
		item: "flex w-full items-center gap-2",
	},
	variants: {
		size: { sm: {}, md: {}, lg: {} },
	},
	defaultVariants: { size: "md" },
});

export type PhoneInputSize = NonNullable<VariantProps<typeof phoneInput>["size"]>;
