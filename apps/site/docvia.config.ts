import { ComponentDocExtrasSchema } from "@baby-ui/registry-schema";
import { defineConfig } from "@docvia/cli";
import { shiki } from "@docvia/plugin-shiki";
import { createSvelteRenderer } from "@docvia/renderer-svelte/node";

export default defineConfig({
	sourceDir: "src/docs",
	outDir: ".docvia",
	collections: [
		{ name: "components", sourceDir: "src/docs/components", baseUrl: "/components" },
		{ name: "guides", sourceDir: "src/docs/guides", baseUrl: "/docs" },
	],
	frontmatter: ComponentDocExtrasSchema,

	// Registering these is also what makes `registry` exist on virtual:docvia/source.
	components: {
		"button-demo": {
			path: "../../packages/demos/src/svelte/button-demo.svelte",
			hydrate: true,
		},
		"dock-demo": {
			path: "../../packages/demos/src/svelte/dock-demo.svelte",
			hydrate: true,
		},
	},
	renderer: createSvelteRenderer(),
	plugins: [
		shiki({
			theme: "github-dark",
			langs: [
				"typescript",
				"javascript",
				"svelte",
				"tsx",
				"jsx",
				"html",
				"css",
				"bash",
				"json",
			],
		}),
	],
});
