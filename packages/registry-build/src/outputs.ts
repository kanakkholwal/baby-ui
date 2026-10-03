import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

async function filesUnder(dir: string): Promise<string[]> {
	const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
	const nested = await Promise.all(
		entries.map((entry) => {
			const path = join(dir, entry.name);
			return entry.isDirectory() ? filesUnder(path) : [path];
		}),
	);
	return nested.flat();
}

/**
 * The files one build owns. Unchanged content is never rewritten, so a running dev server only
 * reloads what changed; `prune` deletes files under `ownedDirs` this build no longer writes.
 */
export function createOutputs(ownedDirs: string[]) {
	const written = new Set<string>();
	let changed = 0;

	return {
		async write(path: string, content: string): Promise<void> {
			const target = resolve(path);
			written.add(target);
			if ((await readFile(target, "utf8").catch(() => null)) === content) return;
			await mkdir(dirname(target), { recursive: true });
			await writeFile(target, content, "utf8");
			changed++;
		},
		async prune(): Promise<string[]> {
			const stale = (await Promise.all(ownedDirs.map(filesUnder)))
				.flat()
				.filter((path) => !written.has(resolve(path)));
			await Promise.all(stale.map((path) => rm(path)));
			return stale;
		},
		summary: () => ({ written: written.size, changed }),
	};
}
