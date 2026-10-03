import { join } from "node:path";
import { Worker } from "node:worker_threads";
import { ROOT } from "./gen/core.mjs";
import { BOOKKEEPING, isGeneratorCode, sourceRoots } from "./gen/roots.mjs";
import { reportMemory } from "./lib/memory.mjs";
import { watchAndRun } from "./lib/watch.mjs";

let worker = null;
const startWorker = () => {
	const next = new Worker(new URL("./gen/worker.mjs", import.meta.url));
	// A crashed worker is replaced on the next run rather than left to swallow requests.
	next.once("exit", () => {
		if (worker === next) worker = null;
	});
	return next;
};

/** One generate() in the worker; resolves with the paths it owns. */
function generateInWorker() {
	worker ??= startWorker();
	const current = worker;
	return new Promise((done, fail) => {
		const settle = (handler) => (value) => {
			current.off("message", onMessage);
			current.off("error", onFailure);
			current.off("exit", onExit);
			handler(value);
		};
		const onMessage = settle((message) =>
			message.error ? fail(new Error(message.error)) : done(new Set(message.generated)),
		);
		const onFailure = settle(fail);
		const onExit = settle((code) => fail(new Error(`worker exited with ${code}`)));
		current.on("message", onMessage);
		current.on("error", onFailure);
		current.on("exit", onExit);
		current.postMessage("run");
	});
}

const onError = (error) =>
	console.error(`gen failed, retrying on the next change: ${error.message}`);

let owned = new Set();
try {
	owned = await generateInWorker();
} catch (error) {
	onError(error);
}

watchAndRun({
	roots: [...sourceRoots(), join(ROOT, "scripts")],
	// Its own writes would retrigger it; under scripts/ only the generator's code matters.
	ignore: (path) =>
		owned.has(path) ||
		BOOKKEEPING.test(path) ||
		(path.startsWith(join(ROOT, "scripts")) && !isGeneratorCode(path)),
	run: async (changed) => {
		if (worker && [...changed].some(isGeneratorCode)) {
			const stale = worker;
			worker = null;
			await stale.terminate();
			console.log("gen: generator code changed, reloading");
		}
		owned = await generateInWorker();
	},
	onError,
});
console.log("gen: watching sources");
reportMemory((line) => console.log(`gen: ${line}`));
