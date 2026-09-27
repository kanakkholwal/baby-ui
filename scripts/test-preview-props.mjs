import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { test } from "node:test";

// Package sources import siblings without extensions; resolve them to `.ts` here.
registerHooks({
	resolve(specifier, context, next) {
		try {
			return next(specifier, context);
		} catch (error) {
			if (!specifier.startsWith(".")) throw error;
			return next(`${specifier}.ts`, context);
		}
	},
});

const { previewProps } = await import("../packages/demos/src/data/preview-props.ts");
const { EMAIL_WELCOME } = await import("../packages/demos/src/data/email-samples.ts");

test("sample data fills what the controls leave out", () => {
	const props = previewProps("email-welcome", { productName: "Acme" });
	assert.equal(props.productName, "Acme");
	assert.deepEqual(props.steps, EMAIL_WELCOME.steps);
});

test("set control values beat the sample; unset and empty ones do not", () => {
	const props = previewProps(
		"email-welcome",
		{ actionUrl: "https://acme.test", intro: "", heading: undefined },
		{ actionUrl: "https://sample.test", intro: "Sample intro", heading: "Sample" },
	);
	assert.equal(props.actionUrl, "https://acme.test");
	assert.equal(props.intro, "Sample intro");
	assert.equal(props.heading, "Sample");
});

test("derived samples follow the controls and sit between sample and controls", () => {
	const terminal = previewProps("og-docs-page", { motif: "terminal" });
	assert.equal(terminal.filename, "zsh");
	const plain = previewProps("og-docs-page", { motif: "code" });
	assert.notEqual(plain.filename, "zsh");
	const overridden = previewProps("og-docs-page", {
		motif: "terminal",
		filename: "fish",
	});
	assert.equal(overridden.filename, "fish");
});

test("an explicit sample replaces the built-in one (Pro samples)", () => {
	const props = previewProps("og-pro-only", { title: "T" }, { site: "Pro" });
	assert.deepEqual(props, { site: "Pro", title: "T" });
});

test("an unknown slug renders just its controls", () => {
	assert.deepEqual(previewProps("nope", { a: 1, b: "" }), { a: 1 });
});
