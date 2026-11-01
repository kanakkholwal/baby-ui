import { z } from "zod";
import { CliError } from "../errors.ts";
import { c } from "../logger.ts";
import { installConfig } from "../project/paths.ts";
import type { Target } from "../project/targets.ts";
import { fetchJson } from "../registry/fetch.ts";
import { packUrl } from "../registry/resolve.ts";
import { intro, note, outro } from "../ui/index.ts";
import { type AddOptions, installInto } from "./add.ts";
import { type CommonOptions, configuredTargets } from "./shared.ts";

const PackIndexSchema = z.array(
	z.object({
		name: z.string(),
		title: z.string().optional(),
		description: z.string().optional(),
		count: z.number().optional(),
	}),
);

type PackIndex = z.infer<typeof PackIndexSchema>;

async function packIndex(target: Target): Promise<PackIndex> {
	const cfg = installConfig(target);
	const ctx = {
		framework: cfg.framework,
		typescript: cfg.typescript,
		config: {},
		cwd: target.root,
	};
	return PackIndexSchema.parse(
		await fetchJson({ url: packUrl("index", ctx), headers: {} }),
	);
}

/** Installs every component in the named packs, as one undoable change per project. */
export async function packAdd(options: AddOptions): Promise<void> {
	const targets = await configuredTargets(options);
	intro(`baby-ui pack add ${options.items.join(" ")}`);
	for (const target of targets) {
		const known = new Set((await packIndex(target)).map((pack) => pack.name));
		const unknown = options.items.filter((id) => !known.has(id));
		if (unknown.length) {
			throw new CliError(`Unknown pack: ${unknown.join(", ")}.`, {
				hint: `Packs: ${[...known].join(", ")}. Run \`baby-ui pack list\` for details.`,
			});
		}
		await installInto(target, { ...options, packs: true });
	}
	outro(options.dryRun ? "Dry run, nothing written" : "Done");
}

export async function packList(
	options: CommonOptions & { json?: boolean },
): Promise<void> {
	const [target] = await configuredTargets(options);
	if (!target) return;
	const packs = await packIndex(target);
	if (options.json) {
		console.log(JSON.stringify(packs, null, 2));
		return;
	}
	intro("baby-ui pack list");
	const width = Math.max(0, ...packs.map((pack) => pack.name.length));
	note(
		packs
			.map(
				(pack) =>
					`${pack.name.padEnd(width)}  ${c.dim(`${pack.count ?? "?"} components · ${pack.description ?? ""}`)}`,
			)
			.join("\n"),
		"Packs",
	);
	outro(`Install one with ${c.brand("baby-ui pack add <name>")}`);
}
