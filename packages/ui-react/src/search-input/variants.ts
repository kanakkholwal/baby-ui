import { tv, type VariantProps } from "tailwind-variants";

export const searchInput = tv({
	slots: {
		root: "w-full",
		icon: "shrink-0 text-muted-foreground",
		input:
			"[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
		clear: "text-muted-foreground hover:text-foreground",
	},
	variants: {
		size: {
			sm: { icon: "size-3.5" },
			md: { icon: "size-4" },
			lg: { icon: "size-4" },
		},
	},
	defaultVariants: { size: "md" },
});

export type SearchInputSize = NonNullable<VariantProps<typeof searchInput>["size"]>;
