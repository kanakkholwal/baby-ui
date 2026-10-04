import {
	newImage,
	newShape,
	newText,
	type OgDoc,
	type OgImageLayer,
	type OgLayer,
	type OgShapeLayer,
	type OgTextLayer,
} from "./og-canvas";

export type OgPreset = {
	id: string;
	label: string;
	description: string;
	tier: "free" | "pro";
	doc: () => OgDoc;
};

const MARK = "/email/baby-ui-mark.png";

const text = (over: Partial<OgTextLayer>): OgTextLayer => ({ ...newText(), ...over });
const body = (over: Partial<OgTextLayer>): OgTextLayer =>
	text({
		font: "sans",
		size: 28,
		weight: 400,
		color: "--muted-foreground",
		tracking: 0,
		leading: 1.3,
		...over,
	});
const image = (src: string, over: Partial<OgImageLayer>): OgImageLayer => ({
	...newImage(src),
	...over,
});
const shape = (over: Partial<OgShapeLayer>): OgShapeLayer => ({ ...newShape(), ...over });
// The mark is a black tile; on dark cards it flips to white so it doesn't sink into the fill.
const logo = (x: number, y: number, onDark = false) =>
	image(MARK, { x, y, w: 48, h: 48, fit: "contain", radius: 12, invert: onDark });
// Glass on dark cards: a translucent white fill and edge, since muted greys turn muddy there.
const GLASS = "#ffffff12";
const GLASS_EDGE = "#ffffff2e";

const background = (over: Partial<OgDoc["background"]> = {}): OgDoc["background"] => ({
	dark: false,
	fill: "--background",
	accent: "--primary",
	effect: "none",
	pattern: "none",
	...over,
});

export const blankDoc = (): OgDoc => ({ background: background(), layers: [] });

/** Moves a box so its centre turns `deg` around (cx, cy), and tilts it the same amount. */
function orbit<T extends OgLayer>(
	layer: T,
	h: number,
	cx: number,
	cy: number,
	deg: number,
): T {
	const rad = (deg * Math.PI) / 180;
	const dx = layer.x + layer.w / 2 - cx;
	const dy = layer.y + h / 2 - cy;
	const x = cx + dx * Math.cos(rad) - dy * Math.sin(rad);
	const y = cy + dx * Math.sin(rad) + dy * Math.cos(rad);
	return {
		...layer,
		x: Math.round(x - layer.w / 2),
		y: Math.round(y - h / 2),
		rotate: layer.rotate + deg,
	};
}

/** Starting points; each is plain layers, so anything in them can be moved or deleted. */
export const OG_PRESETS: OgPreset[] = [
	{
		id: "headline",
		label: "Headline",
		description: "Logo, big title and a line of copy on a soft glow.",
		tier: "free",
		doc: () => ({
			background: background({ effect: "glow", pattern: "grid" }),
			layers: [
				logo(80, 72),
				text({ x: 144, y: 78, w: 400, text: "Baby UI", size: 30 }),
				text({
					x: 80,
					y: 200,
					w: 920,
					text: "Ship the first frame people see.",
					size: 76,
					leading: 1.02,
					tracking: -3,
				}),
				body({
					x: 80,
					y: 430,
					w: 760,
					text: "Animated, accessible components for React and Svelte.",
				}),
				body({
					x: 80,
					y: 540,
					w: 600,
					text: "Components · Blocks · Charts",
					font: "mono",
					size: 20,
					weight: 500,
				}),
			],
		}),
	},
	{
		id: "launch",
		label: "Launch",
		description: "A centred announcement with a pill, on a dark spotlight.",
		tier: "free",
		doc: () => ({
			background: background({ dark: true, effect: "spotlight", pattern: "dots" }),
			layers: [
				shape({ x: 528, y: 120, w: 144, h: 44, radius: 22 }),
				text({
					x: 528,
					y: 128,
					w: 144,
					text: "New",
					font: "sans",
					size: 22,
					weight: 600,
					color: "--primary-foreground",
					align: "center",
					tracking: 0,
				}),
				text({
					x: 100,
					y: 210,
					w: 1000,
					text: "Orbit Hero",
					size: 96,
					align: "center",
					tracking: -3,
				}),
				body({
					x: 150,
					y: 350,
					w: 900,
					text: "Two rings of icons, one dial, zero setup.",
					size: 32,
					align: "center",
				}),
				logo(576, 500, true),
			],
		}),
	},
	{
		id: "split",
		label: "Split",
		description: "Copy on the left, a full-height photo on the right.",
		tier: "free",
		doc: () => ({
			background: background({ effect: "glow" }),
			layers: [
				image("https://picsum.photos/id/1043/520/630", {
					x: 680,
					y: 0,
					w: 520,
					h: 630,
					radius: 0,
				}),
				text({
					x: 80,
					y: 96,
					w: 540,
					text: "CASE STUDY",
					font: "mono",
					size: 18,
					weight: 600,
					color: "--primary",
					tracking: 12,
				}),
				text({
					x: 80,
					y: 150,
					w: 540,
					text: "How we cut load time in half",
					size: 60,
					leading: 1.05,
				}),
				body({
					x: 80,
					y: 380,
					w: 520,
					text: "Fewer requests, smaller bundles, and a render path that never waits.",
					size: 26,
				}),
				logo(80, 520),
				text({ x: 144, y: 528, w: 300, text: "Baby UI", size: 26 }),
			],
		}),
	},
	{
		id: "changelog",
		label: "Changelog",
		description: "A version pill, a title and three highlights.",
		tier: "free",
		doc: () => ({
			background: background({
				accent: "--chart-3",
				effect: "diagonal",
				pattern: "grid",
			}),
			layers: [
				shape({ x: 80, y: 88, w: 132, h: 40, radius: 20, fill: "--foreground" }),
				text({
					x: 80,
					y: 96,
					w: 132,
					text: "v2.4.0",
					font: "mono",
					size: 18,
					weight: 600,
					color: "--background",
					align: "center",
					tracking: 0,
				}),
				text({ x: 80, y: 160, w: 940, text: "Faster builds, smaller bundles", size: 64 }),
				body({ x: 80, y: 320, w: 900, text: "•  Icons tree-shake per file" }),
				body({ x: 80, y: 370, w: 900, text: "•  Charts render 40% faster" }),
				body({ x: 80, y: 420, w: 900, text: "•  New OG image studio" }),
				logo(1072, 526),
			],
		}),
	},
	{
		id: "event",
		label: "Event",
		description: "A date block beside the event name and time.",
		tier: "free",
		doc: () => ({
			background: background({ pattern: "dots", effect: "glow", accent: "--chart-2" }),
			layers: [
				shape({ x: 80, y: 160, w: 220, h: 260, radius: 28, fill: "--primary" }),
				text({
					x: 80,
					y: 190,
					w: 220,
					text: "OCT",
					font: "mono",
					size: 30,
					weight: 600,
					color: "--primary-foreground",
					align: "center",
					tracking: 10,
				}),
				text({
					x: 80,
					y: 236,
					w: 220,
					text: "24",
					size: 130,
					weight: 900,
					color: "--primary-foreground",
					align: "center",
					leading: 1,
				}),
				text({ x: 360, y: 180, w: 760, text: "Design Systems Summit", size: 64 }),
				body({
					x: 360,
					y: 340,
					w: 700,
					text: "Online · 18:00 UTC · Free to join",
					size: 30,
				}),
				logo(1072, 526),
			],
		}),
	},
	{
		id: "statement",
		label: "Statement",
		description: "One big serif line and nothing else.",
		tier: "free",
		doc: () => ({
			background: background(),
			layers: [
				text({
					x: 100,
					y: 220,
					w: 1000,
					text: "Make it obvious.",
					font: "serif",
					size: 128,
					weight: 500,
					align: "center",
					tracking: -3,
				}),
				logo(576, 520),
			],
		}),
	},
	{
		id: "quote",
		label: "Quote",
		description: "A testimonial with a portrait, name and role.",
		tier: "free",
		doc: () => ({
			background: background({ accent: "--chart-3", effect: "diagonal" }),
			layers: [
				text({
					x: 100,
					y: 110,
					w: 1000,
					text: "“It reads like the docs were written by someone who ships.”",
					font: "serif",
					size: 60,
					weight: 500,
					leading: 1.1,
					tracking: -1,
				}),
				image("https://randomuser.me/api/portraits/women/44.jpg", {
					x: 100,
					y: 450,
					w: 72,
					h: 72,
					radius: 36,
				}),
				text({
					x: 192,
					y: 456,
					w: 500,
					text: "Maya Chen",
					font: "sans",
					size: 28,
					weight: 600,
					tracking: 0,
				}),
				body({ x: 192, y: 494, w: 500, text: "Design engineer", size: 22 }),
			],
		}),
	},
	{
		id: "card-fan",
		label: "Card fan",
		description: "A serif title over a fanned hand of five coloured cards.",
		tier: "pro",
		doc: () => {
			const labels = [
				"Working Knowledge",
				"Field Notes",
				"Interface Kit",
				"Means & Methods",
				"Collaborate",
			];
			const fills = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];
			// White only holds contrast on the deeper blue and orange; the lighter cards take ink.
			const inks = ["#ffffff", "#ffffff", "#0f1a14", "#1f1600", "#2a0f1a"];
			const layers: OgLayer[] = labels.flatMap((label, i) => {
				const offset = i - 2;
				const card = shape({
					x: 600 + offset * 150 - 72,
					y: 330 + Math.abs(offset) * 18,
					w: 144,
					h: 200,
					radius: 16,
					fill: fills[i] ?? "--primary",
				});
				const caption = text({
					x: card.x + 14,
					y: card.y + 120,
					w: 116,
					text: label,
					font: "serif",
					size: 22,
					weight: 500,
					color: inks[i] ?? "#ffffff",
					leading: 1.05,
					tracking: 0,
				});
				const cx = card.x + card.w / 2;
				const cy = card.y + card.h / 2;
				const turn = offset * 7;
				return [orbit(card, card.h, cx, cy, turn), orbit(caption, 50, cx, cy, turn)];
			});
			return {
				background: background(),
				layers: [
					logo(80, 64),
					text({
						x: 100,
						y: 110,
						w: 1000,
						text: "A field guide to interfaces",
						font: "serif",
						size: 64,
						weight: 500,
						align: "center",
						tracking: -2,
					}),
					body({
						x: 250,
						y: 200,
						w: 700,
						text: "Five chapters, one system.",
						size: 24,
						align: "center",
					}),
					...layers,
				],
			};
		},
	},
	{
		id: "tag-field",
		label: "Tag field",
		description: "A tilted field of tag pills fading toward the headline.",
		tier: "pro",
		doc: () => {
			const tags = [
				"Tabs",
				"Pricing",
				"Cards",
				"Modal",
				"Drawer",
				"Hero",
				"FAQ",
				"Forms",
				"Charts",
				"Navbar",
				"Footer",
				"Sidebar",
				"Toast",
				"Table",
				"Steps",
				"Search",
			];
			const pills = tags.flatMap((tag, i) => {
				const row = Math.floor(i / 4);
				const col = i % 4;
				const lit = i % 5 === 0;
				const pill = shape({
					x: 560 + col * 170 + (row % 2) * 60,
					y: 40 + row * 74,
					w: 150,
					h: 52,
					radius: 26,
					fill: lit ? "--primary" : GLASS,
					stroke: GLASS_EDGE,
					strokeWidth: lit ? 0 : 1,
					opacity: 100 - row * 18,
				});
				const label = text({
					x: pill.x,
					y: pill.y + 12,
					w: pill.w,
					text: tag,
					font: "sans",
					size: 22,
					weight: 600,
					color: lit ? "--primary-foreground" : "--foreground",
					align: "center",
					tracking: 0,
					opacity: pill.opacity,
				});
				return [orbit(pill, pill.h, 860, 180, -18), orbit(label, 28, 860, 180, -18)];
			});
			return {
				background: background({ dark: true }),
				layers: [
					...pills,
					logo(80, 72, true),
					text({
						x: 80,
						y: 370,
						w: 820,
						text: "The details behind the world's best websites,",
						size: 60,
						leading: 1.05,
					}),
					text({
						x: 80,
						y: 500,
						w: 600,
						text: "updated weekly",
						size: 60,
						color: "--primary",
					}),
				],
			};
		},
	},
	{
		id: "stats",
		label: "Stats",
		description: "Three glass tiles with big numbers on a dark spotlight.",
		tier: "pro",
		doc: () => {
			const stats = [
				["2.4M", "Weekly installs"],
				["99.9%", "Uptime this quarter"],
				["180ms", "Median render"],
			];
			const tiles = stats.flatMap(([value, label], i) => {
				const x = 80 + i * 360;
				return [
					shape({
						x,
						y: 250,
						w: 320,
						h: 260,
						radius: 28,
						fill: GLASS,
						stroke: GLASS_EDGE,
						strokeWidth: 1,
					}),
					text({ x: x + 32, y: 290, w: 260, text: value ?? "", size: 72, tracking: -3 }),
					body({
						x: x + 32,
						y: 410,
						w: 260,
						text: label ?? "",
						size: 24,
						color: "#ffffffb3",
					}),
				];
			});
			return {
				background: background({ dark: true, effect: "glow", pattern: "grid" }),
				layers: [
					logo(80, 72, true),
					text({ x: 144, y: 78, w: 500, text: "Q3 in numbers", size: 30 }),
					text({
						x: 80,
						y: 150,
						w: 1000,
						text: "A quarter of quiet compounding",
						size: 52,
					}),
					...tiles,
				],
			};
		},
	},
	{
		id: "blank",
		label: "Blank",
		description: "An empty light card.",
		tier: "free",
		doc: blankDoc,
	},
];
