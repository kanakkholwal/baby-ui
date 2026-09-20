import { cp, mkdir, rm, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SITE_STATIC = resolve(HERE, "../site/static");
const DIST = resolve(HERE, "dist");

/** Everything registry-build emits for consumers. The site keeps its own copy. */
const ARTIFACTS = ["r", "svelte", "llms.txt"];

async function main() {
	await rm(DIST, { recursive: true, force: true });
	await mkdir(DIST, { recursive: true });
	await cp(join(HERE, "public"), DIST, { recursive: true });

	for (const entry of ARTIFACTS) {
		const from = join(SITE_STATIC, entry);
		await stat(from).catch(() => {
			throw new Error(`Missing ${from}. Run the registry build first.`);
		});
		await cp(from, join(DIST, entry), { recursive: true });
	}

	console.log(`registry-site wrote ${ARTIFACTS.join(", ")} to apps/registry/dist`);
}

main().catch((error) => {
	console.error(error.message);
	process.exit(1);
});
