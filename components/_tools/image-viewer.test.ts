import { describe, expect, it } from "bun:test";
import {
	actualPixelsScale,
	clampView,
	containSize,
	FIT,
	viewForCentre,
	viewportRect,
	zoomAt,
} from "../image-viewer/zoom";

const stage = { w: 800, h: 600 };

describe("image viewer zoom", () => {
	it("fits without cropping and honours padding", () => {
		expect(containSize({ w: 1600, h: 600 }, stage)).toEqual({ w: 800, h: 300 });
		expect(containSize({ w: 1600, h: 600 }, stage, 100)).toEqual({ w: 600, h: 225 });
		expect(containSize({ w: 0, h: 0 }, stage)).toEqual({ w: 0, h: 0 });
	});
	it("keeps a fitted picture centred", () => {
		const base = containSize({ w: 1600, h: 1200 }, stage);
		expect(clampView({ scale: 1, x: 90, y: -40 }, base, stage)).toEqual(FIT);
	});
	it("clamps panning to the zoomed overflow", () => {
		const base = { w: 800, h: 600 };
		expect(clampView({ scale: 2, x: 9999, y: -9999 }, base, stage)).toEqual({
			scale: 2,
			x: 400,
			y: -300,
		});
	});
	it("holds the point under the cursor still", () => {
		const base = { w: 800, h: 600 };
		const next = zoomAt(FIT, 2, { x: 200, y: 100 }, base, stage);
		expect(next.scale).toBe(2);
		expect(next.x).toBe(-200);
		expect(next.y).toBe(-100);
	});
	it("only offers 100% when fit shows less than the real size", () => {
		expect(actualPixelsScale({ w: 400, h: 300 }, { w: 400, h: 300 })).toBeNull();
		expect(actualPixelsScale({ w: 1600, h: 1200 }, { w: 800, h: 600 })).toBe(2);
	});
	it("maps the visible area for the minimap", () => {
		const base = { w: 800, h: 600 };
		const fit = viewportRect(FIT, base, stage);
		expect(fit).toEqual({ left: 0, top: 0, width: 1, height: 1 });
		const zoomed = viewportRect({ scale: 2, x: 0, y: 0 }, base, stage);
		expect(zoomed.width).toBe(0.5);
		expect(zoomed.left).toBe(0.25);
	});
	it("centres the view on a point and round-trips", () => {
		const base = { w: 800, h: 600 };
		const v = viewForCentre({ scale: 2, x: 0, y: 0 }, base, 0.25, 0.5);
		const r = viewportRect(v, base, stage);
		expect(r.left + r.width / 2).toBeCloseTo(0.25);
		expect(r.top + r.height / 2).toBeCloseTo(0.5);
	});
});
