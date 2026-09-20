import { cn } from "../lib/cn";

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
	className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
	return (
		<div className={cn("flex flex-col gap-3 text-sm leading-relaxed", className)}>
			{parse(content).map((block, i) => {
				const key = i;
				if (block.kind === "heading" && block.level === 2) {
					return (
						<h2
							key={key}
							className="font-heading font-semibold text-foreground text-lg tracking-tight"
						>
							{block.text}
						</h2>
					);
				}
				if (block.kind === "heading") {
					return (
						<h3
							key={key}
							className="font-heading font-semibold text-base text-foreground"
						>
							{block.text}
						</h3>
					);
				}
				if (block.kind === "list") {
					return (
						<ul
							key={key}
							className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground"
						>
							{block.items.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					);
				}
				if (block.kind === "code") {
					return (
						<pre
							key={key}
							className="overflow-x-auto rounded-lg border border-border bg-card p-3 font-mono text-[13px] text-foreground"
						>
							<code>{block.text}</code>
						</pre>
					);
				}
				return (
					<p key={key} className="text-muted-foreground">
						{block.text}
					</p>
				);
			})}
		</div>
	);
}
