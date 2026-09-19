import type { Framework, RegistryItem } from "@baby-ui/registry-schema";

/** The emitted items, so the Code tab shows exactly what the CLI installs. */
const sources: Record<Framework, Record<string, unknown>> = {
	react: import.meta.glob("../../static/r/*.json", { eager: true, import: "default" }),
	svelte: import.meta.glob("../../static/svelte/r/*.json", {
		eager: true,
		import: "default",
	}),
};

const INDEX_FILES = new Set(["registry.json", "specs.json"]);

function byslug(framework: Framework): Map<string, RegistryItem> {
	const out = new Map<string, RegistryItem>();
	for (const [path, value] of Object.entries(sources[framework])) {
		const file = path.split("/").pop();
		if (!file || INDEX_FILES.has(file)) continue;
		out.set(file.replace(/\.json$/, ""), value as RegistryItem);
	}
	return out;
}

const cache = { react: byslug("react"), svelte: byslug("svelte") } as const;

export function registryItem(
	slug: string,
	framework: Framework,
): RegistryItem | undefined {
	return cache[framework].get(slug);
}

export function installCommand(slug: string, framework: Framework, site: string): string {
	return framework === "react"
		? `npx shadcn@latest add ${site}/r/${slug}.json`
		: `npx shadcn-svelte@latest add ${site}/svelte/r/${slug}.json`;
}
