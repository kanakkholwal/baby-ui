import { describe, expect, it } from "bun:test";
import {
	dialArc,
	dialPoint,
	dialRatio,
	durationToRatio,
	formatLength,
	ratioToDuration,
	stepDuration,
} from "../audio-composer/duration";

describe("audio composer duration", () => {
	it("steps and stays inside the limits", () => {
		expect(stepDuration(10, 1, 2, 2, 60)).toBe(12);
		expect(stepDuration(2, -1, 2, 2, 60)).toBe(2);
		expect(stepDuration(60, 1, 2, 2, 60)).toBe(60);
	});
	it("snaps an off-grid length onto the step", () => {
		expect(stepDuration(11, 1, 2, 2, 60)).toBe(14);
	});
	it("reads lengths the way people say them", () => {
		expect(formatLength(8)).toBe("8 s");
		expect(formatLength(60)).toBe("1 min");
		expect(formatLength(90)).toBe("1:30");
	});
	it("maps a length to the dial and back", () => {
		expect(durationToRatio(2, 2, 60)).toBe(0);
		expect(durationToRatio(31, 2, 60)).toBe(0.5);
		expect(ratioToDuration(0.5, 2, 2, 60)).toBe(32);
		expect(ratioToDuration(5, 2, 2, 60)).toBe(60);
		expect(ratioToDuration(-1, 2, 2, 60)).toBe(2);
	});
	it("turns a pointer position into a dial value", () => {
		expect(dialRatio(-10, 10)).toBeCloseTo(0, 5);
		expect(dialRatio(0, -10)).toBeCloseTo(0.5, 5);
		expect(dialRatio(10, 10)).toBeCloseTo(1, 5);
		expect(dialRatio(-1, 10)).toBe(0);
		expect(dialRatio(1, 10)).toBe(1);
	});
	it("draws the arc and knob on the circle", () => {
		expect(dialArc(0.5, 15, 20)).toContain("A 15 15 0 0 1");
		const [x, y] = dialPoint(0.5, 15, 20);
		expect(x).toBeCloseTo(20, 5);
		expect(y).toBeCloseTo(5, 5);
	});
});
