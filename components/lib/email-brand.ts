import { emailColors, emailFonts, emailTailwindConfig } from "./email-theme";

export type EmailRadius = "none" | "sm" | "md" | "lg" | "full";
export type EmailDensity = "compact" | "default" | "relaxed";

export interface EmailBrand {
	/** Brand colour as `#rrggbb`. Soft fills, dark-mode twin and label colour derive from it. */
	primary?: string;
	/** Override the derived dark-mode brand colour. */
	primaryDark?: string;
	/** Corner scale for the card, panels, buttons and chips. */
	radius?: EmailRadius;
	/** Scales gutters and gaps together: `compact` for dense brands, `relaxed` for airy ones. */
	density?: EmailDensity;
	fontSans?: readonly string[];
	fontMono?: readonly string[];
	/** Any other token, in hex, replacing the default. */
	colors?: Partial<Record<keyof typeof emailColors, string>>;
}

// Corner px for [card, inner (panels, hero), control (buttons, code), chip (badges)].
const RADIUS: Record<EmailRadius, [number, number, number, number]> = {
	none: [0, 0, 0, 0],
	sm: [8, 6, 5, 3],
	md: [14, 14, 10, 6],
	lg: [20, 16, 12, 8],
	full: [24, 20, 999, 999],
};

// Layout px at the default density: card side padding, panel padding, hero and section
// padding, gap between stacked blocks, space between groups, and the gap between cards.
const SPACE = {
	gutter: 24,
	pad: 16,
	stack: 28,
	section: 28,
	block: 24,
	gap: 12,
} as const;
const SCALE: Record<EmailDensity, number> = { compact: 0.8, default: 1, relaxed: 1.25 };

type Rgb = [number, number, number];

function parse(hex: string): Rgb {
	const value = hex.replace("#", "");
	const full =
		value.length === 3
			? value
					.split("")
					.map((c) => c + c)
					.join("")
			: value;
	const n = Number.parseInt(full, 16);
	return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = ([r, g, b]: Rgb) =>
	`#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

const mix = (a: string, b: string, amount: number) => {
	const [x, y] = [parse(a), parse(b)];
	return toHex(x.map((v, i) => v * amount + (y[i] ?? 0) * (1 - amount)) as Rgb);
};

function luminance(hex: string) {
	const [r, g, b] = parse(hex).map((v) => {
		const c = v / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	}) as Rgb;
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function emailContrast(a: string, b: string) {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return ((hi ?? 0) + 0.05) / ((lo ?? 0) + 0.05);
}

/** The softest label that reads at 4.5:1 on `fill`, else pure white or black, else the best. */
function labelOn(fill: string, light: string, dark: string) {
	const options = [light, dark, "#ffffff", "#000000"];
	return (
		options.find((label) => emailContrast(fill, label) >= 4.5) ??
		options.reduce((best, label) =>
			emailContrast(fill, label) > emailContrast(fill, best) ? label : best,
		)
	);
}

/** Lightens `colour` toward white until it reads at 4.5:1 on `surface`. */
function readableOn(colour: string, surface: string) {
	let next = colour;
	for (let i = 0; i < 20 && emailContrast(next, surface) < 4.5; i++)
		next = mix("#ffffff", next, 0.12);
	return next;
}

const px = (value: number) => `${Math.round(value)}px`;

/**
 * The Tailwind theme for React Email's `<Tailwind config>` and Better Svelte Email's
 * `Renderer`, with the brand's colour, corners, spacing and fonts applied. Templates use
 * semantic classes (`px-gutter`, `py-stack`, `rounded-card`), so one call re-fits every email.
 */
export function createEmailTheme(brand: EmailBrand = {}) {
	const { primary, radius = "md", density = "default" } = brand;
	const colors: Record<string, string> = { ...emailColors };
	if (primary) {
		const dark = brand.primaryDark ?? readableOn(primary, emailColors["background-dark"]);
		colors.primary = primary;
		colors["primary-foreground"] = labelOn(
			primary,
			emailColors["primary-foreground"],
			emailColors["primary-foreground-dark"],
		);
		colors["primary-dark"] = dark;
		colors["primary-foreground-dark"] = labelOn(
			dark,
			emailColors["primary-foreground"],
			emailColors["primary-foreground-dark"],
		);
		colors["primary-soft"] = mix(primary, emailColors.background, 0.1);
		colors["primary-soft-dark"] = mix(dark, emailColors["background-dark"], 0.16);
	}
	Object.assign(colors, brand.colors);

	const [card, inner, control, chip] = RADIUS[radius];
	const k = SCALE[density];
	const spacing = Object.fromEntries(
		Object.entries(SPACE).map(([name, value]) => [name, px(value * k)]),
	);
	const fontFamily = {
		sans: [...(brand.fontSans ?? emailFonts.sans)],
		mono: [...(brand.fontMono ?? emailFonts.mono)],
	};

	return {
		...emailTailwindConfig,
		theme: {
			...emailTailwindConfig.theme,
			extend: {
				colors,
				fontFamily,
				spacing,
				borderRadius: {
					card: px(card),
					inner: px(inner),
					control: px(control),
					chip: px(chip),
					DEFAULT: px(control),
					sm: px(chip),
					lg: px(card),
				},
			},
		},
	};
}
