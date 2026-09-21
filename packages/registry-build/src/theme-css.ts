import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import postcss, { type ChildNode, type Root } from "postcss";
import { SITE_URL } from "./config";

const tokensDir = dirname(
	createRequire(import.meta.url).resolve("@baby-ui/tokens/theme.css"),
);

async function parse(file: string): Promise<Root> {
	return postcss.parse(
		(await readFile(resolve(tokensDir, file), "utf8")).replace(/\r\n/g, "\n"),
	);
}

function isVarBlock(node: ChildNode): boolean {
	return node.type === "rule" && (node.selector === ":root" || node.selector === ".dark");
}

/** The base token layer for the guide: dark variant, theme mapping, palette, motion vars. */
export async function buildThemeCss(): Promise<string> {
	const out = postcss.root();
	const theme = await parse("theme.css");
	theme.each((node) => {
		if (node.type === "atrule" && ["custom-variant", "theme"].includes(node.name)) {
			out.append(node.clone());
		}
	});
	const palette = await parse("tokens.css");
	palette.each((node) => {
		if (isVarBlock(node)) out.append(node.clone());
	});
	const motion = await parse("motion.css");
	motion.each((node) => {
		if (isVarBlock(node)) out.append(node.clone());
		if (
			node.type === "atrule" &&
			node.name === "media" &&
			node.params.includes("reduced-motion")
		) {
			const media = node.clone({ nodes: [] });
			node.each((child) => {
				if (isVarBlock(child)) media.append(child.clone());
			});
			if (media.nodes?.length) out.append(media);
		}
	});
	const head = `/* Baby UI base theme. Generated from @baby-ui/tokens; see ${SITE_URL}/docs/installation */`;
	return `${head}\n\n${out.toString().trim()}\n`;
}
