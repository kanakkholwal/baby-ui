import { describe, expect, it } from "bun:test";
import { formatBytes, formatEta, formatSpeed, percentOf } from "../download-card/format";

describe("download card format", () => {
	it("scales bytes", () => {
		expect(formatBytes(0)).toBe("0 B");
		expect(formatBytes(512)).toBe("512 B");
		expect(formatBytes(1536)).toBe("2 KB");
		expect(formatBytes(5 * 1024 ** 2)).toBe("5.0 MB");
		expect(formatSpeed(24 * 1024 ** 2)).toBe("24.0 MB/s");
	});
	it("estimates time left", () => {
		expect(formatEta(0, 100)).toBe("");
		expect(formatEta(100, 0)).toBe("");
		expect(formatEta(500, 100)).toBe("5 s left");
		expect(formatEta(6000, 100)).toBe("1 min left");
		expect(formatEta(100 * 3600 * 2, 100)).toBe("2 h 0 min left");
	});
	it("clamps the share", () => {
		expect(percentOf(50, 200)).toBe(25);
		expect(percentOf(500, 200)).toBe(100);
		expect(percentOf(5, 0)).toBe(0);
	});
});
