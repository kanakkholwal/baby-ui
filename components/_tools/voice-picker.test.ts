import { describe, expect, it } from "bun:test";
import {
	formatSpeed,
	nextSpeed,
	swatchBackground,
	voiceSwatch,
} from "../voice-picker/voice";

describe("voice picker", () => {
	it("gives a voice the same swatch every time", () => {
		expect(swatchBackground("amber")).toBe(swatchBackground("amber"));
		expect(voiceSwatch("amber")).toEqual(voiceSwatch("amber"));
	});
	it("tells voices apart and never pairs a colour with itself", () => {
		const ids = ["amber", "river", "sage", "onyx", "ember", "pine"];
		expect(new Set(ids.map(swatchBackground)).size).toBe(ids.length);
		for (const id of ids) {
			const s = voiceSwatch(id);
			expect(s.from).not.toBe(s.to);
		}
	});
	it("formats speed without trailing zeros", () => {
		expect(formatSpeed(1)).toBe("1×");
		expect(formatSpeed(1.25)).toBe("1.25×");
		expect(formatSpeed(0.5)).toBe("0.5×");
	});
	it("cycles to the next speed and wraps", () => {
		expect(nextSpeed(1)).toBe(1.25);
		expect(nextSpeed(2)).toBe(0.75);
		expect(nextSpeed(1.1)).toBe(1.25);
	});
});
