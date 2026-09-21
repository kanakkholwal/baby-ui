import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import postcss, { type AtRule, type Rule } from "postcss";

type Css = { [key: string]: string | Css };

const tokensDir = dirname(
	createRequire(import.meta.url).resolve("@baby-ui/tokens/theme.css"),
);

const CLASS = /\.([a-zA-Z][\w-]*)/g;

function classesOf(selector: string): string[] {
	return [...selector.matchAll(CLASS)].map((m) => m[1] as string);
}

function decls(node: Rule | AtRule): Css {
	const out: Css = {};
	node.each((child) => {
		if (child.type === "decl") out[child.prop] = child.value.replace(/\s+/g, " ");
		else if (child.type === "rule" || child.type === "atrule") {
			out[child.type === "rule" ? child.selector : `@${child.name} ${child.params}`] =
				decls(child);
		}
	});
	return out;
}

let parsed: Promise<postcss.Root> | undefined;

/**
 * The motion.css rules a component's own files reference, with the keyframes those rules
 * animate with, so `shadcn add` writes exactly the CSS that component needs.
 */
export async function cssFor(sources: string[]): Promise<Css | undefined> {
	parsed ??= readFile(resolve(tokensDir, "motion.css"), "utf8").then((raw) =>
		postcss.parse(raw.replace(/\r\n/g, "\n")),
	);
	const root = await parsed;
	const text = sources.join("\n");
	const used = (selector: string) =>
		classesOf(selector).some((c) => new RegExp(`(^|[^\\w-])${c}([^\\w-]|$)`).test(text));

	const out: Css = {};
	const animations = new Set<string>();
	const keyframes = new Map<string, Css>();

	const noteAnimations = (rule: Rule) => {
		rule.walkDecls(/^animation(-name)?$/, (decl) => {
			for (const word of decl.value.split(/[\s,]+/)) animations.add(word);
		});
	};

	root.each((node) => {
		if (node.type === "atrule" && node.name === "keyframes") {
			keyframes.set(node.params, decls(node));
			return;
		}
		if (node.type === "rule") {
			if (!used(node.selector)) return;
			out[node.selector.replace(/\s+/g, " ")] = decls(node);
			noteAnimations(node);
			return;
		}
		if (node.type === "atrule" && node.name === "media") {
			const inner: Css = {};
			node.each((child) => {
				if (child.type !== "rule" || child.selector === ":root" || !used(child.selector))
					return;
				inner[child.selector.replace(/\s+/g, " ")] = decls(child);
			});
			if (Object.keys(inner).length) out[`@media ${node.params}`] = inner;
		}
	});

	for (const name of animations) {
		const frames = keyframes.get(name);
		if (frames) out[`@keyframes ${name}`] = frames;
	}
	return Object.keys(out).length ? out : undefined;
}

/** The `css` object as a stylesheet, for the Manual install view. */
export function cssText(css: Css | undefined, depth = 0): string {
	if (!css) return "";
	const pad = "\t".repeat(depth);
	return Object.entries(css)
		.map(([k, v]) =>
			typeof v === "string"
				? `${pad}${k}: ${v};`
				: `${pad}${k} {\n${cssText(v, depth + 1)}\n${pad}}`,
		)
		.join(depth === 0 ? "\n\n" : "\n");
}
