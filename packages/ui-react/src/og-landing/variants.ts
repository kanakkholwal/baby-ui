import { tv, type VariantProps } from "tailwind-variants";

export const ogLanding = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] flex-col overflow-hidden bg-background font-sans text-foreground",
		brand: "relative flex items-center gap-4",
		logo: "h-12 w-12 shrink-0 rounded-xl object-cover",
		site: "line-clamp-1 max-w-[520px]",
		title: "relative font-heading",
		mark: "",
		description: "relative line-clamp-2 text-muted-foreground leading-snug",
		cta: "flex items-center gap-3 rounded-full bg-foreground px-8 py-4 font-medium text-[26px] text-background",
		// streaks
		streak:
			"absolute h-[1.5px] w-[900px] origin-left -rotate-45 bg-[linear-gradient(90deg,transparent,var(--foreground)_50%,transparent)]",
		streakAccent: "absolute h-[2px] w-[900px] origin-left -rotate-45",
		spark:
			"absolute top-[320px] left-[880px] h-[120px] w-[120px] rounded-full opacity-80 blur-[30px]",
		sparkCore:
			"absolute top-[372px] left-[932px] h-4 w-4 rounded-full bg-white blur-[3px]",
		// showcase, spotlight, screen
		column: "absolute flex w-[214px] flex-col gap-4",
		frame: "flex overflow-hidden rounded-[34px] border border-border bg-muted p-2.5",
		shot: "h-full w-full rounded-[26px] object-cover object-top",
		grid: "absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_44%_60%_at_50%_50%,black,transparent)]",
		face: "absolute rounded-[20px] object-cover shadow-[0_16px_32px_-16px_rgb(0_0_0/0.35)]",
		glow: "absolute top-[160px] left-[620px] h-[420px] w-[620px] rounded-full opacity-45 blur-[120px]",
		screen:
			"absolute top-[150px] left-[600px] h-[560px] w-[900px] -rotate-[7deg] skew-x-[9deg] rounded-[24px] border border-border object-cover object-left-top shadow-[0_40px_80px_-24px_rgb(0_0_0/0.6)]",
		// picker
		wash: "absolute inset-0",
		words: "absolute left-[520px] flex flex-col",
		box: "absolute -inset-x-1 inset-y-1 border-2 border-foreground/80 border-dashed",
		handle:
			"absolute -mt-2 -ml-2 h-4 w-4 rounded-full border-2 border-foreground bg-background",
		cursor: "absolute -right-[58px] -bottom-[62px] h-[72px] w-[72px]",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		tone: {
			neutral: {
				mark: "text-muted-foreground",
				streakAccent:
					"bg-[linear-gradient(90deg,transparent,var(--foreground),transparent)]",
				spark: "bg-foreground",
				glow: "bg-foreground/40",
				wash: "bg-[linear-gradient(105deg,transparent_35%,color-mix(in_oklab,var(--foreground)_22%,transparent)_100%)]",
				box: "bg-foreground/10",
			},
			chart: {
				mark: "text-chart-2",
				streakAccent:
					"bg-[linear-gradient(90deg,transparent,var(--chart-2),transparent)]",
				spark: "bg-chart-2",
				glow: "bg-chart-2",
				wash: "bg-[linear-gradient(105deg,transparent_35%,color-mix(in_oklab,var(--chart-2)_70%,transparent)_100%)]",
				box: "bg-chart-2/25",
			},
			primary: {
				mark: "text-primary",
				streakAccent:
					"bg-[linear-gradient(90deg,transparent,var(--primary),transparent)]",
				spark: "bg-primary",
				glow: "bg-primary",
				wash: "bg-[linear-gradient(105deg,transparent_35%,color-mix(in_oklab,var(--primary)_70%,transparent)_100%)]",
				box: "bg-primary/25",
			},
		},
		variant: {
			streaks: {
				root: "p-[88px]",
				site: "font-bold text-[34px] uppercase tracking-[0.06em]",
				title:
					"mt-auto line-clamp-2 max-w-[820px] font-medium text-[80px] leading-[1.06] tracking-[-0.03em]",
				description: "mt-5 max-w-[640px] text-[26px]",
			},
			showcase: {
				root: "p-[72px]",
				logo: "h-[72px] w-[72px] rounded-2xl",
				site: "font-semibold text-[32px] tracking-tight",
				title:
					"mt-auto line-clamp-4 max-w-[560px] font-semibold text-[84px] leading-[1.02] tracking-[-0.045em]",
				description: "mt-5 max-w-[520px] text-[24px]",
			},
			picker: {
				brand: "absolute top-[176px] left-[88px]",
				site: "font-medium text-[36px] tracking-tight",
				title:
					"absolute top-[250px] left-[84px] line-clamp-1 max-w-[420px] text-[100px] leading-[110px] tracking-[-0.035em]",
				cta: "absolute top-[392px] left-[88px]",
			},
			screen: {
				root: "p-[80px]",
				site: "font-semibold text-[32px] tracking-tight",
				title:
					"mt-[96px] line-clamp-3 max-w-[540px] font-semibold text-[64px] leading-[1.04] tracking-[-0.04em]",
				description: "mt-6 max-w-[480px] text-[24px]",
			},
			spotlight: {
				root: "items-center justify-center bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))]",
				title:
					"line-clamp-2 max-w-[760px] text-center font-medium text-[92px] leading-[1.05] tracking-[-0.04em]",
				brand: "mt-10 gap-5 text-muted-foreground",
				logo: "h-[60px] w-[60px] rounded-2xl",
				site: "font-medium text-[60px] tracking-[-0.03em]",
			},
		},
	},
	defaultVariants: { mode: "light", tone: "neutral", variant: "streaks" },
});

/** Picker rows fade and blur with their distance from the selected word. */
export const ogLandingWord = tv({
	base: "relative flex h-[120px] shrink-0 items-center whitespace-nowrap px-6 text-[88px] leading-none tracking-[-0.03em]",
	variants: {
		step: {
			0: "",
			1: "opacity-50 blur-[1px]",
			2: "opacity-25 blur-[3px]",
			3: "opacity-10 blur-[5px]",
		},
	},
	defaultVariants: { step: 0 },
});

export type OgLandingMode = NonNullable<VariantProps<typeof ogLanding>["mode"]>;
export type OgLandingTone = NonNullable<VariantProps<typeof ogLanding>["tone"]>;
export type OgLandingVariant = NonNullable<VariantProps<typeof ogLanding>["variant"]>;
export type OgLandingWordStep = NonNullable<VariantProps<typeof ogLandingWord>["step"]>;

/** Picker row height (px) and the canvas line the selected row centres on. */
export const OG_LANDING_ROW = 120;
export const OG_LANDING_AXIS = 305;

/** Light streaks for `streaks`: start x on the bottom edge, opacity, and accent lines. */
export const OG_LANDING_STREAKS = [
	{ left: 500, opacity: 0.18, accent: false },
	{ left: 560, opacity: 0.3, accent: false },
	{ left: 620, opacity: 1, accent: true },
	{ left: 672, opacity: 0.22, accent: false },
	{ left: 716, opacity: 0.35, accent: false },
	{ left: 768, opacity: 0.5, accent: true },
	{ left: 812, opacity: 0.2, accent: false },
	{ left: 860, opacity: 0.28, accent: false },
	{ left: 912, opacity: 0.16, accent: false },
	{ left: 960, opacity: 0.3, accent: false },
	{ left: 1016, opacity: 0.14, accent: false },
	{ left: 1076, opacity: 0.24, accent: false },
	{ left: 1140, opacity: 0.12, accent: false },
];

/** Handle dots on the picker selection box, as percent offsets. */
export const OG_LANDING_HANDLES = [
	[0, 0],
	[50, 0],
	[100, 0],
	[0, 50],
	[100, 50],
	[0, 100],
	[50, 100],
	[100, 100],
];

/** Two offset columns of framed shots for `showcase`; heights in px, images cycle. */
export const OG_LANDING_SHOWCASE = [
	{ left: 676, top: -36, heights: [300, 150, 300] },
	{ left: 906, top: -8, heights: [150, 300, 240] },
];

/** Portrait tiles around the headline in `spotlight`. */
export const OG_LANDING_SPOTLIGHT = [
	{ left: 136, top: -10, width: 116, height: 124 },
	{ left: 22, top: 170, width: 116, height: 136 },
	{ left: 168, top: 370, width: 116, height: 136 },
	{ left: -6, top: 482, width: 96, height: 150 },
	{ left: 872, top: -12, width: 116, height: 120 },
	{ left: 1040, top: 116, width: 116, height: 136 },
	{ left: 924, top: 342, width: 116, height: 136 },
	{ left: 1062, top: 524, width: 116, height: 136 },
];
