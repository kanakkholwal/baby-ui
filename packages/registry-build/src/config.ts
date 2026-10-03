import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Framework } from "@baby-ui/registry-schema";

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

function origin(value: string | undefined, fallback: string) {
	return (value ?? fallback).replace(/\/$/, "");
}

/** Where the docs live. Baked into every item's `docs` link. */
export const SITE_URL = origin(
	process.env.BABY_UI_SITE_URL,
	"https://baby-ui.nexonauts.com",
);

/** Where the JSON is served. A separate Pages project, so the CLI never hits the Worker. */
export const REGISTRY_URL = origin(
	process.env.BABY_UI_REGISTRY_URL,
	"https://baby-ui.pages.dev",
);

export const REGISTRY_NAME = "baby-ui";

/** Where a framework's implementation sources live, and where its registry is served. */
export const FRAMEWORK: Record<
	Framework,
	{
		srcDir: string;
		routePrefix: string;
		libAlias: string;
		uiAlias: string;
		componentsAlias: string;
		/** What docs and the Manual view print for each alias, when the shipped form is a placeholder. */
		readerAliases?: Record<string, string>;
		/** Alias imports name the file: SvelteKit 3's `#lib/*` subpath imports do no extension lookup. */
		aliasExtensions?: boolean;
		uiTarget: string;
		libTarget: string;
		/** shadcn-svelte resolves a file target from its ui/lib alias; shadcn from the root. */
		aliasRelativeTargets?: boolean;
	}
> = {
	react: {
		srcDir: resolve(REPO_ROOT, "packages/ui-react/src"),
		routePrefix: "r",
		libAlias: "@/lib",
		uiAlias: "@/components/ui",
		componentsAlias: "@/components",
		uiTarget: "components/ui",
		libTarget: "lib",
	},
	svelte: {
		srcDir: resolve(REPO_ROOT, "packages/ui-svelte/src/lib"),
		routePrefix: "svelte/r",
		// The CLI swaps these for the project's components.json aliases: `#lib` on SvelteKit 3.
		libAlias: "$LIB$",
		uiAlias: "$UI$",
		componentsAlias: "$COMPONENTS$",
		readerAliases: {
			$LIB$: "#lib",
			$UI$: "#lib/components/ui",
			$COMPONENTS$: "#lib/components",
		},
		aliasExtensions: true,
		uiTarget: "src/lib/components/ui",
		libTarget: "src/lib",
		aliasRelativeTargets: true,
	},
};

// Overridable so an install test can serve its own copy without touching the site's files.
/** An install-test build: registry JSON only, never the site's generated files or licences. */
export const ISOLATED = Boolean(process.env.BABY_UI_REGISTRY_OUT);
export const OUT_DIR = process.env.BABY_UI_REGISTRY_OUT
	? resolve(process.env.BABY_UI_REGISTRY_OUT)
	: resolve(REPO_ROOT, "apps/site/static");
