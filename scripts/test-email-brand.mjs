import assert from "node:assert/strict";
import { test } from "node:test";
import { build } from "esbuild";

const { outputFiles } = await build({
	entryPoints: ["components/lib/email-brand.ts"],
	bundle: true,
	format: "esm",
	write: false,
});
const code = outputFiles[0].text;
const { createEmailTheme, emailContrast } = await import(
	`data:text/javascript;base64,${Buffer.from(code).toString("base64")}`
);

const ext = (brand) => createEmailTheme(brand).theme.extend;

test("the default theme keeps the shipped spacing and corners", () => {
	const { spacing, borderRadius } = ext();
	assert.equal(spacing.gutter, "24px");
	assert.equal(spacing.stack, "32px");
	assert.equal(borderRadius.card, "14px");
	assert.equal(borderRadius.control, "10px");
});

test("density scales every spacing token together", () => {
	assert.equal(ext({ density: "compact" }).spacing.gutter, "19px");
	assert.equal(ext({ density: "relaxed" }).spacing.stack, "40px");
});

test("radius presets reach square and pill extremes", () => {
	assert.equal(ext({ radius: "none" }).borderRadius.card, "0px");
	assert.equal(ext({ radius: "full" }).borderRadius.control, "999px");
});

for (const primary of ["#e11d48", "#16a34a", "#facc15", "#1e1b4b", "#0f172a"]) {
	test(`brand ${primary} keeps readable labels and a dark twin`, () => {
		const c = ext({ primary }).colors;
		assert.ok(emailContrast(c.primary, c["primary-foreground"]) >= 4.5);
		assert.ok(emailContrast(c["primary-dark"], c["background-dark"]) >= 4.5);
		assert.ok(emailContrast(c["primary-dark"], c["primary-foreground-dark"]) >= 4.5);
		assert.notEqual(c["primary-soft"], c.primary);
	});
}
