import { describe, expect, it } from "bun:test";
import { formatLength, stepDuration } from "../audio-composer/duration";

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
});
