import { tv, type VariantProps } from "tailwind-variants";

export const footer = tv({
	slots: {
		root: "@container relative w-full border-border border-t bg-card",
		inner: "mx-auto max-w-6xl px-6 pt-20 pb-10 @3xl:pt-24 @3xl:pb-12",
		grid: "grid gap-14",
		brandBlock: "",
		description: "mt-6 max-w-sm text-pretty text-muted-foreground text-sm",
		socials: "mt-7 flex items-center gap-2",
		social:
			"grid size-9 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:text-foreground motion-reduce:transition-none [&_svg]:size-4",
		copyright: "mt-7 text-muted-foreground text-xs",
		columns: "grid gap-10 @xl:grid-cols-3",
		columnTitle: "font-semibold text-foreground text-sm",
		links: "mt-4 space-y-3",
		link: "text-muted-foreground text-sm transition-colors hover:text-foreground motion-reduce:transition-none",
		wordmarkWrap: "relative overflow-hidden px-4 pb-8 @3xl:pb-10",
		wordmark:
			"footer-wordmark block select-none text-center font-semibold text-[22cqw] leading-[0.82] tracking-tight",
	},
	variants: {
		layout: {
			split: {
				grid: "@3xl:grid-cols-12",
				brandBlock: "@3xl:col-span-5",
				columns: "@3xl:col-span-7",
			},
			centered: {
				grid: "justify-items-center text-center",
				brandBlock: "flex flex-col items-center",
				description: "mx-auto",
				socials: "justify-center",
				columns: "w-full max-w-3xl justify-items-center",
			},
		},
	},
	defaultVariants: { layout: "split" },
});

export type FooterLayout = NonNullable<VariantProps<typeof footer>["layout"]>;
