import { tv, type VariantProps } from "tailwind-variants";

export const ogAuthorProfile = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] overflow-hidden bg-background font-sans text-foreground",
		panel:
			"relative flex h-full w-[440px] shrink-0 items-center justify-center overflow-hidden",
		dots: "absolute inset-0 bg-[size:28px_28px]",
		halo: "absolute h-[400px] w-[400px] rounded-full border-2 opacity-40",
		avatarRing:
			"relative flex h-[280px] w-[280px] items-center justify-center overflow-hidden rounded-full border-[10px] border-background bg-card",
		avatar: "h-full w-full object-cover",
		initials: "font-bold font-heading text-[104px] tracking-tight",
		content: "relative flex flex-1 flex-col px-[72px] py-[64px]",
		header: "flex items-center justify-between",
		site: "line-clamp-1 font-semibold text-[24px] text-muted-foreground tracking-tight",
		handle:
			"flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 font-medium text-[24px]",
		handleIcon: "h-6 w-6",
		body: "mt-auto flex flex-col",
		name: "line-clamp-2 font-bold font-heading text-[68px] leading-[1.02] tracking-tight",
		role: "mt-3 line-clamp-1 font-semibold text-[28px]",
		bio: "mt-5 line-clamp-2 text-[26px] text-muted-foreground leading-snug",
		stats: "mt-auto flex items-stretch gap-8 border-border border-t pt-8",
		statCell: "flex flex-1 gap-8",
		stat: "flex flex-1 flex-col gap-2",
		divider: "w-px shrink-0 self-stretch bg-border",
		statValue:
			"line-clamp-1 font-bold font-heading text-[48px] leading-none tracking-tight",
		statLabel: "line-clamp-1 text-[22px] text-muted-foreground",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		tone: {
			chart: {
				panel: "bg-chart-1",
				dots: "bg-[radial-gradient(var(--background)_2px,transparent_2px)] opacity-30",
				halo: "border-background",
				initials: "text-chart-1",
				role: "text-chart-1",
				handleIcon: "text-chart-1",
			},
			primary: {
				panel: "bg-primary",
				dots: "bg-[radial-gradient(var(--primary-foreground)_2px,transparent_2px)] opacity-25",
				halo: "border-primary-foreground",
				initials: "text-foreground",
				role: "text-foreground",
				handleIcon: "text-foreground",
			},
			neutral: {
				panel: "border-border border-r bg-card",
				dots: "bg-[radial-gradient(var(--muted-foreground)_2px,transparent_2px)] opacity-30",
				halo: "border-muted-foreground",
				initials: "text-muted-foreground",
				role: "text-muted-foreground",
				handleIcon: "text-muted-foreground",
			},
		},
	},
	defaultVariants: { mode: "light", tone: "chart" },
});

export type OgAuthorProfileMode = NonNullable<
	VariantProps<typeof ogAuthorProfile>["mode"]
>;
export type OgAuthorProfileTone = NonNullable<
	VariantProps<typeof ogAuthorProfile>["tone"]
>;
