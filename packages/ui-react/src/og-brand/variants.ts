import { tv, type VariantProps } from "tailwind-variants";

export const ogBrand = tv({
	slots: {
		root: "relative flex h-[630px] w-[1200px] items-center justify-center overflow-hidden bg-background font-sans text-foreground",
		mark: "relative flex flex-col items-center gap-6",
		wordmark: "flex items-center gap-6",
		logo: "h-[96px] w-[96px] shrink-0 rounded-[22px] object-cover",
		name: "line-clamp-1 max-w-[900px] font-heading font-semibold text-[112px] leading-[1.1] tracking-[-0.045em]",
		tagline: "line-clamp-1 max-w-[860px] text-[30px] text-muted-foreground",
		field: "absolute inset-0 h-full w-full",
		hairX: "absolute inset-x-0 top-[315px] h-px",
		hairY: "absolute inset-y-0 left-[600px] w-px",
		dots: "absolute inset-0 bg-[radial-gradient(var(--foreground)_1.5px,transparent_1.5px)] bg-[size:22px_22px] opacity-[0.14]",
		blobA: "absolute rounded-full",
		blobB: "absolute rounded-full",
		blobC: "absolute rounded-full",
		sheen: "absolute",
		veil: "absolute inset-0",
		tile: "absolute overflow-hidden object-cover",
		softTile: "blur-[3px]",
		panel: "absolute top-0 left-[540px] h-full w-[700px] rounded-l-[315px] object-cover",
	},
	variants: {
		mode: {
			light: {},
			dark: { root: "dark" },
		},
		variant: {
			plain: {},
			waves: {
				root: "bg-muted",
				field:
					"text-foreground/30 [mask-image:radial-gradient(ellipse_58%_62%_at_50%_50%,transparent_28%,black_80%)]",
				hairX: "bg-foreground/10",
				hairY: "bg-foreground/10",
			},
			pipes: {},
			mesh: {
				root: "bg-chart-2 text-white",
				tagline: "text-white/80",
				blobA: "-top-[260px] left-[560px] h-[560px] w-[820px] bg-chart-4 blur-[90px]",
				blobB: "top-[160px] -left-[220px] h-[440px] w-[820px] bg-chart-5 blur-[90px]",
				blobC: "top-[430px] -left-[260px] h-[420px] w-[700px] bg-chart-1 blur-[90px]",
				sheen:
					"-inset-x-40 top-[150px] h-[220px] -rotate-[14deg] bg-white/30 blur-[50px]",
				veil: "bg-[repeating-linear-gradient(100deg,rgb(255_255_255/0.08)_0_2px,transparent_2px_10px)]",
			},
			blur: {
				root: "bg-[color-mix(in_oklab,var(--foreground)_30%,var(--background))] text-background",
				tagline: "text-background/70",
				blobA:
					"-top-[160px] left-[360px] h-[960px] w-[520px] -rotate-[28deg] bg-foreground blur-[56px]",
				blobB:
					"-top-[260px] -right-[240px] h-[900px] w-[900px] bg-[repeating-radial-gradient(circle,transparent_0_14px,var(--foreground)_14px_18px)] opacity-30 blur-[2px] [mask-image:radial-gradient(circle,black_25%,transparent_68%)]",
				blobC:
					"-bottom-[300px] -left-[260px] h-[800px] w-[800px] bg-[repeating-radial-gradient(circle,transparent_0_12px,var(--foreground)_12px_16px)] opacity-25 blur-[2px] [mask-image:radial-gradient(circle,black_25%,transparent_68%)]",
			},
			scatter: {
				root: "bg-[color-mix(in_oklab,var(--foreground)_3%,var(--background))]",
				tile: "rounded-[28px] shadow-[0_28px_56px_-28px_rgb(0_0_0/0.45)]",
			},
			mosaic: {
				mark: "gap-4",
				wordmark: "flex-col gap-5",
				logo: "h-[120px] w-[120px] rounded-[28px]",
				name: "max-w-[300px] text-[48px] tracking-[-0.035em]",
				tagline: "max-w-[300px] text-[22px]",
				tile: "rounded-[16px]",
			},
			split: {
				root: "justify-start pl-[80px]",
				mark: "max-w-[440px] items-start",
				name: "max-w-[340px] text-[84px]",
				logo: "h-[84px] w-[84px]",
				tagline: "max-w-[420px] text-[26px]",
				panel: "border-border border-l",
			},
		},
	},
	compoundVariants: [{ variant: "mesh", mode: "dark", class: { sheen: "bg-white/15" } }],
	defaultVariants: { mode: "light", variant: "plain" },
});

/** Pipe band colours, outermost first; borders only so the bands stay concentric. */
export const ogBrandBand = tv({
	base: "absolute",
	variants: {
		side: {
			lb: "border-b-[14px] border-l-[14px]",
			lt: "border-t-[14px] border-l-[14px]",
		},
		slot: {
			1: "border-chart-5",
			2: "border-chart-4",
			3: "border-chart-3",
			4: "border-chart-2",
			5: "border-chart-1",
		},
	},
	defaultVariants: { side: "lb", slot: 1 },
});

export type OgBrandMode = NonNullable<VariantProps<typeof ogBrand>["mode"]>;
export type OgBrandVariant = NonNullable<VariantProps<typeof ogBrand>["variant"]>;
export type OgBrandBandSide = NonNullable<VariantProps<typeof ogBrandBand>["side"]>;
export type OgBrandBandSlot = NonNullable<VariantProps<typeof ogBrandBand>["slot"]>;

interface Box {
	left: number;
	top: number;
	width: number;
	height: number;
}

const BAND = 14;
const SLOTS: OgBrandBandSlot[] = [1, 2, 3, 4, 5];

/** Rounded pipe bands entering from three edges; each group nests five bands inward. */
export const OG_BRAND_PIPES: (Box & {
	side: OgBrandBandSide;
	slot: OgBrandBandSlot;
	radius: number;
})[] = (
	[
		{ side: "lb", left: -10, top: -80, width: 350, height: 170, radius: 84 },
		{ side: "lb", left: 800, top: -90, width: 480, height: 170, radius: 84 },
		{ side: "lt", left: 700, top: 556, width: 600, height: 200, radius: 84 },
		{ side: "lt", left: 1150, top: 190, width: 200, height: 500, radius: 84 },
	] as const
).flatMap((group) =>
	SLOTS.map((slot, i) => ({
		side: group.side,
		slot,
		left: group.left + i * BAND,
		top: group.side === "lt" ? group.top + i * BAND : group.top,
		width: group.width - i * BAND,
		height: group.height - i * BAND,
		radius: Math.max(group.radius - i * BAND, 8),
	})),
);

/** Image tile slots around the centred wordmark in `scatter`; images cycle through them. */
export const OG_BRAND_SCATTER: (Box & { soft: boolean })[] = [
	{ left: 64, top: 52, width: 250, height: 240, soft: true },
	{ left: 352, top: -64, width: 200, height: 160, soft: false },
	{ left: 668, top: -44, width: 260, height: 214, soft: true },
	{ left: 968, top: 44, width: 290, height: 380, soft: false },
	{ left: -44, top: 372, width: 300, height: 260, soft: false },
	{ left: 334, top: 474, width: 290, height: 200, soft: true },
	{ left: 704, top: 502, width: 230, height: 170, soft: false },
];

/** Masonry columns for `mosaic`; the centre column leaves a gap for the wordmark. */
export const OG_BRAND_MOSAIC: Box[] = [
	[-37, -60, 240],
	[-37, 196, 200],
	[-37, 412, 260],
	[199, -20, 180],
	[199, 176, 280],
	[199, 472, 200],
	[435, -110, 260],
	[435, 470, 220],
	[781, -80, 230],
	[781, 166, 220],
	[781, 402, 260],
	[1017, -30, 170],
	[1017, 156, 260],
	[1017, 432, 220],
].map(([left = 0, top = 0, height = 0]) => ({
	left,
	top,
	height,
	width: left === 435 ? 330 : 220,
}));

/** Lens-warped grid for `waves`: lines bulge away from the centre and ripple outward. */
export const OG_BRAND_WAVES: string[] = (() => {
	const cx = 600;
	const cy = 315;
	const shift = (x: number, y: number) => {
		const r = Math.hypot((x - cx) / cx, (y - cy) / cy);
		return { push: 0.2 * Math.exp(-r * r * 2.4), amp: 10 * Math.min(1, r) };
	};
	const paths: string[] = [];
	for (let x0 = 20; x0 <= 1180; x0 += 40) {
		const pts: string[] = [];
		for (let y = -15; y <= 645; y += 15) {
			const { push, amp } = shift(x0, y);
			const x = x0 + (x0 - cx) * push + amp * Math.sin((y * Math.PI) / 40);
			pts.push(`${pts.length ? "L" : "M"}${x.toFixed(1)} ${y}`);
		}
		paths.push(pts.join(" "));
	}
	for (let y0 = 15; y0 <= 615; y0 += 40) {
		const pts: string[] = [];
		for (let x = -15; x <= 1215; x += 15) {
			const { push, amp } = shift(x, y0);
			const y = y0 + (y0 - cy) * push + amp * Math.sin((x * Math.PI) / 40);
			pts.push(`${pts.length ? "L" : "M"}${x} ${y.toFixed(1)}`);
		}
		paths.push(pts.join(" "));
	}
	return paths;
})();
