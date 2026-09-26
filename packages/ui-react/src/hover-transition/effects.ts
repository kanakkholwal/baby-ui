import type { HoverTransitionDirection, HoverTransitionEffect } from "./variants";

export type HoverVars = Record<`--ht-${string}`, string>;

export type HoverLayer = {
	content: "default" | "hover";
	vars: HoverVars;
	/** Parallax only: a second transform on a wrapper inside the clipped layer. */
	inner?: HoverVars;
};

const VECTORS: Record<HoverTransitionDirection, [number, number]> = {
	top: [0, -1],
	right: [1, 0],
	bottom: [0, 1],
	left: [-1, 0],
	"top-left": [-1, -1],
	"top-right": [1, -1],
	"bottom-right": [1, 1],
	"bottom-left": [-1, 1],
	center: [0, 0],
};

const HIDDEN: Record<HoverTransitionDirection, string> = {
	top: "inset(0 0 100% 0)",
	right: "inset(0 0 0 100%)",
	bottom: "inset(100% 0 0 0)",
	left: "inset(0 100% 0 0)",
	"top-left": "inset(0 100% 100% 0)",
	"top-right": "inset(0 0 100% 100%)",
	"bottom-right": "inset(100% 0 0 100%)",
	"bottom-left": "inset(100% 100% 0 0)",
	center: "inset(50%)",
};

function vars(partial: {
	clip?: string;
	transform?: string;
	filter?: string;
	opacity?: number;
	radius?: string;
	origin?: string;
	delay?: string;
	scale?: number;
}): HoverVars {
	return {
		"--ht-clip": partial.clip ?? "none",
		"--ht-transform": partial.transform ?? "none",
		"--ht-filter": partial.filter ?? "none",
		"--ht-opacity": String(partial.opacity ?? 1),
		"--ht-radius": partial.radius ?? "0",
		"--ht-origin": partial.origin ?? "50% 50%",
		"--ht-delay": partial.delay ?? "0ms",
		"--ht-dur-scale": String(partial.scale ?? 1),
	};
}

const pct = (n: number) => `${Math.round(n * 100) / 100}%`;

/** Effects where the resting content moves too, so it is drawn by its own layers. */
export function movesDefault(effect: HoverTransitionEffect): boolean {
	return (
		effect === "parallax" ||
		effect === "curtain" ||
		effect === "diagonal" ||
		effect === "slide"
	);
}

/** The resting content, which dims and grows slightly while the hover content is shown. */
export function baseVars(effect: HoverTransitionEffect, active: boolean): HoverVars {
	return vars({
		opacity: movesDefault(effect) ? 0 : 1,
		filter: active ? "brightness(.86) saturate(.88)" : "none",
		transform: active ? "scale(1.025)" : "scale(1)",
	});
}

/** Layers stacked over the resting content, in paint order. */
export function hoverLayers(
	effect: HoverTransitionEffect,
	direction: HoverTransitionDirection,
	active: boolean,
): HoverLayer[] {
	const [vx, vy] = VECTORS[direction];
	const dx = vx * 100;
	const dy = vy * 100;
	const at = "var(--ht-at)";
	const blur = (px: number) => (active ? "blur(0px)" : `blur(${px}px)`);

	switch (effect) {
		case "ripple":
			return [
				{
					content: "hover",
					vars: vars({
						clip: `circle(${active ? 150 : 0}% at ${at})`,
						filter: blur(2),
						transform: active ? "scale(1)" : "scale(1.035)",
						origin: at,
					}),
				},
			];
		case "parallax":
			return [
				{
					content: "default",
					vars: vars({
						transform: active
							? `translate3d(${pct(-dx * 0.12)}, ${pct(-dy * 0.12)}, 0) scale(1.045)`
							: "translate3d(0, 0, 0) scale(1)",
						filter: active ? "brightness(.78) saturate(.75)" : "none",
					}),
				},
				{
					content: "hover",
					vars: vars({ clip: active ? "inset(0)" : HIDDEN[direction], filter: blur(2) }),
					inner: vars({
						transform: active
							? "translate3d(0, 0, 0) scale(1)"
							: `translate3d(${pct(dx * 0.24)}, ${pct(dy * 0.24)}, 0) scale(1.07)`,
					}),
				},
			];
		case "curtain": {
			const vertical = vy !== 0 || direction === "center";
			const leaf = (first: boolean) =>
				vars({
					clip: vertical
						? first
							? "inset(0 0 50% 0)"
							: "inset(50% 0 0 0)"
						: first
							? "inset(0 50% 0 0)"
							: "inset(0 0 0 50%)",
					transform: active
						? vertical
							? `translate3d(0, ${first ? -100 : 100}%, 0)`
							: `translate3d(${first ? -100 : 100}%, 0, 0)`
						: "translate3d(0, 0, 0)",
					filter: active ? "blur(1px)" : "blur(0px)",
				});
			return [
				{
					content: "hover",
					vars: vars({
						opacity: active ? 1 : 0,
						filter: blur(3),
						transform: active ? "scale(1)" : "scale(.96)",
					}),
				},
				{ content: "default", vars: leaf(true) },
				{ content: "default", vars: leaf(false) },
			];
		}
		case "diagonal": {
			const fromLeft = direction.includes("left");
			const shard = (clip: string, x: number, y: number) =>
				vars({
					clip,
					transform: active ? `translate3d(${x}%, ${y}%, 0)` : "translate3d(0, 0, 0)",
					filter: active ? "blur(1px)" : "blur(0px)",
				});
			return [
				{
					content: "hover",
					vars: vars({
						opacity: active ? 1 : 0,
						filter: blur(2),
						transform: active ? "scale(1)" : "scale(.97)",
					}),
				},
				{
					content: "default",
					vars: fromLeft
						? shard("polygon(0 0, 100% 0, 100% 100%)", 100, -100)
						: shard("polygon(0 0, 100% 0, 0 100%)", -100, -100),
				},
				{
					content: "default",
					vars: fromLeft
						? shard("polygon(0 0, 100% 100%, 0 100%)", -100, 100)
						: shard("polygon(100% 0, 100% 100%, 0 100%)", 100, 100),
				},
			];
		}
		case "morph":
			return [
				{
					content: "hover",
					vars: vars({
						radius: active ? "0%" : "42%",
						clip: active ? "inset(0% round 0%)" : "inset(43% round 42%)",
						filter: blur(3),
						opacity: active ? 1 : 0,
						transform: active
							? "translate3d(0, 0, 0) scale(1) rotate(0deg)"
							: `translate3d(${pct(dx * 0.04)}, ${pct(dy * 0.04)}, 0) scale(.86) rotate(${vx < 0 ? -2 : 2}deg)`,
						origin: at,
					}),
				},
			];
		case "strips": {
			const count = 8;
			const vertical = Math.abs(vx) >= Math.abs(vy);
			const ox = (vx || (vy === 0 ? 1 : 0)) * 72;
			const oy = vy * 72;
			return Array.from({ length: count }, (_, i) => {
				const start = pct((i / count) * 100);
				const end = pct(100 - ((i + 1) / count) * 100);
				const order = active ? i : count - i - 1;
				return {
					content: "hover" as const,
					vars: vars({
						clip: vertical ? `inset(0 ${end} 0 ${start})` : `inset(${start} 0 ${end} 0)`,
						filter: blur(1.5),
						opacity: active ? 1 : 0,
						transform: active ? "translate3d(0, 0, 0)" : `translate3d(${ox}%, ${oy}%, 0)`,
						delay: `calc(var(--ht-duration) * ${((order / (count - 1)) * 0.15).toFixed(4)})`,
						scale: 0.85,
					}),
				};
			});
		}
		case "slide":
			return [
				{
					content: "default",
					vars: vars({
						transform: active
							? direction === "center"
								? "scale(1.035)"
								: `translate3d(${pct(-dx * 0.16)}, ${pct(-dy * 0.16)}, 0) scale(1.025)`
							: "translate3d(0, 0, 0)",
						filter: active ? "brightness(.72) blur(2px)" : "none",
						opacity: active ? 0 : 1,
					}),
				},
				{
					content: "hover",
					vars: vars({
						opacity: active ? 1 : 0,
						filter: blur(3),
						transform: active
							? "translate3d(0, 0, 0)"
							: direction === "center"
								? "scale(.96)"
								: `translate3d(${pct(dx * 0.16)}, ${pct(dy * 0.16)}, 0) scale(.985)`,
					}),
				},
			];
		default:
			return [
				{
					content: "hover",
					vars: vars({
						clip: active ? "inset(0)" : HIDDEN[direction],
						filter: blur(1.5),
						transform: active ? "scale(1)" : "scale(1.025)",
						origin: at,
					}),
				},
			];
	}
}

/** Custom properties as an inline style string, for Svelte. */
export function styleString(style: Record<string, string>): string {
	return Object.entries(style)
		.map(([key, value]) => `${key}: ${value};`)
		.join(" ");
}
