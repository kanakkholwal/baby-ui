import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { docvia } from "@docvia/plugin-vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import docviaConfig from "./docvia.config";

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
	// The scanner can't see lazy demos or docvia's virtual modules; finding these mid-session
	// re-bundles deps and pages hydrate against a second Svelte runtime. Icons ship raw .svelte.
	optimizeDeps: {
		include: [
			"@docvia/renderer-svelte",
			"@docvia/source/internal",
			"@shikijs/langs/bash",
			"@shikijs/langs/css",
			"@shikijs/langs/javascript",
			"@shikijs/langs/json",
			"@shikijs/langs/jsx",
			"@shikijs/langs/svelte",
			"@shikijs/langs/tsx",
			"@shikijs/langs/typescript",
			"@shikijs/themes/github-dark-default",
			"@shikijs/themes/github-light-default",
			"@baby-ui/svelte > bits-ui",
			"clsx",
			"@baby-ui/svelte > d3-array",
			"@baby-ui/svelte > d3-geo",
			"@baby-ui/svelte > d3-sankey",
			"@baby-ui/svelte > d3-scale",
			"@baby-ui/svelte > d3-shape",
			"mode-watcher",
			"posthog-js/dist/module.slim.no-external",
			"shiki/core",
			"shiki/engine/javascript",
			"@baby-ui/svelte > svelte-sonner",
			"tailwind-merge",
			"@baby-ui/svelte > tailwind-variants",
			"@baby-ui/demos > topojson-client",
			"@baby-ui/svelte > vaul-svelte",
			"@baby-ui/registry-schema > zod",
		],
		exclude: ["@tabler/icons-svelte"],
	},
	environments: {
		ssr: { resolve: { noExternal: ["@docvia/renderer-svelte"] } },
	},
	plugins: [
		tailwindcss(),
		docvia(docviaConfig),
		sveltekit({
			// The navbar and fullscreen-nav demos ship placeholder anchors like #product,
			// which have no target on the page that previews them. Warn, do not fail.
			prerender: { handleMissingId: "warn" },
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
			},

			adapter: adapter(),
		}),
	],
});
