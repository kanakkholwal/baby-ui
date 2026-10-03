import { untrack } from "svelte";

export type CodePanel = { id: string; label: string; code: string; lang: string };
type LiveCodeInput = { open: boolean; panels: CodePanel[] };

const escapeHtml = (text: string) =>
	text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

// The highlighter's own markup shape, so CodeBlock styles plain and highlighted code alike.
const plain = (code: string) =>
	`<pre><code>${code
		.trimEnd()
		.split("\n")
		.map((line) => `<span class="line">${escapeHtml(line) || " "}</span>`)
		.join("\n")}</code></pre>`;

/** A studio's generated code for CodeBlock: plain at once, then highlighted. The highlighter
 * loads only once the code sheet opens. Create during component init. */
export class LiveCode {
	#input: () => LiveCodeInput;
	#html = $state<Record<string, string>>({});
	panels = $derived.by(() =>
		this.#input().panels.map((panel) => ({
			...panel,
			html: this.#html[panel.code] ?? plain(panel.code),
		})),
	);

	constructor(input: () => LiveCodeInput) {
		this.#input = input;
		$effect(() => {
			const { open, panels } = input();
			if (!open) return;
			const known = untrack(() => this.#html);
			if (panels.every((panel) => panel.code in known)) return;
			let cancelled = false;
			// Debounced, so dragging a dial re-highlights once it settles.
			const timer = setTimeout(async () => {
				const { highlight } = await import("#lib/highlight.js");
				const html = await Promise.all(
					panels.map(async (panel) => [
						panel.code,
						known[panel.code] ?? (await highlight(panel.code, panel.lang)),
					]),
				);
				// Only the current panels are kept, so the cache never outgrows one view.
				if (!cancelled) this.#html = Object.fromEntries(html);
			}, 150);
			return () => {
				cancelled = true;
				clearTimeout(timer);
			};
		});
	}
}
