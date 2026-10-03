import type { Icon } from "@baby-ui/icons";
import { IconFileText, IconMail, IconPhoto, IconPlayerPlay } from "@baby-ui/icons";
import type { Category, Framework } from "@baby-ui/registry-schema";

/** A preview-toolbar switch; `id` doubles as the analytics action name. */
export type PreviewView = { id: string; label: string; hint: string; icon: Icon };

/** Categories whose preview has more than the live demo; the first view is the default. */
export const PREVIEW_VIEWS: Partial<Record<Category, PreviewView[]>> = {
	"og-images": [
		{
			id: "og_live",
			label: "Live preview",
			hint: "Live card, updates as you type",
			icon: IconPlayerPlay,
		},
		{
			id: "og_png",
			label: "Rendered PNG",
			hint: "The 1200x630 PNG social networks receive",
			icon: IconPhoto,
		},
	],
	emails: [
		{
			id: "email_html",
			label: "HTML email",
			hint: "Rendered HTML, following the site theme",
			icon: IconMail,
		},
		{
			id: "email_text",
			label: "Plain text",
			hint: "The plain-text part sent alongside the HTML",
			icon: IconFileText,
		},
	],
};

type OgPngInput = {
	slug: string;
	entry: string;
	controls: Record<string, unknown>;
	/** The PNG view is open; until then the renderer only warms up. */
	active: boolean;
};

/** The OG PNG, rasterised by takumi's WASM in a worker that warms on idle; renders once
 * typing settles, keeping the last image up meanwhile. Create during component init. */
export class OgPngPreview {
	shown = $state("");
	pending = $state(false);
	error = $state("");

	constructor(input: () => OgPngInput | null) {
		// Safari has no requestIdleCallback; warming is idempotent, so re-runs cost nothing.
		$effect(() => {
			if (!input()) return;
			if (typeof requestIdleCallback === "function") {
				const id = requestIdleCallback(() => void warm(), { timeout: 2000 });
				return () => cancelIdleCallback(id);
			}
			const timer = setTimeout(() => void warm(), 200);
			return () => clearTimeout(timer);
		});
		$effect(() => {
			const next = input();
			if (!next?.active) return;
			const { slug, entry, controls } = next;
			let cancelled = false;
			const timer = setTimeout(async () => {
				this.pending = true;
				try {
					const url = await renderCard(slug, entry, controls);
					if (cancelled) return;
					this.shown = url;
					this.error = "";
				} catch (cause) {
					if (!cancelled)
						this.error = cause instanceof Error ? cause.message : String(cause);
				} finally {
					if (!cancelled) this.pending = false;
				}
			}, 300);
			return () => {
				cancelled = true;
				clearTimeout(timer);
			};
		});
	}
}

// Loaded on first use, so pages without an OG preview never fetch the renderer or the CSS.
async function warm() {
	const { warmOgRenderer } = await import("#lib/og/renderer.js");
	await warmOgRenderer();
}

async function renderCard(
	slug: string,
	entry: string,
	controls: Record<string, unknown>,
) {
	const [{ ogMarkup }, { renderOgPng }, { default: css }] = await Promise.all([
		import("#lib/og/markup.js"),
		import("#lib/og/renderer.js"),
		import("../routes/layout.css?inline"),
	]);
	return renderOgPng(await ogMarkup(slug, entry, controls), css);
}

export type EmailRender = { html: string; text: string; bytes: number };
export type EmailRenders = { slug: string; react: EmailRender; svelte: EmailRender };

type EmailPreviewInput = {
	renders: EmailRenders | null;
	/** Controls differ from the defaults the build-time render used. */
	changed: boolean;
	values: Record<string, unknown>;
	framework: Framework;
};

/** Build-time renders for default controls; changed controls re-render through the Svelte
 * port's live endpoint. Create during component init. */
export class EmailPreview {
	#input: () => EmailPreviewInput;
	#live = $state<EmailRender | null>(null);
	pending = $state(false);
	// Lazy, so it first runs after the constructor has stored #input.
	shown = $derived.by(() => {
		const { renders, framework } = this.#input();
		return this.#live ?? (renders ? renders[framework] : null);
	});

	constructor(input: () => EmailPreviewInput) {
		this.#input = input;
		$effect(() => {
			const { renders, changed, values } = input();
			if (!renders || !changed) {
				this.#live = null;
				return;
			}
			const url = `/api/email/${renders.slug}?props=${encodeURIComponent(JSON.stringify(values))}`;
			const controller = new AbortController();
			const timer = setTimeout(async () => {
				this.pending = true;
				try {
					const res = await fetch(url, { signal: controller.signal });
					if (res.ok) this.#live = await res.json();
				} catch {
					// Aborted by the next keystroke, or offline: keep the last render.
				}
				if (!controller.signal.aborted) this.pending = false;
			}, 350);
			return () => {
				clearTimeout(timer);
				controller.abort();
			};
		});
	}
}
