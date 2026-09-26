import type { ComponentSpec } from "@baby-ui/registry-schema";
import { FRAMEWORKS } from "@baby-ui/registry-schema";
import origins from "./generated/origins.json";
import { installCommand } from "./registry-items";
import { usageSnippet } from "./usage";

const RAW = import.meta.glob("/src/docs/**/*.md", {
	query: "?raw",
	eager: true,
	import: "default",
});

function body(path: string): string {
	const raw = RAW[path] as string | undefined;
	// Frontmatter is already on the page as title and description.
	return raw?.replace(/^---[\s\S]*?---\s*/, "") ?? "";
}

/** A guide as plain markdown, for agents and the Copy Page button. */
export function guideMarkdown(slug: string, title: string, description: string): string {
	return `# ${title}\n\n${description}\n\n${body(`/src/docs/guides/${slug}.md`)}`.trim();
}

/** A component page as plain markdown: install, usage, props, keyboard, then its prose. */
export async function componentMarkdown(spec: ComponentSpec): Promise<string> {
	const out = [`# ${spec.name}`, "", spec.description, ""];
	out.push("## Install", "");
	if (spec.tier === "pro")
		out.push(
			"Pro component: the install command is available after signing in on the site.",
			"",
		);
	for (const framework of FRAMEWORKS) {
		if (!spec.impl[framework] || spec.tier === "pro") continue;
		out.push(
			"```bash",
			installCommand(spec.slug, framework, origins.registry),
			"```",
			"",
		);
	}
	for (const framework of FRAMEWORKS) {
		const usage = await usageSnippet(spec.slug, framework);
		if (!usage) continue;
		out.push(
			`## Usage (${framework})`,
			"",
			`\`\`\`${usage.path.split(".").pop()}`,
			usage.ts,
			"```",
			"",
		);
	}
	if (spec.props.length) {
		out.push(
			"## Props",
			"",
			"| Prop | Type | Default | Description |",
			"| --- | --- | --- | --- |",
		);
		for (const p of spec.props) {
			const def =
				p.default === undefined || p.default === null ? "" : `\`${String(p.default)}\``;
			out.push(
				`| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${def} | ${p.description} |`,
			);
		}
		out.push("");
	}
	if (spec.motion) {
		out.push(
			"## Behaviour contract",
			"",
			...spec.motion.behaviour.map((b) => `- ${b}`),
			`- Reduced motion: ${spec.motion.reducedMotion}`,
			"",
		);
	}
	if (spec.a11y.keyboard.length) {
		out.push("## Keyboard", "", ...spec.a11y.keyboard.map((k) => `- ${k}`), "");
	}
	if (spec.a11y.notes.length) {
		out.push("## Accessibility", "", ...spec.a11y.notes.map((n) => `- ${n}`), "");
	}
	out.push(body(`/src/docs/components/${spec.slug}.md`));
	return out.join("\n").trim();
}
