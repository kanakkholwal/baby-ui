import { existsSync } from "node:fs";
import { ComponentDocExtrasSchema } from "@baby-ui/registry-schema";
import { defineConfig } from "@docvia/cli";
import { createSvelteRenderer } from "@docvia/renderer-svelte/node";

// Prose for Pro components lives in the private submodule, when it is checked out.
const PRO_DOCS = "../../pro/docs/components";

export default defineConfig({
	sourceDir: "src/docs",
	outDir: ".docvia",
	collections: [
		{ name: "components", sourceDir: "src/docs/components", baseUrl: "/components" },
		{ name: "guides", sourceDir: "src/docs/guides", baseUrl: "/docs" },
		...(existsSync(PRO_DOCS)
			? [{ name: "pro", sourceDir: PRO_DOCS, baseUrl: "/components" }]
			: []),
	],
	frontmatter: ComponentDocExtrasSchema,

	// Registering these is also what makes `registry` exist on virtual:docvia/source.
	components: {
		"button-demo": {
			path: "../../packages/demos/src/svelte/button-demo.svelte",
			hydrate: true,
		},
		"code-block": {
			path: "./src/lib/components/code-block.svelte",
			hydrate: true,
		},
		"code-group": {
			path: "./src/lib/components/code-group.svelte",
			hydrate: true,
		},
	},
	renderer: createSvelteRenderer(),
});
