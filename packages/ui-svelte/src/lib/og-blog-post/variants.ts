import { tv, type VariantProps } from "tailwind-variants";

export const ogBlogPost = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] flex-col overflow-hidden bg-background p-[72px] font-sans text-foreground",
		glow: "absolute -top-[240px] -right-[200px] h-[640px] w-[640px] rounded-full opacity-60 blur-[120px]",
		grid: "absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40",
		header: "relative flex items-center justify-between",
		brand: "flex items-center gap-4 font-semibold text-[28px] tracking-tight",
		logo: "h-12 w-12 rounded-xl object-cover",
		category:
			"rounded-full border border-border bg-card px-5 py-2 font-medium text-[22px] text-muted-foreground",
		body: "relative mt-auto flex flex-col gap-6",
		title:
			"line-clamp-3 max-w-[980px] font-bold font-heading text-[68px] leading-[1.05] tracking-tight",
		excerpt: "line-clamp-2 max-w-[900px] text-[28px] text-muted-foreground leading-snug",
		footer:
			"relative mt-12 flex items-center gap-5 border-border border-t pt-8 text-[24px]",
		avatar: "h-14 w-14 rounded-full object-cover",
		author: "font-semibold",
		meta: "text-muted-foreground",
		dot: "h-1.5 w-1.5 rounded-full bg-muted-foreground",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		tone: {
			neutral: { glow: "bg-foreground/20" },
			primary: { glow: "bg-primary" },
			chart: { glow: "bg-chart-1" },
		},
	},
	defaultVariants: { mode: "light", tone: "chart" },
});

export type OgBlogPostMode = NonNullable<VariantProps<typeof ogBlogPost>["mode"]>;
export type OgBlogPostTone = NonNullable<VariantProps<typeof ogBlogPost>["tone"]>;
