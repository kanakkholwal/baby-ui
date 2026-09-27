import { describe, expect, test } from "bun:test";
import type { Framework } from "@baby-ui/registry-schema";
import { getSpec, specs } from "@baby-ui/registry-schema/components";
import { buildItem } from "./build";
import { installLayout } from "./layout";

const layouts = {
	react: installLayout("react", specs),
	svelte: installLayout("svelte", specs),
};

async function built(slug: string, framework: Framework) {
	const spec = getSpec(slug);
	if (!spec) throw new Error(`no spec ${slug}`);
	const item = await buildItem(spec, framework, layouts[framework]);
	if (!item) throw new Error(`no ${framework} port for ${slug}`);
	return item;
}

const imports = (content: string) =>
	[...content.matchAll(/from\s+"([^"]+)"/g)].map((m) => m[1] ?? "");

describe("install targets follow the category folder", () => {
	test.each([
		["button", "react", "components/ui/button/button.tsx"],
		["button", "svelte", "button/button.svelte"],
		["agent-screen", "react", "components/agents/agent-screen/agent-screen.tsx"],
		["agent-screen", "svelte", "../agents/agent-screen/agent-screen.svelte"],
		["og-blog-post", "svelte", "../og/og-blog-post/og-blog-post.svelte"],
		["email-kit", "react", "components/emails/ui/email-kit/email-kit.tsx"],
		["email-welcome", "react", "components/emails/email-welcome/email-welcome.tsx"],
	] as const)("%s (%s) lands at %s", async (slug, framework, target) => {
		const item = await built(slug, framework);
		expect(item.files.map((f) => f.target)).toContain(target);
	});

	test("lib files go to the lib folder, never a category folder", async () => {
		const item = await built("button", "react");
		expect(item.files.map((f) => f.target)).toContain("lib/cn.ts");
		const svelte = await built("button", "svelte");
		expect(svelte.files.map((f) => f.target)).toContain("cn.ts");
	});
});

describe("shipped imports point at the other item's folder", () => {
	test("an agents item imports Button from components/ui", async () => {
		const item = await built("agent-screen", "react");
		const all = item.files.flatMap((f) => imports(f.content));
		expect(all).toContain("@/components/ui/button/button");
		expect(all.some((i) => i.startsWith("../"))).toBe(false);
	});

	test("an email template imports the kit from components/emails/ui", async () => {
		const react = await built("email-welcome", "react");
		expect(react.files.flatMap((f) => imports(f.content))).toContain(
			"@/components/emails/ui/email-kit/email-kit",
		);
		const svelte = await built("email-welcome", "svelte");
		expect(svelte.files.flatMap((f) => imports(f.content))).toContain(
			"$lib/components/emails/ui/email-kit/email-button.svelte",
		);
	});

	test("../lib imports become the lib alias", () => {
		expect(layouts.react.rewriteImports('import { cn } from "../lib/cn";')).toBe(
			'import { cn } from "@/lib/cn";',
		);
		expect(layouts.svelte.rewriteImports('import { cn } from "../lib/cn";')).toBe(
			'import { cn } from "$lib/cn";',
		);
	});

	test("same-folder imports stay relative", () => {
		const source = 'import { button } from "./variants";';
		expect(layouts.react.rewriteImports(source)).toBe(source);
	});
});

describe("paths shown to readers", () => {
	test("usage imports use the installed folder", () => {
		expect(layouts.react.itemImport("og-blog-post")).toBe("@/components/og/og-blog-post");
		expect(layouts.svelte.itemImport("email-kit")).toBe(
			"$lib/components/emails/ui/email-kit",
		);
		expect(layouts.svelte.itemImport("button")).toBe("$lib/components/ui/button");
	});

	test("the Manual view resolves shadcn-svelte's alias-relative targets", () => {
		expect(layouts.svelte.projectPath("../agents/x/x.svelte", "registry:ui")).toBe(
			"src/lib/components/agents/x/x.svelte",
		);
		expect(layouts.svelte.projectPath("cn.ts", "registry:lib")).toBe("src/lib/cn.ts");
		expect(layouts.react.projectPath("components/ui/b/b.tsx", "registry:ui")).toBe(
			"components/ui/b/b.tsx",
		);
	});
});
