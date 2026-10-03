import { parentPort } from "node:worker_threads";
import { generate } from "../generate.mjs";

// One generate() per message; the module cache (and exportsOf's parse cache) lives as long as
// this worker, so the watcher swaps workers when the generator's own code changes.
parentPort?.on("message", () => {
	try {
		parentPort?.postMessage({ generated: generate().generated });
	} catch (error) {
		parentPort?.postMessage({
			error: error instanceof Error ? error.message : String(error),
		});
	}
});
