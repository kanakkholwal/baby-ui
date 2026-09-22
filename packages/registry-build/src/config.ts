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
		uiTarget: string;
		libTarget: string;
	}
> = {
	react: {
		srcDir: resolve(REPO_ROOT, "packages/ui-react/src"),
		routePrefix: "r",
		libAlias: "@/lib",
		uiAlias: "@/components/ui",
		uiTarget: "components/ui",
		libTarget: "lib",
	},
	svelte: {
		srcDir: resolve(REPO_ROOT, "packages/ui-svelte/src/lib"),
		routePrefix: "svelte/r",
		libAlias: "$lib",
		uiAlias: "$lib/components/ui",
		uiTarget: "src/lib/components/ui",
		libTarget: "src/lib",
	},
};

export const OUT_DIR = resolve(REPO_ROOT, "apps/site/static");
