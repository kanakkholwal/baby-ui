import { tv, type VariantProps } from "tailwind-variants";

export const textExplodeIMessage = tv({
	base: "flex items-center justify-center text-foreground",
	variants: {
		size: {
			sm: "text-xl",
			md: "text-3xl",
			lg: "text-5xl",
		},
	},
	defaultVariants: { size: "md" },
});

export type TextExplodeIMessageSize = NonNullable<
	VariantProps<typeof textExplodeIMessage>["size"]
>;

const MODES = ["loop", "hover"] as const;
/** Not a styling variant: whether the explosion cycles continuously or plays once per hover/tap. */
export type TextExplodeIMessageMode = (typeof MODES)[number];
