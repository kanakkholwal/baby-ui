import { useMemo } from "react";
import { cn } from "../lib/cn";
import { type MarkdownSize, markdown } from "./variants";

export type { MarkdownSize };

type Block =
	| { kind: "heading"; level: 2 | 3; text: string }
	| { kind: "para"; text: string }
	| { kind: "list"; items: string[] }
	| { kind: "code"; text: string };

/**
 * A deliberately small block parser: headings, paragraphs, lists and fenced code.
 * Anything richer belongs in a real markdown pipeline, not a copied component.
 */
function parse(content: string): Block[] {
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
}

export interface MarkdownProps {
	content: string;
	size?: MarkdownSize;
	className?: string;
}

export function Markdown({ content, size = "md", className }: MarkdownProps) {
	const blocks = useMemo(() => parse(content), [content]);
	const styles = markdown({ size });
	return (
		<div data-slot="markdown" className={cn(styles.root(), className)}>
			{blocks.map((block, i) => {
				const key = i;
				if (block.kind === "heading" && block.level === 2) {
					return (
						<h2 key={key} className={styles.h2()}>
							{block.text}
						</h2>
					);
				}
				if (block.kind === "heading") {
					return (
						<h3 key={key} className={styles.h3()}>
							{block.text}
						</h3>
					);
				}
				if (block.kind === "list") {
					return (
						<ul key={key} className={styles.list()}>
							{block.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					);
				}
				if (block.kind === "code") {
					return (
						<pre key={key} className={styles.code()}>
							<code>{block.text}</code>
						</pre>
					);
				}
				return (
					<p key={key} className={styles.para()}>
						{block.text}
					</p>
				);
			})}
		</div>
	);
}
