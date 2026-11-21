import { describe, expect, it } from "bun:test";
import { canSkip, chunkRatio, formatRate, nextRate } from "../speech-player/chunks";

describe("speech player chunks", () => {
	it("formats speeds", () => {
		expect(formatRate(1)).toBe("1×");
		expect(formatRate(1.25)).toBe("1.25×");
		expect(formatRate(0.75)).toBe("0.75×");
	});
	it("measures progress by chunk", () => {
		expect(chunkRatio(0, 5)).toBe(0);
		expect(chunkRatio(2, 5)).toBe(40);
		expect(chunkRatio(9, 5)).toBe(100);
		expect(chunkRatio(1, 0)).toBe(0);
	});
	it("only skips inside the passages", () => {
		expect(canSkip(1, 5, -1)).toBe(false);
		expect(canSkip(1, 5, 1)).toBe(true);
		expect(canSkip(5, 5, 1)).toBe(false);
		expect(canSkip(0, 5, 1)).toBe(true);
	});
	it("cycles speeds and wraps", () => {
		expect(nextRate(1, [0.75, 1, 1.5])).toBe(1.5);
		expect(nextRate(1.5, [0.75, 1, 1.5])).toBe(0.75);
	});
});
