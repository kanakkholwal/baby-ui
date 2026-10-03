import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { docvia, docviaSourcePlugin } from "@docvia/plugin-vite";
import adapter from "@sveltejs/adapter-cloudflare";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { FontaineTransform } from "fontaine";
import { defineConfig, loadEnv, type Plugin, searchForWorkspaceRoot } from "vite";
import { reportMemory } from "../../scripts/lib/memory.mjs";
import docviaConfig from "./docvia.config.ts";

const require = createRequire(import.meta.url);
// The Worker's resolve settings: no `node` condition (yaml picks ESM); only `node:` ids are
// builtins (nodejs_compat), so `browser` field maps apply to bare ones (postcss drops fs/path/url).
const WORKER_RESOLVE = {
	conditions: ["workerd", "worker", "module", "development|production"],
	mainFields: ["browser", "module", "jsnext:main", "jsnext"],
	builtins: [/^node:/],
};

// @docvia/renderer-svelte@0.2.4 points its `svelte` condition at ./src, which it never
// publishes. Resolve dist via the /node subpath; ./package.json is not exported either.
const rendererSvelte = join(
	dirname(require.resolve("@docvia/renderer-svelte/node")),
	"index.js",
);

/** The dev server's own memory, logged beside the gen and registry watchers' lines. */
function devMemory(): Plugin {
	return {
		name: "baby-ui-dev-memory",
		apply: "serve",
		configureServer(server) {
			const stop = reportMemory((line) =>
				server.config.logger.info(`site ${line}`, { timestamp: true }),
			);
			server.httpServer?.once("close", stop);
		},
	};
}

export default defineConfig(({ command, mode, isPreview }) => {
	// The Pro feature flag: VITE_SHOW_PRO=true|false wins; unset, dev shows Pro and builds hide it.
	const flag = loadEnv(mode, process.cwd(), "VITE_").VITE_SHOW_PRO;
	const showPro = flag === undefined ? mode === "development" : flag === "true";
	return {
		define: { __SHOW_PRO__: JSON.stringify(showPro) },
		resolve: {
			alias: [{ find: "@docvia/renderer-svelte", replacement: rendererSvelte }],
			// The Pro submodule has its own node_modules. One copy of each shared dep keeps the Svelte
			// runtime (and kernel context) single, and stops dev re-optimizing when a Pro page loads.
			dedupe: ["svelte", "tailwind-variants", "d3-scale"],
		},
		// The package ships a raw .svelte file in dist; dev SSR externalises it and Node
		// then refuses the extension. Harmless in the bundled prod build, fatal in dev.
		ssr: { noExternal: ["@docvia/renderer-svelte"] },
		// SvelteKit narrows fs.allow to the app; demos and components live in packages/ and pro/.
		server: { fs: { allow: [searchForWorkspaceRoot(process.cwd())] } },
		// The scanner can't see lazy demos or docvia's virtual modules; finding these mid-session
		// re-bundles deps and pages hydrate against a second Svelte runtime. Icons ship raw .svelte.
		optimizeDeps: {
			include: [
				"@docvia/renderer-svelte",
				"@docvia/search",
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
				"d3-scale",
				"@baby-ui/svelte > d3-shape",
				"mode-watcher",
				"posthog-js/dist/module.slim.no-external",
				"shiki/core",
				"shiki/engine/javascript",
				"@baby-ui/svelte > svelte-sonner",
				"tailwind-merge",
				"@baby-ui/svelte > tailwind-variants",
				"tailwind-variants",
				"@baby-ui/demos > topojson-client",
				"@baby-ui/svelte > vaul-svelte",
				"@baby-ui/registry-schema > zod",
			],
		},
		environments: {
			ssr: {
				resolve: {
					noExternal: ["@docvia/renderer-svelte"],
					// Build only: dev SSR runs in Node.
					...(command === "build" && WORKER_RESOLVE),
				},
			},
		},
		plugins: [
			devMemory(),
			// Size-adjusted fallback faces, so the font swap no longer moves the layout (CLS).
			FontaineTransform.vite({
				fallbacks: {
					Satoshi: ["Arial"],
					"Inter Variable": ["Arial"],
					"JetBrains Mono Variable": ["Courier New"],
				},
				resolvePath: (id) => new URL(`./static${id}`, import.meta.url),
			}),
			tailwindcss(),
			docvia(docviaConfig),
			// Resolves `docvia/registry` to the registry alone; docvia() only serves the full source.
			docviaSourcePlugin(),
			sveltekit({
				// The fullscreen-nav demo ships placeholder anchors like #product,
				// which have no target on the page that previews them. Warn, do not fail.
				prerender: { handleMissingId: "warn" },
				// Per-component sheets inline (each link is a blocking round trip); the 370KB Tailwind
				// sheet stays linked so it caches across pages instead of riding in every HTML file.
				inlineStyleThreshold: 16 * 1024,
				compilerOptions: {
					// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
					runes: ({ filename }) =>
						filename.split(/[/\\]/).includes("node_modules") ? undefined : true,
				},

				// The site reads no Cloudflare bindings, so emulating them in dev only cost a workerd
				// per server start. Bring it back for `vite dev` if a route ever reads `platform`.
				adapter: command === "build" || isPreview ? adapter() : undefined,
			}),
		],
	};
});
