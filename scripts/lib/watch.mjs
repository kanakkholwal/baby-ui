import { watch } from "node:fs";
import { join } from "node:path";

/**
 * Reruns `run(changed)` once changes under `roots` go quiet, with the paths changed since the last
 * run. Runs never overlap (a change mid-run queues one more); a failure goes to `onError`.
 */
export function watchAndRun({
	roots,
	run,
	ignore = () => false,
	debounceMs = 300,
	onError = (error) => console.error(error),
}) {
	let timer;
	let running = false;
	let queued = false;
	let changed = new Set();

	const execute = async () => {
		if (running) {
			queued = true;
			return;
		}
		running = true;
		const batch = changed;
		changed = new Set();
		try {
			await run(batch);
		} catch (error) {
			onError(error);
		} finally {
			running = false;
			if (queued) {
				queued = false;
				schedule();
			}
		}
	};
	const schedule = () => {
		clearTimeout(timer);
		timer = setTimeout(execute, debounceMs);
	};

	const watchers = roots.map((root) =>
		watch(root, { recursive: true }, (_event, file) => {
			const path = file ? join(root, file) : root;
			if (file && ignore(path)) return;
			changed.add(path);
			schedule();
		}).on("error", onError),
	);
	return {
		close() {
			clearTimeout(timer);
			for (const watcher of watchers) watcher.close();
		},
	};
}
