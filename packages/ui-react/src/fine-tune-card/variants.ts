import { tv, type VariantProps } from "tailwind-variants";

export const fineTuneCard = tv({
	slots: { root: "w-full rounded-2xl bg-card shadow-md" },
	variants: {
		size: {
			sm: { root: "max-w-52" },
			md: { root: "max-w-60" },
			lg: { root: "max-w-72" },
		},
	},
	defaultVariants: { size: "md" },
});

export type FineTuneCardSize = NonNullable<VariantProps<typeof fineTuneCard>["size"]>;
