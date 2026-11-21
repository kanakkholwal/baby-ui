import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Svelte 5 trims whitespace at the start and end of an element's children, so a trailing or
// leading space written next to a mustache tag disappears and words run together.
const FILES = [
	"streaming-text/svelte/streaming-text-content.svelte",
	"npm-stats/svelte/trend-badge.svelte",
];

test("Svelte ports keep the space between words inside inline elements", () => {
	for (const file of FILES) {
		const source = readFileSync(resolve(import.meta.dir, "..", file), "utf8");
		expect(source).not.toMatch(/\{[^{}]*\} <\/span>/);
		expect(source).not.toMatch(/<span[^>]*> \{/);
	}
});
