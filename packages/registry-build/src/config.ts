import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Framework } from "@baby-ui/registry-schema";

export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");

/** Baked into every emitted item, so it must be the real deploy origin. */
export const SITE_URL = (
	process.env.BABY_UI_SITE_URL ?? "https://baby-ui.pages.dev"
).replace(/\/$/, "");

export const REGISTRY_NAME = "baby-ui";

/** Where a framework's implementation sources live, and where its registry is served. */
export const FRAMEWORK: Record<
	Framework,
	{
		srcDir: string;
		routePrefix: string;
		libAlias: string;
		uiTarget: string;
		libTarget: string;
	}
> = {
	react: {
		srcDir: resolve(REPO_ROOT, "packages/ui-react/src"),
		routePrefix: "r",
		libAlias: "@/lib",
		uiTarget: "components/ui",
		libTarget: "lib",
	},
	svelte: {
		srcDir: resolve(REPO_ROOT, "packages/ui-svelte/src/lib"),
		routePrefix: "svelte/r",
		libAlias: "$lib",
		uiTarget: "src/lib/components/ui",
		libTarget: "src/lib",
	},
};

export const OUT_DIR = resolve(REPO_ROOT, "apps/site/static");
