import type { Framework } from "@baby-ui/registry-schema";

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

/** A theme token (`--primary`) or any hex colour. */
export type OgColor = string;

export const OG_TOKENS: OgColor[] = [
	"--foreground",
	"--muted-foreground",
	"--background",
	"--muted",
	"--primary",
	"--primary-foreground",
	"--chart-1",
	"--chart-2",
	"--chart-3",
	"--chart-4",
	"--chart-5",
];

export const OG_FONTS = ["sans", "heading", "serif", "mono"] as const;
export type OgFont = (typeof OG_FONTS)[number];
export const OG_WEIGHTS = [400, 500, 600, 700, 800, 900] as const;
export type OgWeight = (typeof OG_WEIGHTS)[number];
export const OG_ALIGNS = ["left", "center", "right"] as const;
export type OgAlign = (typeof OG_ALIGNS)[number];
export const OG_EFFECTS = ["none", "glow", "spotlight", "diagonal"] as const;
export type OgEffect = (typeof OG_EFFECTS)[number];
export const OG_PATTERNS = ["none", "grid", "dots"] as const;
export type OgPattern = (typeof OG_PATTERNS)[number];

type Box = {
	id: string;
	x: number;
	y: number;
	w: number;
	/** Ignored for text, which grows with its lines. */
	h: number;
	rotate: number;
	/** 0 to 100. */
	opacity: number;
	hidden?: boolean;
};

export type OgTextLayer = Box & {
	kind: "text";
	text: string;
	font: OgFont;
	size: number;
	weight: OgWeight;
	color: OgColor;
	align: OgAlign;
	leading: number;
	/** Hundredths of an em, so -3 is -0.03em. */
	tracking: number;
};

export type OgImageLayer = Box & {
	kind: "image";
	src: string;
	fit: "cover" | "contain";
	radius: number;
	/** Flips the colours, so a black logo reads on a dark card. */
	invert?: boolean;
};

export type OgShapeLayer = Box & {
	kind: "shape";
	fill: OgColor;
	radius: number;
	ellipse: boolean;
	stroke: OgColor;
	strokeWidth: number;
};

export type OgLayer = OgTextLayer | OgImageLayer | OgShapeLayer;
export type OgLayerKind = OgLayer["kind"];

export type OgBackground = {
	dark: boolean;
	fill: OgColor;
	accent: OgColor;
	effect: OgEffect;
	pattern: OgPattern;
};

export type OgDoc = {
	background: OgBackground;
	layers: OgLayer[];
	/** The layout it started from; a Pro layout gates export. */
	layout?: { id: string; tier: "free" | "pro" };
};

export const cssColor = (color: OgColor) =>
	color.startsWith("--") ? `var(${color})` : color;

const twColor = (prefix: string, color: OgColor) =>
	color.startsWith("--") ? `${prefix}-${color.slice(2)}` : `${prefix}-[${color}]`;

const mix = (color: OgColor, percent: number) =>
	`color-mix(in oklch, ${cssColor(color)} ${percent}%, transparent)`;

const EFFECT: Record<OgEffect, (accent: OgColor) => string | null> = {
	none: () => null,
	glow: (a) => `radial-gradient(circle at 12% 0%, ${mix(a, 55)}, transparent 55%)`,
	spotlight: (a) =>
		`radial-gradient(ellipse 70% 55% at 50% 105%, ${mix(a, 40)}, transparent 70%)`,
	diagonal: (a) => `linear-gradient(135deg, transparent 35%, ${mix(a, 45)})`,
};

const LINE = mix("--foreground", 8);
const PATTERN: Record<OgPattern, { image: string; size: string } | null> = {
	none: null,
	grid: {
		image: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
		size: "48px 48px, 48px 48px",
	},
	dots: {
		image: `radial-gradient(${mix("--foreground", 16)} 1.5px, transparent 1.5px)`,
		size: "24px 24px",
	},
};

/** The card background as CSS declarations, shared by the editor, the PNG and the code. */
export function backgroundCss(bg: OgBackground): Record<string, string> {
	const pattern = PATTERN[bg.pattern];
	const effect = EFFECT[bg.effect](bg.accent);
	const images = [pattern?.image, effect].filter((v): v is string => Boolean(v));
	const sizes = [pattern?.size, effect ? "auto" : undefined].filter((v): v is string =>
		Boolean(v),
	);
	return {
		"background-color": cssColor(bg.fill),
		...(images.length
			? { "background-image": images.join(", "), "background-size": sizes.join(", ") }
			: {}),
	};
}

const FONT_VAR: Record<OgFont, string> = {
	sans: "var(--font-sans)",
	heading: "var(--font-heading)",
	serif: "var(--font-serif)",
	mono: "var(--font-mono)",
};

const WEIGHT_CLASS: Record<OgWeight, string> = {
	400: "font-normal",
	500: "font-medium",
	600: "font-semibold",
	700: "font-bold",
	800: "font-extrabold",
	900: "font-black",
};

/** One layer's CSS declarations, in canvas pixels. */
export function layerCss(layer: OgLayer): Record<string, string> {
	const box: Record<string, string> = {
		position: "absolute",
		left: `${layer.x}px`,
		top: `${layer.y}px`,
		width: `${layer.w}px`,
		...(layer.kind === "text" ? {} : { height: `${layer.h}px` }),
		...(layer.rotate ? { transform: `rotate(${layer.rotate}deg)` } : {}),
		...(layer.opacity < 100 ? { opacity: String(layer.opacity / 100) } : {}),
	};
	if (layer.kind === "text")
		return {
			...box,
			margin: "0",
			"font-family": FONT_VAR[layer.font],
			"font-size": `${layer.size}px`,
			"font-weight": String(layer.weight),
			color: cssColor(layer.color),
			"text-align": layer.align,
			"line-height": String(layer.leading),
			"letter-spacing": `${layer.tracking / 100}em`,
			"white-space": "pre-wrap",
		};
	if (layer.kind === "image")
		return {
			...box,
			"object-fit": layer.fit,
			...(layer.radius ? { "border-radius": `${layer.radius}px` } : {}),
			...(layer.invert ? { filter: "invert(1)" } : {}),
		};
	return {
		...box,
		"background-color": cssColor(layer.fill),
		"border-radius": layer.ellipse ? "9999px" : `${layer.radius}px`,
		...(layer.strokeWidth
			? { border: `${layer.strokeWidth}px solid ${cssColor(layer.stroke)}` }
			: {}),
	};
}

export const styleString = (css: Record<string, string>) =>
	Object.entries(css)
		.map(([key, value]) => `${key}:${value}`)
		.join(";");

const escapeHtml = (text: string) =>
	text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;");

/** The card as standalone HTML for the takumi worker; tokens resolve against the site CSS. */
export function docHtml(doc: OgDoc): string {
	const root = styleString({
		position: "relative",
		width: `${OG_WIDTH}px`,
		height: `${OG_HEIGHT}px`,
		overflow: "hidden",
		color: "var(--foreground)",
		"font-family": "var(--font-sans)",
		...backgroundCss(doc.background),
	});
	const layers = doc.layers
		.filter((layer) => !layer.hidden)
		.map((layer) => {
			const style = escapeHtml(styleString(layerCss(layer)));
			if (layer.kind === "text")
				return `<p style="${style}">${escapeHtml(layer.text)}</p>`;
			if (layer.kind === "image")
				return `<img src="${escapeHtml(layer.src)}" alt="" style="${style}" />`;
			return `<div style="${style}"></div>`;
		});
	return `<div class="${doc.background.dark ? "dark" : ""}" style="${root}">${layers.join("")}</div>`;
}

// Tailwind arbitrary values can't hold spaces; underscores stand in for them.
const arb = (value: string) => value.replaceAll(" ", "_");

function layerClasses(layer: OgLayer): string {
	const box = [
		"absolute",
		`top-[${layer.y}px]`,
		`left-[${layer.x}px]`,
		`w-[${layer.w}px]`,
		layer.kind === "text" ? "" : `h-[${layer.h}px]`,
		layer.rotate ? `rotate-[${layer.rotate}deg]` : "",
		layer.opacity < 100 ? `opacity-${layer.opacity}` : "",
	];
	const own =
		layer.kind === "text"
			? [
					`font-${layer.font}`,
					`text-[${layer.size}px]`,
					WEIGHT_CLASS[layer.weight],
					twColor("text", layer.color),
					layer.align === "left" ? "" : `text-${layer.align}`,
					`leading-[${layer.leading}]`,
					layer.tracking ? `tracking-[${layer.tracking / 100}em]` : "",
					"whitespace-pre-wrap",
				]
			: layer.kind === "image"
				? [
						`object-${layer.fit}`,
						layer.radius ? `rounded-[${layer.radius}px]` : "",
						layer.invert ? "invert" : "",
					]
				: [
						twColor("bg", layer.fill),
						layer.ellipse
							? "rounded-full"
							: layer.radius
								? `rounded-[${layer.radius}px]`
								: "",
						layer.strokeWidth
							? `border-[${layer.strokeWidth}px] ${twColor("border", layer.stroke)}`
							: "",
					];
	return [...box, ...own].filter(Boolean).join(" ");
}

function rootClasses(bg: OgBackground): string {
	const css = backgroundCss(bg);
	return [
		bg.dark ? "dark" : "",
		"relative h-[630px] w-[1200px] overflow-hidden font-sans text-foreground",
		twColor("bg", bg.fill),
		css["background-image"] ? `bg-[image:${arb(css["background-image"])}]` : "",
		css["background-size"] ? `bg-[size:${arb(css["background-size"])}]` : "",
	]
		.filter(Boolean)
		.join(" ");
}

const needsExpression = (text: string) => /[{}<>\n]/.test(text);

/** The card as a component in the reader's framework, Tailwind classes only. */
export function docCode(doc: OgDoc, framework: Framework): string {
	const react = framework === "react";
	const attr = react ? "className" : "class";
	let uploads = 0;
	const lines = doc.layers
		.filter((layer) => !layer.hidden)
		.map((layer) => {
			const cls = `${attr}="${layerClasses(layer)}"`;
			if (layer.kind === "text") {
				const body = needsExpression(layer.text)
					? `{${JSON.stringify(layer.text)}}`
					: layer.text;
				return `<p ${cls}>${body}</p>`;
			}
			if (layer.kind === "image") {
				const src = layer.src.startsWith("data:")
					? `/og-image-${++uploads}.png`
					: layer.src;
				return `<img src=${JSON.stringify(src)} alt="" ${cls} />`;
			}
			return react ? `<div ${cls} />` : `<div ${cls}></div>`;
		});
	const note = uploads
		? `${react ? "//" : "<!--"} Uploaded images: save them as /og-image-1.png and so on.${react ? "" : " -->"}\n`
		: "";
	const root = `<div ${attr}="${rootClasses(doc.background)}">`;
	if (react)
		return [
			note + "export function OgCard() {",
			"\treturn (",
			`\t\t${root}`,
			...lines.map((line) => `\t\t\t${line}`),
			"\t\t</div>",
			"\t);",
			"}",
			"",
		].join("\n");
	return [note + root, ...lines.map((line) => `\t${line}`), "</div>", ""].join("\n");
}

const uid = () => Math.random().toString(36).slice(2, 10);

export function newText(text = "Double-click to edit"): OgTextLayer {
	return {
		id: uid(),
		kind: "text",
		x: 80,
		y: 260,
		w: 720,
		h: 0,
		rotate: 0,
		opacity: 100,
		text,
		font: "heading",
		size: 56,
		weight: 700,
		color: "--foreground",
		align: "left",
		leading: 1.05,
		tracking: -2,
	};
}

export function newShape(): OgShapeLayer {
	return {
		id: uid(),
		kind: "shape",
		x: 500,
		y: 215,
		w: 200,
		h: 200,
		rotate: 0,
		opacity: 100,
		fill: "--primary",
		radius: 24,
		ellipse: false,
		stroke: "--foreground",
		strokeWidth: 0,
	};
}

export function newImage(src: string, w = 320, h = 320): OgImageLayer {
	return {
		id: uid(),
		kind: "image",
		x: Math.round((OG_WIDTH - w) / 2),
		y: Math.round((OG_HEIGHT - h) / 2),
		w,
		h,
		rotate: 0,
		opacity: 100,
		src,
		fit: "cover",
		radius: 16,
	};
}

export const cloneLayer = (layer: OgLayer): OgLayer => ({
	...layer,
	id: uid(),
	x: layer.x + 24,
	y: layer.y + 24,
});

/** Canvas lines a moving box snaps to, and how close counts, in canvas pixels. */
const SNAP = 8;

/** Snaps a box's start, centre or end to the nearest target; returns the start and the hit line. */
export function snapAxis(
	start: number,
	size: number,
	targets: number[],
): { start: number; guide: number | null } {
	let best: { start: number; guide: number; distance: number } | null = null;
	for (const target of targets)
		for (const offset of [0, size / 2, size]) {
			const distance = Math.abs(start + offset - target);
			if (distance <= SNAP && (!best || distance < best.distance))
				best = { start: target - offset, guide: target, distance };
		}
	return best
		? { start: Math.round(best.start), guide: best.guide }
		: { start, guide: null };
}

export const SNAP_X = [0, 80, OG_WIDTH / 2, OG_WIDTH - 80, OG_WIDTH];
export const SNAP_Y = [0, 72, OG_HEIGHT / 2, OG_HEIGHT - 72, OG_HEIGHT];

export function isOgDoc(value: unknown): value is OgDoc {
	return (
		typeof value === "object" &&
		value !== null &&
		"background" in value &&
		"layers" in value &&
		Array.isArray(value.layers)
	);
}
