import { describe, expect, it } from "bun:test";
import {
	clampRange,
	formatTime,
	isKept,
	moveHandle,
	place,
	ratioFromPointer,
} from "../waveform-trim/trim";

describe("waveform trim", () => {
	it("keeps the handles apart and inside the track", () => {
		expect(clampRange([-0.2, 1.4])).toEqual([0, 1]);
		const [a, b] = clampRange([0.5, 0.5]);
		expect(b - a).toBeCloseTo(0.02);
	});
	it("never lets a handle cross the other", () => {
		const [start, end] = moveHandle([0.2, 0.6], "start", 0.9);
		expect(start).toBeLessThan(end);
		const [s2, e2] = moveHandle([0.2, 0.6], "end", 0);
		expect(e2).toBeGreaterThan(s2);
	});
	it("maps the pointer between the padded ends", () => {
		expect(ratioFromPointer(8, 0, 208)).toBe(0);
		expect(ratioFromPointer(104, 0, 208)).toBe(0.5);
		expect(ratioFromPointer(500, 0, 208)).toBe(1);
		expect(ratioFromPointer(5, 0, 8)).toBe(0);
	});
	it("places values along the padded track", () => {
		expect(place(0.5)).toBe("calc(8px + (100% - 16px) * 0.5)");
	});
	it("marks which bars are kept", () => {
		expect(isKept(0, 10, [0.2, 0.8])).toBe(false);
		expect(isKept(5, 10, [0.2, 0.8])).toBe(true);
		expect(isKept(9, 10, [0.2, 0.8])).toBe(false);
	});
	it("formats edit times", () => {
		expect(formatTime(0)).toBe("0:00.0");
		expect(formatTime(75.34)).toBe("1:15.3");
		expect(formatTime(-3)).toBe("0:00.0");
	});
});
