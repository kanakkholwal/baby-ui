import bash from "@shikijs/langs/bash";
import css from "@shikijs/langs/css";
import javascript from "@shikijs/langs/javascript";
import json from "@shikijs/langs/json";
import jsx from "@shikijs/langs/jsx";
import svelte from "@shikijs/langs/svelte";
import tsx from "@shikijs/langs/tsx";
import typescript from "@shikijs/langs/typescript";
import githubDark from "@shikijs/themes/github-dark-default";
import githubLight from "@shikijs/themes/github-light-default";
import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

const LANG: Record<string, string> = {
	ts: "typescript",
	tsx: "tsx",
	js: "javascript",
	jsx: "jsx",
	svelte: "svelte",
	css: "css",
	json: "json",
	bash: "bash",
	sh: "bash",
};

export const LANG_LABEL: Record<string, string> = {
	ts: "TS",
	tsx: "TSX",
	js: "JS",
	jsx: "JSX",
	svelte: "Svelte",
	css: "CSS",
	json: "JSON",
	bash: "Shell",
};

export function langFor(path: string): string {
	const ext = path.split(".").pop() ?? "ts";
	return ext in LANG ? ext : "ts";
}

let highlighter: Promise<HighlighterCore> | undefined;

// Cloudflare forbids runtime WebAssembly, so Shiki's Oniguruma engine throws there.
// Naming the grammars we use also keeps the other two hundred out of the bundle.
function load() {
	highlighter ??= createHighlighterCore({
		themes: [githubLight, githubDark],
		langs: [typescript, tsx, javascript, jsx, svelte, css, json, bash],
		engine: createJavaScriptRegexEngine({ forgiving: true }),
	});
	return highlighter;
}

/** Runs on the server only, so no highlighter ships to the browser. */
export async function highlight(code: string, lang: string) {
	const shiki = await load();
	return shiki.codeToHtml(code, {
		lang: LANG[lang] ?? "typescript",
		themes: { light: "github-light-default", dark: "github-dark-default" },
		defaultColor: false,
	});
}
