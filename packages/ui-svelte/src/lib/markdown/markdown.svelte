<script lang="ts">
import { cn } from "../lib/cn";
import { type MarkdownSize, markdown } from "./variants";

let {
	content,
	size = "md",
	class: classProp,
}: { content: string; size?: MarkdownSize; class?: string } = $props();

const styles = $derived(markdown({ size }));

type Block =
	| { kind: "heading"; level: 2 | 3; text: string }
	| { kind: "para"; text: string }
	| { kind: "list"; items: string[] }
	| { kind: "code"; text: string };

/**
 * A deliberately small block parser: headings, paragraphs, lists and fenced code.
 * Anything richer belongs in a real markdown pipeline, not a copied component.
 */
const blocks = $derived.by(() => {
	const out: Block[] = [];
	const lines = content.split("\n");
	let i = 0;
	while (i < lines.length) {
		const line = lines[i] ?? "";
		if (line.startsWith("```")) {
			const body: string[] = [];
			i++;
			while (i < lines.length && !(lines[i] ?? "").startsWith("```")) {
				body.push(lines[i] ?? "");
				i++;
			}
			i++;
			out.push({ kind: "code", text: body.join("\n") });
		} else if (line.startsWith("### ")) {
			out.push({ kind: "heading", level: 3, text: line.slice(4) });
			i++;
		} else if (line.startsWith("## ")) {
			out.push({ kind: "heading", level: 2, text: line.slice(3) });
			i++;
		} else if (line.startsWith("- ")) {
			const items: string[] = [];
			while (i < lines.length && (lines[i] ?? "").startsWith("- ")) {
				items.push((lines[i] ?? "").slice(2));
				i++;
			}
			out.push({ kind: "list", items });
		} else if (line.trim() === "") {
			i++;
		} else {
			const body: string[] = [];
			while (
				i < lines.length &&
				(lines[i] ?? "").trim() !== "" &&
				!(lines[i] ?? "").startsWith("#") &&
				!(lines[i] ?? "").startsWith("- ") &&
				!(lines[i] ?? "").startsWith("```")
			) {
				body.push(lines[i] ?? "");
				i++;
			}
			out.push({ kind: "para", text: body.join(" ") });
		}
	}
	return out;
});
</script>

<div data-slot="markdown" class={cn(styles.root(), classProp)}>
	{#each blocks as block, i (i)}
		{#if block.kind === "heading" && block.level === 2}
			<h2 class={styles.h2()}>{block.text}</h2>
		{:else if block.kind === "heading"}
			<h3 class={styles.h3()}>{block.text}</h3>
		{:else if block.kind === "list"}
			<ul class={styles.list()}>
				{#each block.items as item, j (j)}
					<li>{item}</li>
				{/each}
			</ul>
		{:else if block.kind === "code"}
			<pre class={styles.code()}><code>{block.text}</code></pre>
		{:else}
			<p class={styles.para()}>{block.text}</p>
		{/if}
	{/each}
</div>
