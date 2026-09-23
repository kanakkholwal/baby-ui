import { tv, type VariantProps } from "tailwind-variants";

export const staggeredLetter = tv({
	slots: {
		root: "relative flex flex-col items-center justify-center text-foreground",
		mask: "absolute text-muted-foreground/40",
		row: "flex",
	},
	variants: {
		direction: {
			up: {},
			drop: {},
		},
	},
	defaultVariants: { direction: "drop" },
});

export type StaggeredLetterDirection = NonNullable<
	VariantProps<typeof staggeredLetter>["direction"]
>;
