import { highlight } from "./highlight";

/** The subset of docvia's RenderOutput this module touches. */
export type Node = {
	kind: string;
	tag?: string;
	name?: string;
	id?: string;
	value?: string;
	props?: Record<string, unknown>;
	children?: Node[];
	hydrate?: boolean;
};

export type Heading = { id: string; label: string };

function text(node: Node): string {
	if (node.kind === "text") return node.value ?? "";
	return (node.children ?? []).map(text).join("");
}

// Fenced code arrives as <pre class="docvia-code-block"><code data-lang>, unhighlighted.
// It leaves as our CodeBlock component, so docs and component pages share one frame.
async function swap(node: Node): Promise<Node> {
	const code = node.children?.[0];
	if (node.kind === "element" && node.tag === "pre" && code?.tag === "code") {
		const lang = String(code.props?.["data-lang"] ?? "ts");
		const source = text(code).replace(/\n$/, "");
		return {
			kind: "component",
			name: "code-block",
			id: node.id ?? "code",
			hydrate: true,
			props: {
				code: source,
				lang,
				html: await highlight(source, lang),
				maxHeight: "none",
			},
		};
	}
	if (node.children)
		node = { ...node, children: await Promise.all(node.children.map(swap)) };
	return node;
}

function collect(node: Node, out: Heading[]) {
	if (
		node.kind === "element" &&
		node.tag === "h2" &&
		typeof node.props?.id === "string"
	) {
		out.push({ id: node.props.id, label: text(node) });
	}
	for (const child of node.children ?? []) collect(child, out);
}

/** Rewrites code fences to CodeBlock and lists the h2 headings for an outline. */
export async function prepare<T>(
	content: T,
): Promise<{ content: T; headings: Heading[] }> {
	const node = (await swap(content as Node)) as Node;
	const headings: Heading[] = [];
	collect(node, headings);
	return { content: node as T, headings };
}
