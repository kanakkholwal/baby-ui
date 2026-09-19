import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { docvia } from "@docvia/plugin-vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import docviaConfig from "./docvia.config.js";

// yaml (via @docvia/schema) resolves to CJS under the SSR node condition; Rolldown
// wraps that in createRequire(import.meta.url), undefined in Workers. Use its ESM build.
const require = createRequire(import.meta.url);
const yamlEsm = join(dirname(require.resolve("yaml/package.json")), "browser/index.js");

// @docvia/renderer-svelte@0.2.4 points its `svelte` condition at ./src, which it never
// publishes. Resolve dist via the /node subpath; ./package.json is not exported either.
const rendererSvelte = join(
	dirname(require.resolve("@docvia/renderer-svelte/node")),
	"index.js",
);

export default defineConfig({
	resolve: { alias: { yaml: yamlEsm, "@docvia/renderer-svelte": rendererSvelte } },
	// The package ships a raw .svelte file in dist; dev SSR externalises it and Node
	// then refuses the extension. Harmless in the bundled prod build, fatal in dev.
	ssr: { noExternal: ["@docvia/renderer-svelte"] },
	environments: {
		ssr: { resolve: { noExternal: ["@docvia/renderer-svelte"] } },
	},
	plugins: [
		tailwindcss(),
		docvia(docviaConfig),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
			},

			adapter: adapter(),
		}),
	],
});
