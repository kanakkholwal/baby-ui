import { tv, type VariantProps } from "tailwind-variants";

export const textReel = tv({
	slots: {
		root: "flex min-w-0 flex-col items-center gap-2 font-bold text-foreground tracking-tight",
		prefix: "font-normal text-[0.7rem] text-muted-foreground uppercase tracking-[0.25em]",
		viewport:
			"relative h-[2.2em] w-full overflow-hidden text-center mask-[linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] motion-reduce:mask-none",
		track: "absolute inset-x-0 top-0 flex flex-col leading-[1.1] will-change-transform",
		copy: "flex flex-col",
		item: "whitespace-nowrap py-1.5",
	},
	variants: {
		size: {
			sm: { root: "text-2xl" },
			md: { root: "text-4xl" },
			lg: { root: "text-6xl" },
		},
	},
	defaultVariants: { size: "md" },
});

export type TextReelSize = NonNullable<VariantProps<typeof textReel>["size"]>;
