#!/usr/bin/env node
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const REACT_SRC = join(ROOT, "packages/ui-react/src");
const SVELTE_SRC = join(ROOT, "packages/ui-svelte/src/lib");
const SAMPLES = join(ROOT, "packages/demos/src/data/email-samples.ts");
const SPECS = join(ROOT, "packages/registry-schema/src/components/index.ts");
const OUT = join(ROOT, "apps/site/src/lib/generated/emails");
// Bundles land inside each port's node_modules so bare imports resolve to that port's deps.
const REACT_CACHE = join(ROOT, "packages/ui-react/node_modules/.cache/baby-ui-emails");
const SVELTE_CACHE = join(ROOT, "packages/ui-svelte/node_modules/.cache/baby-ui-emails");
const MAX_BYTES = 102 * 1024;

const pascal = (slug) => slug.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const posix = (p) => p.split("\\").join("/");
const str = JSON.stringify;

const slugs = readdirSync(REACT_SRC).filter(
	(d) => d.startsWith("email-") && d !== "email-kit",
);

async function bundle(entrySource, resolveDir, outfile, plugins = [], external = []) {
	await build({
		stdin: { contents: entrySource, resolveDir, loader: "tsx" },
		bundle: true,
		platform: "node",
		format: "esm",
		jsx: "automatic",
		outfile,
		plugins,
		external,
		logLevel: "error",
	});
	return import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
}

async function renderReact(props) {
	const entry = [
		'import { createElement } from "react";',
		'import { render } from "react-email";',
		...slugs.map((s) => `import { ${pascal(s)} } from "./${s}/${s}";`),
		"export default async function run(props) {",
		"\tconst out = {};",
		...slugs.map(
			(s) =>
				`\tout[${str(s)}] = await render(createElement(${pascal(s)}, props[${str(s)}]));`,
		),
		"\treturn out;",
		"}",
	].join("\n");
	const external = ["react", "react-dom", "react-email"];
	const mod = await bundle(
		entry,
		REACT_SRC,
		join(REACT_CACHE, "render.mjs"),
		[],
		external,
	);
	return mod.default(props);
}

const { compile } = createRequire(join(SVELTE_SRC, "index.ts"))("svelte/compiler");

const sveltePlugin = {
	name: "svelte-server",
	setup(b) {
		b.onLoad({ filter: /\.svelte$/ }, async (args) => {
			const source = readFileSync(args.path, "utf8");
			const { js, warnings } = compile(source, {
				generate: "server",
				filename: args.path,
			});
			for (const w of warnings)
				console.warn(`svelte: ${relative(ROOT, args.path)}: ${w.message}`);
			return { contents: js.code, loader: "js", resolveDir: dirname(args.path) };
		});
	},
};

async function renderSvelte(props) {
	const entry = [
		'import { Renderer, pixelBasedPreset } from "@better-svelte-email/server";',
		'import { emailTailwindConfig } from "./lib/email-theme";',
		...slugs.map((s) => `import ${pascal(s)} from "./${s}/${s}.svelte";`),
		"export default async function run(props) {",
		"\tconst tailwindConfig = { ...emailTailwindConfig, presets: [pixelBasedPreset] };",
		"\tconst renderer = new Renderer({ tailwindConfig });",
		"\tconst out = {};",
		...slugs.map(
			(s) =>
				`\tout[${str(s)}] = await renderer.render(${pascal(s)}, { props: props[${str(s)}] });`,
		),
		"\treturn out;",
		"}",
	].join("\n");
	const external = ["svelte", "svelte/*", "@better-svelte-email/server"];
	const mod = await bundle(
		entry,
		SVELTE_SRC,
		join(SVELTE_CACHE, "render.mjs"),
		[sveltePlugin],
		external,
	);
	return mod.default(props);
}

/** Quality gates every rendered email must pass; returns failure messages. */
function audit(slug, port, html, props) {
	const fail = [];
	const bytes = Buffer.byteLength(html);
	if (bytes > MAX_BYTES) fail.push(`${bytes} bytes; Gmail clips past ${MAX_BYTES}`);
	if (/var\(--/.test(html)) fail.push("CSS variable left in output");
	if (/oklch\(/.test(html)) fail.push("oklch colour left in output");
	if (/\d(\.\d+)?rem\b/.test(html)) fail.push("rem unit left in output");
	if (!/prefers-color-scheme:\s*dark/.test(html)) fail.push("no dark-mode media query");
	// Better Svelte Email writes breakpoints as `(width >= 480px)`, which Gmail drops.
	if (/@media[^{]*\bwidth\s*[<>]/.test(html))
		fail.push("range media query; use fixed sizes");
	for (const [, w] of html.matchAll(/(?:^|[;"\s])(?:max-)?width:\s*(\d+)px/g))
		if (+w > 600) fail.push(`width ${w}px exceeds 600px`);
	// A light fill with no dark twin shows as a bright band in dark-mode inboxes.
	for (const [tag] of html.matchAll(
		/<[a-z0-9]+\b[^>]*background-color:(?!\s*transparent)[^>]*>/g,
	))
		if (!/class="[^"]*dark_bg-/.test(tag))
			fail.push(`background without dark twin: ${tag.slice(0, 100)}`);
	for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
		if (!/\balt="[^"]+"/.test(tag)) fail.push(`img without alt: ${tag.slice(0, 80)}`);
		if (!/\bsrc="https:\/\//.test(tag))
			fail.push(`img src not absolute https: ${tag.slice(0, 80)}`);
	}
	for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]*)"/g))
		if (!/^(https:\/\/|mailto:)/.test(href)) fail.push(`link not absolute: ${href}`);
	const unstyled = [...html.matchAll(/class="([^"]*)"/g)]
		.flatMap((m) => m[1].split(/\s+/))
		.filter((c) => c && !c.startsWith("dark_"));
	if (unstyled.length)
		fail.push(`classes left un-inlined: ${[...new Set(unstyled)].slice(0, 6).join(" ")}`);
	if (props.preview && !html.includes(props.preview)) fail.push("preview text missing");
	return fail.map((f) => `${slug} (${port}): ${f}`);
}

const { toPlainText } = await import(
	pathToFileURL(join(ROOT, "node_modules/@better-svelte-email/server/dist/index.mjs"))
		.href
);
// React Email's preview div lacks the id toPlainText skips, so drop the preview block from both.
const plainText = (html) =>
	toPlainText(
		html.replace(/<div[^>]*data-skip-in-text="true"[^>]*>[\s\S]*?<\/div>\s*<\/div>/, ""),
	);

const normalise = (text) =>
	text
		.replace(/[\u00a0\u200b-\u200f\u2028\u2029\ufeff\u00ad]|\u034f/g, " ")
		.replace(/\s+/g, " ")
		.trim();

// Same merge as the site's live endpoint: sample data, then the spec's control defaults.
const data = await bundle(
	[
		`export { EMAIL_SAMPLES } from ${str(posix(SAMPLES))};`,
		`export { getSpec } from ${str(posix(SPECS))};`,
	].join("\n"),
	ROOT,
	join(REACT_CACHE, "data.mjs"),
);
const props = Object.fromEntries(
	slugs.map((slug) => {
		const controls = (data.getSpec(slug)?.props ?? [])
			.filter((p) => p.control.kind !== "none" && p.default !== undefined)
			.map((p) => [p.name, p.default]);
		return [slug, { ...data.EMAIL_SAMPLES[slug], ...Object.fromEntries(controls) }];
	}),
);

const [react, svelte] = await Promise.all([renderReact(props), renderSvelte(props)]);
const failures = [];
mkdirSync(OUT, { recursive: true });
for (const slug of slugs) {
	const out = { slug, props: props[slug] };
	for (const [port, html] of [
		["react", react[slug]],
		["svelte", svelte[slug]],
	]) {
		failures.push(...audit(slug, port, html, props[slug]));
		out[port] = { html, text: plainText(html), bytes: Buffer.byteLength(html) };
	}
	const a = normalise(out.react.text);
	const b = normalise(out.svelte.text);
	if (a !== b) {
		let i = 0;
		while (a[i] === b[i]) i++;
		failures.push(
			`${slug}: React and Svelte text differ at ${i}: "${a.slice(i, i + 50)}" vs "${b.slice(i, i + 50)}"`,
		);
	}
	writeFileSync(join(OUT, `${slug}.json`), `${str(out)}\n`);
	const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
	console.log(
		`emails: ${slug} react ${kb(out.react.bytes)}, svelte ${kb(out.svelte.bytes)}`,
	);
}

if (failures.length) {
	console.error(failures.map((f) => `  x ${f}`).join("\n"));
	process.exit(1);
}
console.log(`emails: ${slugs.length} rendered, all gates pass`);
