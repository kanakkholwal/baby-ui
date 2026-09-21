import { ComponentDocExtrasSchema } from "@baby-ui/registry-schema";
import { defineConfig } from "@docvia/cli";
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
		"code-block": {
			path: "./src/lib/components/code-block.svelte",
			hydrate: true,
		},
		"dock-demo": {
			path: "../../packages/demos/src/svelte/dock-demo.svelte",
			hydrate: true,
		},
	},
	renderer: createSvelteRenderer(),
});
