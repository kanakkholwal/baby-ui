import { tv, type VariantProps } from "tailwind-variants";

export const markdown = tv({
	slots: {
		root: "flex flex-col leading-relaxed",
		h2: "font-heading font-semibold text-foreground tracking-tight",
		h3: "font-heading font-semibold text-foreground",
		list: "flex list-disc flex-col gap-1 pl-5 text-muted-foreground",
		code: "overflow-x-auto rounded-lg border border-border bg-card p-3 font-mono text-foreground",
		para: "text-muted-foreground",
	},
	variants: {
		size: {
			sm: { root: "gap-2 text-xs", h2: "text-base", h3: "text-sm", code: "text-xs" },
			md: { root: "gap-3 text-sm", h2: "text-lg", h3: "text-base", code: "text-[13px]" },
			lg: { root: "gap-4 text-base", h2: "text-xl", h3: "text-lg", code: "text-sm" },
		},
	},
	defaultVariants: { size: "md" },
});

export type MarkdownSize = NonNullable<VariantProps<typeof markdown>["size"]>;
