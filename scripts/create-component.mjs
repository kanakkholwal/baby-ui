import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CATEGORIES = ["base", "blocks", "advanced", "animated", "agents"];
const RESERVED = new Set([
	"switch",
	"delete",
	"new",
	"class",
	"default",
	"function",
	"package",
]);

const [command, rawName, ...rest] = process.argv.slice(2);

if (command !== "create" || !rawName) {
	console.error("Usage: pnpm component create <name> [--category=base]");
	process.exit(1);
}

const slug = rawName;
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
	console.error(`"${slug}" must be a kebab-case slug, e.g. "button-group"`);
	process.exit(1);
}

const categoryFlag = rest.find((a) => a.startsWith("--category="));
const category = categoryFlag ? categoryFlag.slice("--category=".length) : "base";
if (!CATEGORIES.includes(category)) {
	console.error(`--category must be one of: ${CATEGORIES.join(", ")}`);
	process.exit(1);
}

const pascal = slug
	.split("-")
	.map((w) => w[0].toUpperCase() + w.slice(1))
	.join("");
const camelRaw = pascal[0].toLowerCase() + pascal.slice(1);
const camel = RESERVED.has(camelRaw) ? `${camelRaw}Component` : camelRaw;
const title = pascal.replace(/([a-z])([A-Z])/g, "$1 $2");

async function exists(path) {
	return readFile(path, "utf8").then(
		() => true,
		() => false,
	);
}

async function write(path, content) {
	await mkdir(dirname(path), { recursive: true });
	await writeFile(path, content);
	console.log(
		`  created ${path.replace(`${REPO_ROOT}\\`, "").replace(`${REPO_ROOT}/`, "")}`,
	);
}

/** Inserts before the first re-export statement whose dir sorts after `slug`; tracks each
 * statement's start line so a multi-line block inserts before its opening brace, not mid-block. */
function insertByDirGroup(content, newSlug, newLines) {
	const lines = content.split("\n");
	let insertAt = lines.length;
	let statementStart = null;
	for (let i = 0; i < lines.length; i++) {
		if (statementStart === null && /^export (type )?\{/.test(lines[i]))
			statementStart = i;
		const m = lines[i].match(/from ["']\.\/([a-z0-9-]+)\//);
		if (m) {
			if (m[1] > newSlug) {
				insertAt = statementStart ?? i;
				break;
			}
			statementStart = null;
		}
	}
	lines.splice(insertAt, 0, ...newLines);
	return lines.join("\n");
}

/** Inserts an import line alphabetically among the leading contiguous `import` lines. */
function insertAlphaImport(content, key, newLine, extractKey) {
	const lines = content.split("\n");
	let insertAt = null;
	let lastImport = -1;
	for (let i = 0; i < lines.length; i++) {
		if (!lines[i].startsWith("import ")) continue;
		lastImport = i;
		if (insertAt === null) {
			const k = extractKey(lines[i]);
			if (k && k > key) insertAt = i;
		}
	}
	lines.splice(insertAt ?? lastImport + 1, 0, newLine);
	return lines.join("\n");
}

/** Finds the last line of the leading contiguous import region, tracking brace depth so a
 * multi-line `import { ... } from "x"` counts as one statement, not just its first line. */
function lastImportLine(lines) {
	let depth = 0;
	let last = -1;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (depth === 0) {
			if (line.trim() === "") continue;
			if (!line.startsWith("import ")) break;
		}
		depth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
		if (depth <= 0) {
			last = i;
			depth = 0;
		}
	}
	return last;
}

/** Appends a line just before the closing `];`/`};` of the array/object started at `startLine`. */
function appendBeforeClose(content, startLine, entryLine) {
	const lines = content.split("\n");
	const start = lines.findIndex((l) => l.includes(startLine));
	if (start === -1) throw new Error(`marker not found: ${startLine}`);
	let close = -1;
	for (let i = start + 1; i < lines.length; i++) {
		if (/^\s*[\]}];?\s*$/.test(lines[i])) {
			close = i;
			break;
		}
	}
	if (close === -1) throw new Error(`no closing line found after: ${startLine}`);
	lines.splice(close, 0, entryLine);
	return lines.join("\n");
}

async function patch(path, fn) {
	const full = resolve(REPO_ROOT, path);
	const before = await readFile(full, "utf8");
	const after = fn(before);
	if (after === before) throw new Error(`no change produced for ${path}`);
	await writeFile(full, after);
	console.log(`  patched ${path}`);
}

const variantsTemplate = () => `import { tv, type VariantProps } from "tailwind-variants";

export const ${camel} = tv({
	base: "",
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: { variant: "default" },
});

export type ${pascal}Variant = NonNullable<VariantProps<typeof ${camel}>["variant"]>;
`;

const reactComponentTemplate = () => `import type { ComponentProps } from "react";
import { cn } from "../lib/cn";
import { type ${pascal}Variant, ${camel} } from "./variants";

export interface ${pascal}Props extends ComponentProps<"div"> {
	variant?: ${pascal}Variant;
}

export function ${pascal}({ className, variant, ...props }: ${pascal}Props) {
	return (
		<div
			data-slot="${slug}"
			data-variant={variant}
			className={cn(${camel}({ variant }), className)}
			{...props}
		/>
	);
}
`;

const svelteComponentTemplate = () => `<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { type ${pascal}Variant, ${camel} } from "./variants";

type Props = HTMLAttributes<HTMLDivElement> & {
	variant?: ${pascal}Variant;
};

let { class: classProp, variant, ...rest }: Props = $props();
</script>

<div data-slot="${slug}" data-variant={variant} class={cn(${camel}({ variant }), classProp)} {...rest}></div>
`;

const registrySchemaTemplate = () => `import { defineComponent } from "../index";

export const ${camel} = defineComponent({
	slug: "${slug}",
	name: "${title}",
	description: "TODO: one sentence describing ${title}.",
	category: "${category}",
	status: "experimental",
	variants: { variant: ["default"] },
	props: [
		{
			name: "variant",
			type: '"default"',
			description: "TODO",
			default: "default",
			control: { kind: "select", options: ["default"] },
		},
	],
	a11y: {
		keyboard: [],
		notes: [],
	},
	licenseOrigin: {
		source: "beUI",
		url: "https://beui.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 beUI",
	},
	impl: {
		react: {
			entry: "${pascal}",
			files: [
				{ path: "${slug}/${slug}.tsx", type: "registry:ui" },
				{ path: "${slug}/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "${pascal}",
			files: [
				{ path: "${slug}/${slug}.svelte", type: "registry:ui" },
				{ path: "${slug}/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["${slug}"],
});
`;

const reactUsageTemplate = () => `import { ${pascal} } from "@baby-ui/react";

export function Example() {
	return <${pascal} />;
}
`;

const svelteUsageTemplate = () => `<script lang="ts">
import { ${pascal} } from "@baby-ui/svelte";
</script>

<${pascal} />
`;

const reactDemoTemplate = () => `"use client";

import { ${pascal}, type ${pascal}Variant } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ${pascal}Demo({ props }: { props: Props }) {
	return <${pascal} variant={(props.variant as ${pascal}Variant) ?? "default"} />;
}
`;

const svelteDemoTemplate = () => `<script lang="ts">
import { ${pascal}, type ${pascal}Variant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<${pascal} variant={(props.variant as ${pascal}Variant) ?? "default"} />
`;

const docsTemplate = () => `---
title: ${title}
description: "TODO: one sentence describing ${title}."
component: ${slug}
category: ${category}
tags: [${slug}]
---

TODO: write the docs prose for ${title}.
`;

async function main() {
	const reactDir = resolve(REPO_ROOT, `packages/ui-react/src/${slug}`);
	const svelteDir = resolve(REPO_ROOT, `packages/ui-svelte/src/lib/${slug}`);
	if (await exists(resolve(reactDir, `${slug}.tsx`))) {
		console.error(`packages/ui-react/src/${slug}/${slug}.tsx already exists`);
		process.exit(1);
	}

	console.log(`Scaffolding "${slug}" (${pascal}, category: ${category})\n`);

	await write(resolve(reactDir, "variants.ts"), variantsTemplate());
	await write(resolve(reactDir, `${slug}.tsx`), reactComponentTemplate());
	await write(resolve(svelteDir, "variants.ts"), variantsTemplate());
	await write(resolve(svelteDir, `${slug}.svelte`), svelteComponentTemplate());
	await write(
		resolve(REPO_ROOT, `packages/registry-schema/src/components/${slug}.ts`),
		registrySchemaTemplate(),
	);
	await write(
		resolve(REPO_ROOT, `packages/demos/src/usage/react/${slug}.tsx`),
		reactUsageTemplate(),
	);
	await write(
		resolve(REPO_ROOT, `packages/demos/src/usage/svelte/${slug}.svelte`),
		svelteUsageTemplate(),
	);
	await write(
		resolve(REPO_ROOT, `packages/demos/src/react/${slug}.tsx`),
		reactDemoTemplate(),
	);
	await write(
		resolve(REPO_ROOT, `packages/demos/src/svelte/${slug}-demo.svelte`),
		svelteDemoTemplate(),
	);
	await write(
		resolve(REPO_ROOT, `apps/site/src/docs/components/${slug}.md`),
		docsTemplate(),
	);

	await patch("packages/ui-react/src/index.ts", (c) =>
		insertByDirGroup(c, slug, [
			`export { ${pascal}, type ${pascal}Props } from "./${slug}/${slug}";`,
			`export type { ${pascal}Variant } from "./${slug}/variants";`,
		]),
	);
	await patch("packages/ui-svelte/src/lib/index.ts", (c) =>
		insertByDirGroup(c, slug, [
			`export { default as ${pascal} } from "./${slug}/${slug}.svelte";`,
			`export type { ${pascal}Variant } from "./${slug}/variants";`,
		]),
	);

	await patch("packages/registry-schema/src/components/index.ts", (c) => {
		const withImport = insertAlphaImport(
			c,
			slug,
			`import { ${camel} } from "./${slug}";`,
			(line) => line.match(/from ["']\.\/([a-z0-9-]+)["']/)?.[1] ?? null,
		);
		return appendBeforeClose(
			withImport,
			"export const specs: ComponentSpec[] = [",
			`\t${camel},`,
		);
	});

	await patch("packages/demos/src/react/index.tsx", (c) => {
		const lines = c.split("\n");
		lines.splice(
			lastImportLine(lines) + 1,
			0,
			`import { ${pascal}Demo } from "./${slug}";`,
		);
		const withImport = lines.join("\n");
		return appendBeforeClose(
			withImport,
			"export const demos: Record<string, (p: { props: Props }) => React.ReactElement> = {",
			`\t"${slug}": ${pascal}Demo,`,
		);
	});

	await patch("packages/demos/src/svelte/index.ts", (c) => {
		const withImport = insertAlphaImport(
			c,
			`${pascal}Demo`,
			`import ${pascal}Demo from "./${slug}-demo.svelte";`,
			(line) => line.match(/^import (\w+) from/)?.[1] ?? null,
		);
		return appendBeforeClose(
			withImport,
			"export const demos: Record<string, DemoComponent> = {",
			`\t"${slug}": as(${pascal}Demo),`,
		);
	});

	console.log(`
Scaffolded "${slug}". This is a minimal starting point (a div with one "default" variant) —
you still need to:
  - Design the real markup/primitive (Base UI for React, bits-ui for Svelte, per the base-
    components hard rule) and variant set in both variants.ts files.
  - Write real props/a11y/motion notes in registry-schema/src/components/${slug}.ts.
  - Build a real demo (both ports) and usage snippet (both ports).
  - Write the docs prose in apps/site/src/docs/components/${slug}.md.
  - Reposition the new specs/demos entries into the right category grouping if it matters
    for nav order (they were appended at the end for now).
  - Run the gate suite: node scripts/check-comments.mjs --all, biome check --write .,
    tsc --noEmit (ui-react), svelte-check (ui-svelte/demos/site), pnpm turbo check.
`);
}

await main();
