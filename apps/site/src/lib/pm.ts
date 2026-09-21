import type { PackageManager } from "./preferences.svelte";

export type PmKind = "dlx" | "add" | "create";

export const PMS: readonly PackageManager[] = ["bun", "npm", "pnpm", "yarn"];

const VERB: Record<PmKind, Record<PackageManager, string>> = {
	dlx: { bun: "bunx --bun", npm: "npx", pnpm: "pnpm dlx", yarn: "yarn dlx" },
	add: { bun: "bun add", npm: "npm install", pnpm: "pnpm add", yarn: "yarn add" },
	create: {
		bun: "bun create",
		npm: "npm create",
		pnpm: "pnpm create",
		yarn: "yarn create",
	},
};

/** The verb words for a package manager, e.g. `["pnpm", "dlx"]`. */
export function pmVerb(kind: PmKind, pm: PackageManager): string[] {
	return VERB[kind][pm].split(" ");
}

export function pmCommand(kind: PmKind, args: string, pm: PackageManager): string {
	// npm needs `--` before create-template flags; the others pass them straight through.
	const tail = kind === "create" && pm === "npm" ? args.replace(/ (?=--)/, " -- ") : args;
	return `${VERB[kind][pm]} ${tail}`;
}
