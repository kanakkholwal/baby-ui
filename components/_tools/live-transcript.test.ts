import { describe, expect, it } from "bun:test";
import { isOverflowing, isPinned } from "../live-transcript/pin";

describe("live transcript pin", () => {
	it("is pinned at the bottom and within the slack", () => {
		expect(isPinned({ scrollHeight: 500, scrollTop: 300, clientHeight: 200 })).toBe(true);
		expect(isPinned({ scrollHeight: 500, scrollTop: 285, clientHeight: 200 })).toBe(true);
	});
	it("lets go once the reader scrolls up", () => {
		expect(isPinned({ scrollHeight: 500, scrollTop: 100, clientHeight: 200 })).toBe(
			false,
		);
	});
	it("detects overflow with a one pixel tolerance", () => {
		expect(isOverflowing({ scrollHeight: 201, clientHeight: 200 })).toBe(false);
		expect(isOverflowing({ scrollHeight: 240, clientHeight: 200 })).toBe(true);
	});
});
