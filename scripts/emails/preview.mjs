#!/usr/bin/env node
// Writes .local/email-previews/index.html: every rendered template at desktop and phone width.
// Run `pnpm emails` first; open the file in any browser. Dark mode follows your OS setting.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "../..");
const OUT = join(ROOT, ".local/email-previews");
const SOURCES = [
	["free", join(ROOT, "apps/site/src/lib/generated/emails")],
	["pro", join(ROOT, "apps/site/src/lib/generated/emails-pro")],
];
const port = process.argv[2] === "svelte" ? "svelte" : "react";
const esc = (html) => html.replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const cards = [];
for (const [tier, dir] of SOURCES) {
	let files = [];
	try {
		files = readdirSync(dir).filter((f) => f.endsWith(".json"));
	} catch {}
	for (const file of files) {
		const { slug, [port]: render } = JSON.parse(readFileSync(join(dir, file), "utf8"));
		cards.push(`<section><h2>${slug} <small>${tier}, ${port}</small></h2><div class="row">
<iframe title="${slug} desktop" style="width:640px" srcdoc="${esc(render.html)}"></iframe>
<iframe title="${slug} phone" style="width:375px" srcdoc="${esc(render.html)}"></iframe></div></section>`);
	}
}
mkdirSync(OUT, { recursive: true });
writeFileSync(
	join(OUT, "index.html"),
	`<!doctype html><meta charset="utf-8"><title>Email previews</title>
<style>body{font:14px system-ui;margin:24px;background:#e9e9ec}h2{margin:32px 0 8px}small{color:#777;font-weight:400}
.row{display:flex;gap:24px;align-items:flex-start}iframe{height:900px;border:0;background:#fff;border-radius:8px}</style>
${cards.join("\n")}`,
);
console.log(`email previews: ${cards.length} templates -> ${join(OUT, "index.html")}`);
