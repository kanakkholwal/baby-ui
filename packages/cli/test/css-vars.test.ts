import { describe, expect, it } from "vitest";
import { patchCss, replacedVars } from "../src/transform/css.ts";

const source = `@import "tailwindcss";

:root {
  --primary: red;
}

.mine { color: hotpink; }
`;
const vars = { light: { primary: "blue", ring: "blue" } };

describe.each(["react", "svelte"] as const)("theme variables (%s)", (dialect) => {
	it("replaces existing values on the first install and reports them", () => {
		const out = patchCss(source, [{ cssVars: vars, overwriteVars: true }], dialect);
		expect(out).toContain("--primary: blue");
		expect(out).toContain(".mine { color: hotpink; }");
		expect(replacedVars(source, out).map((v) => v.name)).toEqual(["--primary"]);
	});

	it("only adds missing variables when a re-add must keep the user's values", () => {
		const out = patchCss(source, [{ cssVars: vars, overwriteVars: false }], dialect);
		expect(out).toContain("--primary: red");
		expect(out).toContain("--ring: blue");
		expect(replacedVars(source, out)).toEqual([]);
	});
});
