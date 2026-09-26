const CODE_SVELTE = [
	'import { Dialog } from "$lib/ui/dialog";',
	"",
	"// grows from the trigger edge",
	"<Dialog>",
	"  <DialogTrigger>Open</DialogTrigger>",
	"  <DialogContent>",
	"    <DialogTitle>Invite</DialogTitle>",
	"  </DialogContent>",
];

export const OG_DOCS_SNIPPETS = {
	svelte: {
		code: CODE_SVELTE,
		filename: "dialog.svelte",
		shell: [
			"$ pnpm dlx shadcn-svelte add @baby-ui/dialog",
			"resolving registry item",
			"wrote lib/components/ui/dialog",
			"",
			"$ pnpm dev",
			"ready on localhost:5173",
		],
	},
	react: {
		code: CODE_SVELTE.map((line, i) =>
			i === 0 ? 'import { Dialog } from "@/ui/dialog";' : line,
		),
		filename: "dialog.tsx",
		shell: [
			"$ pnpm dlx shadcn add @baby-ui/dialog",
			"resolving registry item",
			"wrote components/ui/dialog",
			"",
			"$ pnpm dev",
			"ready on localhost:5173",
		],
	},
};

export const OG_BLOG_POST = {
	author: { name: "Kanak Kholwal", avatar: "https://i.pravatar.cc/160?img=12" },
	date: "Sep 26, 2026",
	readingTime: "6 min read",
};

export const OG_DOCS_PAGE = {
	section: ["Docs", "Components", "Overlays"],
	snippet: OG_DOCS_SNIPPETS.svelte.code,
	filename: OG_DOCS_SNIPPETS.svelte.filename,
};

export const OG_CHANGELOG = {
	highlights: [
		{ kind: "added" as const, text: "Eleven d3 charts with full keyboard navigation" },
		{ kind: "changed" as const, text: "Dialogs grow from the trigger edge" },
		{ kind: "fixed" as const, text: "Sheet backdrop stacking on sibling panels" },
	],
};

export const OG_GITHUB_REPO = {
	avatar: "https://i.pravatar.cc/120?img=15",
	stars: "12.4k",
	forks: "684",
	issues: "23",
	contributors: [3, 5, 8, 12, 16].map((n) => `https://i.pravatar.cc/120?img=${n}`),
	contributorCount: "+128",
};

export const OG_AUTHOR_PROFILE = {
	avatar: "https://i.pravatar.cc/320?img=47",
	stats: [
		{ value: "128", label: "Posts" },
		{ value: "12.4k", label: "Followers" },
		{ value: "4.2M", label: "Reads" },
	],
};

/** Data props the OG demos and `/api/og/<slug>` share; spec defaults cover the controls. */
/** Sample props that follow a control value, so the PNG endpoint matches the demo. */
export const OG_SAMPLE_BY_PROPS: Record<
	string,
	(props: Record<string, unknown>) => Record<string, unknown>
> = {
	"og-docs-page": (props) =>
		props.motif === "terminal"
			? { snippet: OG_DOCS_SNIPPETS.svelte.shell, filename: "zsh" }
			: {},
};

export const OG_SAMPLES: Record<string, Record<string, unknown>> = {
	"og-author-profile": OG_AUTHOR_PROFILE,
	"og-blog-post": OG_BLOG_POST,
	"og-changelog": OG_CHANGELOG,
	"og-docs-page": OG_DOCS_PAGE,
	"og-github-repo": OG_GITHUB_REPO,
};
