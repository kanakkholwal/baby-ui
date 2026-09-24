export interface Notch {
	index: number;
	path: string;
	/** Scale origin: the gauge centre on an arc, the notch centre on a track. */
	origin: { x: number; y: number };
}

/** bklit's notch enter: 300/20 spring, background then active, delays in seconds. */
export const NOTCH_SPRING = { stiffness: 300, damping: 20 } as const;
export const NOTCH_TIMING = {
	background: 0.015,
	activeBase: 0.3,
	activeStep: 0.02,
} as const;
export const LINEAR_HEIGHT = 24;

export const clampStagger = (scale: number) => Math.max(0.25, Math.min(2.5, scale));

export function activeCount(
	value: number,
	min: number,
	max: number,
	total: number,
): number {
	const span = max - min || 1;
	const ratio = Math.min(1, Math.max(0, (value - min) / span));
	return Math.round(ratio * total);
}

/** Straight-edged quad through four corners. */
function quad(points: [number, number][]): string {
	return `M ${points.map(([x, y]) => `${x} ${y}`).join(" L ")} Z`;
}

export function arcNotches(options: {
	width: number;
	height: number;
	total: number;
	spacing: number;
	startAngle?: number;
	endAngle?: number;
}): { notches: Notch[]; center: { x: number; y: number }; size: number } {
	const { width, height, total, spacing, startAngle = 135, endAngle = 405 } = options;
	const size = Math.min(width, height);
	const cx = width / 2;
	const cy = height / 2;
	const outer = size * 0.42;
	const inner = size * 0.28;
	const sweep = endAngle - startAngle;
	const notchAngle = total > 0 ? (sweep * (1 - spacing / 100)) / total : 0;
	const gap = (sweep * (spacing / 100)) / Math.max(1, total - 1);
	const notches = Array.from({ length: total }, (_, i) => {
		const mid = ((startAngle + i * (notchAngle + gap) + notchAngle / 2) * Math.PI) / 180;
		const half = (notchAngle * 0.8 * Math.PI) / 180 / 2;
		const at = (r: number, a: number): [number, number] => [
			cx + Math.cos(a) * r,
			cy + Math.sin(a) * r,
		];
		return {
			index: i,
			path: quad([
				at(outer, mid - half),
				at(outer, mid + half),
				at(inner, mid + half),
				at(inner, mid - half),
			]),
			origin: { x: cx, y: cy },
		};
	});
	return { notches, center: { x: cx, y: cy }, size };
}

export function linearNotches(options: {
	width: number;
	height: number;
	total: number;
	spacing: number;
}): Notch[] {
	const { width, height, total, spacing } = options;
	const slot = total > 0 ? (width * (1 - spacing / 100)) / total : 0;
	const gap = (width * (spacing / 100)) / Math.max(1, total - 1);
	const half = (slot * 0.8) / 2;
	return Array.from({ length: total }, (_, i) => {
		const x = i * (slot + gap) + slot / 2;
		return {
			index: i,
			path: quad([
				[x - half, 0],
				[x + half, 0],
				[x + half, height],
				[x - half, height],
			]),
			origin: { x, y: height / 2 },
		};
	});
}

/** Five-step sequential ramp across the notches for the `scale` tone. */
export const scaleFill = (index: number, total: number) =>
	`var(--chart-scale-${1 + Math.round((index / Math.max(1, total - 1)) * 4)})`;
