import { describe, expect, it } from "bun:test";
import { marqueeSeconds } from "../hover-marquee/marquee";

describe("marqueeSeconds", () => {
	it("is zero when nothing overflows", () => {
		expect(marqueeSeconds(0)).toBe(0);
		expect(marqueeSeconds(-5)).toBe(0);
	});
	it("keeps a steady speed between the floor and the cap", () => {
		expect(marqueeSeconds(90)).toBe(2);
		expect(marqueeSeconds(1)).toBe(0.6);
		expect(marqueeSeconds(10_000)).toBe(8);
	});
	it("honours a custom speed", () => {
		expect(marqueeSeconds(90, 90)).toBe(1);
	});
});
