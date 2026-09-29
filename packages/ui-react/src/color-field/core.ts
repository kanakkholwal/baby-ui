/** Reads "#abc", "abc", "#aabbcc" or "aabbcc" as lowercase "#rrggbb"; null when it is not hex. */
export function parseHex(raw: string): string | null {
	const hex = raw.trim().replace(/^#/, "").toLowerCase();
	if (/^[0-9a-f]{3}$/.test(hex)) return `#${[...hex].map((c) => c + c).join("")}`;
	return /^[0-9a-f]{6}$/.test(hex) ? `#${hex}` : null;
}

/** Steps a hex on its 24-bit value, clamped to black and white, as React Aria's ColorField. */
export function stepHex(hex: string, delta: number): string {
	const next = Number.parseInt(hex.slice(1), 16) + delta;
	return `#${Math.min(0xffffff, Math.max(0, next)).toString(16).padStart(6, "0")}`;
}

/** The step a key applies: arrows by 1, Page keys by a blue-channel step of 16. */
export function keyStep(key: string): number | null {
	switch (key) {
		case "ArrowUp":
			return 1;
		case "ArrowDown":
			return -1;
		case "PageUp":
			return 16;
		case "PageDown":
			return -16;
		default:
			return null;
	}
}
