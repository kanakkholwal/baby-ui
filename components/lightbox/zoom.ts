export type Size = { w: number; h: number };
export type View = { scale: number; x: number; y: number };

export const MIN_SCALE = 1;
export const MAX_SCALE = 8;
export const ZOOM_STEP = 1.4;
export const FIT: View = { scale: 1, x: 0, y: 0 };

/** The size a picture takes when fitted inside a stage without cropping, inset by `padding`. */
export function containSize(natural: Size, stage: Size, padding = 0): Size {
	const w = stage.w - padding * 2;
	const h = stage.h - padding * 2;
	if (natural.w <= 0 || natural.h <= 0 || w <= 0 || h <= 0) return { w: 0, h: 0 };
	const k = Math.min(w / natural.w, h / natural.h);
	return { w: natural.w * k, h: natural.h * k };
}

/** Keeps the picture from leaving the view; at fit size it stays centred. */
export function clampView(v: View, base: Size, stage: Size): View {
	const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale));
	const maxX = Math.max(0, (base.w * scale - stage.w) / 2);
	const maxY = Math.max(0, (base.h * scale - stage.h) / 2);
	return {
		scale,
		// `|| 0` turns -0 into 0 so a centred picture equals the fit view.
		x: Math.min(maxX, Math.max(-maxX, v.x)) || 0,
		y: Math.min(maxY, Math.max(-maxY, v.y)) || 0,
	};
}

/** Zooms by a factor with the point under the cursor held still; `point` is from the stage centre. */
export function zoomAt(
	v: View,
	factor: number,
	point: { x: number; y: number },
	base: Size,
	stage: Size,
): View {
	const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale * factor));
	const r = next / v.scale;
	return clampView(
		{ scale: next, x: point.x - (point.x - v.x) * r, y: point.y - (point.y - v.y) * r },
		base,
		stage,
	);
}

/** The scale where one picture pixel is one screen pixel, or null when fit already shows more. */
export function actualPixelsScale(natural: Size, base: Size): number | null {
	if (base.w <= 0) return null;
	const s = natural.w / base.w;
	return s > MIN_SCALE ? Math.min(s, MAX_SCALE) : null;
}

export function wheelFactor(deltaY: number): number {
	return Math.exp(-deltaY * 0.0015);
}

export type ViewportRect = { left: number; top: number; width: number; height: number };

/** The visible part of the picture as fractions of it, for a minimap rectangle. */
export function viewportRect(v: View, base: Size, stage: Size): ViewportRect {
	const w = base.w * v.scale;
	const h = base.h * v.scale;
	if (w <= 0 || h <= 0) return { left: 0, top: 0, width: 1, height: 1 };
	const width = Math.min(1, stage.w / w);
	const height = Math.min(1, stage.h / h);
	return {
		left: 0.5 - v.x / w - width / 2,
		top: 0.5 - v.y / h - height / 2,
		width,
		height,
	};
}

/** The view that centres the stage on a point of the picture given as fractions from 0 to 1. */
export function viewForCentre(v: View, base: Size, fx: number, fy: number): View {
	return {
		scale: v.scale,
		x: -(fx - 0.5) * base.w * v.scale,
		y: -(fy - 0.5) * base.h * v.scale,
	};
}
