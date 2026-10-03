import { watch } from "node:fs";
import { join } from "node:path";

/**
 * Reruns `run` once changes under `roots` go quiet. Runs never overlap (a change mid-run queues
 * one more), and a failing run goes to `onError` while the watcher keeps going.
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

	const execute = async () => {
		if (running) {
			queued = true;
			return;
		}
		running = true;
		try {
			await run();
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
			if (file && ignore(join(root, file))) return;
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
