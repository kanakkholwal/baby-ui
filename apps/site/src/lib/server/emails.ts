export type EmailRender = { html: string; text: string; bytes: number };
// Written by `pnpm emails`: both ports rendered at build and gated for parity.
export type EmailRenders = { slug: string; react: EmailRender; svelte: EmailRender };

const renders = {
	...import.meta.glob<EmailRenders>("../generated/emails/*.json", { import: "default" }),
	// Bundled always; a hidden Pro spec has no page or preview, so its render is never reached.
	...import.meta.glob<EmailRenders>("../generated/emails-pro/*.json", {
		import: "default",
	}),
};

// The kit has no layout of its own, so it previews the welcome email built from it.
const PREVIEW_OF: Record<string, string> = { "email-kit": "email-welcome" };

/** The build-time render a spec previews, or null when it has none. */
export async function emailRender(slug: string): Promise<EmailRenders | null> {
	const source = PREVIEW_OF[slug] ?? slug;
	const load =
		renders[`../generated/emails/${source}.json`] ??
		renders[`../generated/emails-pro/${source}.json`];
	return (await load?.()) ?? null;
}
