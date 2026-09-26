import { tv, type VariantProps } from "tailwind-variants";

export const pricing01 = tv({
	slots: {
		root: "w-full bg-background px-4 py-16 text-foreground sm:px-6 lg:px-8",
		inner: "mx-auto max-w-6xl",
		header: "grid gap-6 md:grid-cols-12 md:items-end",
		heading: "md:col-span-6",
		eyebrow: "font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]",
		title:
			"mt-3 max-w-md text-balance font-medium text-3xl leading-tight tracking-tight sm:text-4xl",
		aside: "flex flex-col items-start gap-4 md:col-span-5 md:col-start-8",
		description: "max-w-md text-muted-foreground text-sm leading-6",
		plans: "mt-10 grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]",
		item: "group relative flex flex-col pt-10",
		note: "pointer-events-none absolute inset-x-0 top-0 bottom-2 translate-y-3.5 rounded-[1.35rem] border border-border bg-foreground/[0.04] px-4 pt-3 text-center font-medium text-foreground/80 text-sm opacity-0 backdrop-blur-xl transition-[opacity,translate] duration-150 ease-in group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:duration-500 group-focus-within:ease-[var(--ease-out)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:duration-500 group-hover:ease-[var(--ease-out)] motion-reduce:translate-y-0 motion-reduce:transition-opacity",
		card: "relative min-h-96 flex-1 transition-[translate,box-shadow,border-color] duration-500 ease-[var(--ease-out)] group-focus-within:-translate-y-1 group-hover:-translate-y-1 group-hover:shadow-lg motion-reduce:translate-y-0",
		name: "font-normal text-muted-foreground text-sm",
		price: "mt-3 flex items-end gap-1",
		amount: "font-medium text-5xl leading-none tracking-tighter tabular-nums",
		cadence: "pb-1 text-muted-foreground text-sm",
		body: "flex flex-1 flex-col",
		blurb: "text-muted-foreground text-sm leading-6",
		features: "mt-6 flex flex-col gap-3",
		feature: "flex gap-2 text-sm",
		check: "mt-0.5 size-4 shrink-0 text-muted-foreground",
		cta: "w-full rounded-full",
		arrow:
			"transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none",
	},
	variants: {
		variant: {
			default: { card: "" },
			framed: { card: "shadow-sm" },
		},
		featured: {
			true: { card: "border-foreground/25" },
			false: {},
		},
	},
	defaultVariants: { variant: "default", featured: false },
});

export type Pricing01Variant = NonNullable<VariantProps<typeof pricing01>["variant"]>;
