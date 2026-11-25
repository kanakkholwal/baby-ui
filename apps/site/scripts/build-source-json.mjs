import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	statSync,
	utimesSync,
	writeFileSync,
} from "node:fs";
import { availableParallelism } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { isMainThread, parentPort, Worker, workerData } from "node:worker_threads";

const SITE = join(dirname(fileURLToPath(import.meta.url)), "..");
const GENERATED = join(SITE, "src/lib/generated");
const OUT = join(SITE, "static/source");

/** One highlighted `installSource` payload, the same shape the page reads from `#lib/source`. */
async function build(files, css, highlight, langFor) {
	const done = await Promise.all(
		files.map(async (file) => {
			const tsLang = langFor(file.path);
			const jsLang = file.jsPath ? langFor(file.jsPath) : tsLang;
			return {
				path: file.path,
				jsPath: file.jsPath,
				ts: { code: file.ts, lang: tsLang, html: await highlight(file.ts, tsLang) },
				js: file.js
					? { code: file.js, lang: jsLang, html: await highlight(file.js, jsLang) }
					: null,
			};
		}),
	);
	return {
		files: done,
		css: css ? { code: css, html: await highlight(css, "css") } : null,
	};
}

const read = (path) => (existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {});

/** Output newer than both inputs and this script: nothing to re-highlight. */
function fresh(slug) {
	const out = join(OUT, slug, "react.json");
	if (!existsSync(out)) return false;
	const built = statSync(out).mtimeMs;
	const inputs = [
		join(GENERATED, "sources", `${slug}.json`),
		join(GENERATED, "css", `${slug}.json`),
		fileURLToPath(import.meta.url),
		join(SITE, "src/lib/highlight.ts"),
	];
	return inputs.every((f) => !existsSync(f) || statSync(f).mtimeMs <= built);
}

async function worker() {
	const { highlight, langFor } = await import("../src/lib/highlight.ts");
	parentPort.on("message", async (slugs) => {
		let written = 0;
		for (const slug of slugs) {
			if (fresh(slug)) continue;
			const sources = read(join(GENERATED, "sources", `${slug}.json`));
			const css = read(join(GENERATED, "css", `${slug}.json`));
			for (const framework of Object.keys(sources)) {
				const payload = await build(
					sources[framework],
					css[framework] ?? null,
					highlight,
					langFor,
				);
				const dir = join(OUT, slug);
				mkdirSync(dir, { recursive: true });
				const file = join(dir, `${framework}.json`);
				const next = JSON.stringify(payload);
				if (!existsSync(file) || readFileSync(file, "utf8") !== next) {
					writeFileSync(file, next);
					written++;
				} else utimesSync(file, new Date(), new Date());
			}
		}
		parentPort.postMessage(written);
	});
}

/** Free components only: Pro source ships from the private registry, never the public site. */
function publicSlugs() {
	const pro = new Set(
		existsSync(join(SITE, "../../pro/components"))
			? readdirSync(join(SITE, "../../pro/components"))
			: [],
	);
	return readdirSync(join(GENERATED, "sources"))
		.filter((f) => f.endsWith(".json"))
		.map((f) => f.slice(0, -5))
		.filter((slug) => !pro.has(slug));
}

async function main() {
	const started = performance.now();
	const slugs = publicSlugs();
	const threads = Math.min(slugs.length, Math.max(1, availableParallelism() - 2));
	const chunks = Array.from({ length: threads }, () => []);
	slugs.forEach((slug, i) => {
		chunks[i % threads].push(slug);
	});
	const results = await Promise.all(
		chunks.map(
			(chunk) =>
				new Promise((resolve, reject) => {
					const w = new Worker(fileURLToPath(import.meta.url), {
						workerData: { worker: true },
					});
					w.once("message", (n) => {
						resolve(n);
						w.terminate();
					});
					w.once("error", reject);
					w.postMessage(chunk);
				}),
		),
	);
	const written = results.reduce((a, b) => a + b, 0);
	console.log(
		`source-json: ${slugs.length} components, ${written} written, ${threads} threads, ${Math.round(performance.now() - started)}ms`,
	);
}

if (isMainThread) await main();
else if (workerData?.worker) await worker();
