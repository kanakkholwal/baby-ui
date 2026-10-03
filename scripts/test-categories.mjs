import assert from "node:assert/strict";
import { test } from "node:test";

const {
	CATEGORIES,
	CATEGORY,
	TOP_LEVEL_CATEGORIES,
	PREVIEW_CATEGORIES,
	categoryHref,
	categoryFromPath,
	docsPath,
	rerouteTopLevel,
} = await import("../packages/registry-schema/src/categories.ts");

test("every category has a complete, distinct row", () => {
	assert.deepEqual(Object.keys(CATEGORY).sort(), [...CATEGORIES].sort());
	const labels = CATEGORIES.map((c) => CATEGORY[c].label);
	assert.equal(new Set(labels).size, labels.length);
	for (const c of CATEGORIES) {
		const row = CATEGORY[c];
		assert.ok(row.label && row.title && row.blurb && row.installDir, c);
	}
});

test("derived lists follow the table", () => {
	assert.deepEqual(TOP_LEVEL_CATEGORIES, ["charts", "og-images", "emails"]);
	assert.deepEqual(PREVIEW_CATEGORIES, []);
});

test("hrefs: top-level at /<category>, the rest under /components", () => {
	assert.equal(categoryHref("charts"), "/charts");
	assert.equal(categoryHref("base"), "/components/base");
	assert.equal(
		docsPath({ category: "og-images", slug: "og-blog-post" }),
		"/og-images/og-blog-post",
	);
	assert.equal(docsPath({ category: "base", slug: "button" }), "/components/base/button");
});

test("paths resolve back to their category, and only top-level ones reroute", () => {
	for (const c of CATEGORIES) {
		const spec = { category: c, slug: "x" };
		assert.equal(categoryFromPath(docsPath(spec)), c);
		assert.equal(categoryFromPath(categoryHref(c)), c);
	}
	assert.equal(categoryFromPath("/docs/intro"), undefined);
	assert.equal(categoryFromPath("/components"), undefined);
	assert.equal(categoryFromPath("/base/button"), undefined);
	assert.equal(rerouteTopLevel("/charts/area-chart"), "/components/charts/area-chart");
	assert.equal(rerouteTopLevel("/emails"), "/components/emails");
	assert.equal(rerouteTopLevel("/chartsy"), undefined);
	assert.equal(rerouteTopLevel("/components/base/button"), undefined);
	assert.equal(rerouteTopLevel("/base"), undefined);
});
