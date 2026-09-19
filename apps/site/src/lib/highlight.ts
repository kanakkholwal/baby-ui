import { type BundledLanguage, codeToHtml } from "shiki";

const LANG: Record<string, BundledLanguage> = {
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

/** Runs at build/request time so no highlighter ships to the browser. */
export function highlight(code: string, lang: string) {
	return codeToHtml(code, {
		lang: LANG[lang] ?? "typescript",
		theme: "github-dark-default",
	});
}
