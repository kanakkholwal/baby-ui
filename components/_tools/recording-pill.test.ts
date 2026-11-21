import { describe, expect, it } from "bun:test";
import { formatTimer, meterLevel } from "../recording-pill/timer";

describe("recording pill", () => {
	it("formats the clock", () => {
		expect(formatTimer(0)).toBe("0:00");
		expect(formatTimer(75)).toBe("1:15");
		expect(formatTimer(3725)).toBe("1:02:05");
		expect(formatTimer(-4)).toBe("0:00");
	});
	it("keeps the meter visible and bounded", () => {
		expect(meterLevel(0)).toBe(0.04);
		expect(meterLevel(2)).toBe(1);
		expect(meterLevel(0.1)).toBeGreaterThan(0.1);
	});
});
