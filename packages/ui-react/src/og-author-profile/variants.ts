import { tv, type VariantProps } from "tailwind-variants";

export const ogAuthorProfile = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] overflow-hidden bg-background font-sans text-foreground",
		// default
		panel:
			"relative flex h-full w-[440px] shrink-0 items-center justify-center overflow-hidden border-border border-r bg-muted",
		dots: "absolute inset-0 bg-[radial-gradient(var(--border)_1.5px,transparent_1.5px)] bg-[size:24px_24px]",
		ring: "absolute rounded-full border border-border",
		avatarRing:
			"relative flex h-[280px] w-[280px] items-center justify-center overflow-hidden rounded-full border-[10px] border-background bg-card",
		avatar: "h-full w-full object-cover",
		initials: "font-heading font-semibold text-[104px] tracking-tight",
		content: "relative flex flex-1 flex-col px-[72px] py-[64px]",
		header: "flex items-center justify-between",
		site: "line-clamp-1 font-semibold text-[24px] text-muted-foreground tracking-tight",
		handle:
			"flex items-center gap-3 rounded-full border border-border px-5 py-2 font-medium text-[24px]",
		handleIcon: "h-6 w-6",
		body: "mt-auto flex flex-col",
		label:
			"mb-4 font-medium text-[20px] text-muted-foreground uppercase tracking-[0.14em]",
		name: "line-clamp-2 font-heading font-semibold text-[68px] leading-[1.02] tracking-[-0.035em]",
		role: "mt-3 line-clamp-1 font-medium text-[28px]",
		bio: "mt-5 line-clamp-2 text-[26px] text-muted-foreground leading-snug",
		stats: "mt-auto flex items-stretch gap-8 border-border border-t pt-8",
		statCell: "flex flex-1 gap-8",
		stat: "flex flex-1 flex-col gap-2",
		divider: "w-px shrink-0 self-stretch bg-border",
		statValue:
			"line-clamp-1 font-heading font-semibold text-[48px] leading-none tracking-tight",
		statLabel: "line-clamp-1 text-[22px] text-muted-foreground",
		// pass
		ticket:
			"absolute top-[48px] left-[124px] flex h-[760px] w-[1240px] origin-top-left rotate-[6deg] flex-col overflow-hidden rounded-[56px] border border-border bg-[color-mix(in_oklab,var(--foreground)_7%,var(--background))] px-[96px] py-[64px] shadow-[0_48px_96px_-32px_rgb(0_0_0/0.35)]",
		stripes: "absolute top-[56px] left-0 h-[168px] w-[26px]",
		contour: "absolute bottom-[-40px] left-[-30px] h-[440px] w-[460px]",
		ticketHeader: "relative flex items-center gap-8",
		emblem: "h-[76px] w-[76px] shrink-0 rounded-[16px] object-cover",
		airline:
			"line-clamp-1 max-w-[440px] font-mono text-[30px] text-muted-foreground uppercase tracking-[0.3em]",
		bar: "h-9 w-[3px] shrink-0 bg-foreground",
		motto: "line-clamp-1 max-w-[360px] font-mono text-[22px] uppercase tracking-[0.22em]",
		field: "font-semibold text-[22px] uppercase tracking-[0.12em]",
		passenger:
			"line-clamp-1 max-w-[760px] font-medium font-mono text-[68px] text-foreground/80 uppercase leading-[1.1] tracking-[0.06em]",
		job: "line-clamp-1 max-w-[760px] font-mono text-[60px] uppercase leading-[1.1] tracking-[0.06em]",
		fields: "absolute top-[260px] left-[880px] flex flex-col gap-10",
		fieldValue: "line-clamp-1 font-mono text-[50px] uppercase leading-none",
		// editorial
		circle: "absolute top-[2px] left-[572px] h-[628px] w-[628px] rounded-full",
		cross: "absolute bg-foreground/60",
		lines: "absolute top-[52px] left-[68px] flex max-w-[1060px] flex-col overflow-hidden",
		line: "line-clamp-1 text-[66px] leading-[1.37] tracking-[-0.025em]",
		indent: "pl-[94px]",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		tone: {
			neutral: {
				role: "text-foreground",
				handleIcon: "text-muted-foreground",
				initials: "text-muted-foreground",
				stripes:
					"bg-[repeating-linear-gradient(135deg,var(--foreground)_0_10px,transparent_10px_24px)]",
				contour: "text-foreground/30",
				field: "text-foreground",
				job: "text-foreground",
				emblem: "border-2 border-foreground",
				circle: "bg-foreground/[0.08]",
			},
			chart: {
				role: "text-chart-1",
				handleIcon: "text-chart-1",
				initials: "text-chart-1",
				stripes:
					"bg-[repeating-linear-gradient(135deg,var(--chart-1)_0_10px,transparent_10px_24px)]",
				contour: "text-chart-1/40",
				field: "text-chart-1",
				job: "text-chart-1",
				emblem: "border-2 border-chart-1",
				circle: "bg-chart-4",
			},
			primary: {
				role: "text-primary",
				handleIcon: "text-primary",
				initials: "text-primary",
				stripes:
					"bg-[repeating-linear-gradient(135deg,var(--primary)_0_10px,transparent_10px_24px)]",
				contour: "text-primary/40",
				field: "text-primary",
				job: "text-primary",
				emblem: "border-2 border-primary",
				circle: "bg-primary",
			},
		},
		// Each layout is its own markup branch; the slots above are grouped by it.
		variant: { default: {}, pass: {}, editorial: {} },
	},
	defaultVariants: { mode: "light", tone: "neutral", variant: "default" },
});

/** Topographic lines in the boarding pass corner; fixed, so both ports draw the same ones. */
export const OG_AUTHOR_PROFILE_CONTOURS: string[] = Array.from({ length: 30 }, (_, i) => {
	const points: string[] = [];
	for (let x = 0; x <= 460; x += 10) {
		const hill = 190 * Math.exp(-(((x - 150) / 150) ** 2)) * (1 - i / 34);
		const y = 140 + i * 10 - hill + 9 * Math.sin(x / 36 + i * 0.45);
		points.push(`${x === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
	}
	return points.join(" ");
});

export type OgAuthorProfileMode = NonNullable<
	VariantProps<typeof ogAuthorProfile>["mode"]
>;
export type OgAuthorProfileTone = NonNullable<
	VariantProps<typeof ogAuthorProfile>["tone"]
>;
export type OgAuthorProfileVariant = NonNullable<
	VariantProps<typeof ogAuthorProfile>["variant"]
>;
