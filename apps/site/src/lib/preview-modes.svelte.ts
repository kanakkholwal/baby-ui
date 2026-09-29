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

/** The OG PNG for `url()`: fetched once typing settles; the last image stays up until the
 * next one decodes. A null url pauses fetching. Create during component init. */
export class OgPngPreview {
	shown = $state("");
	pending = $state(false);

	constructor(url: () => string | null) {
		$effect(() => {
			const next = url();
			if (!next || next === this.shown) return;
			let cancelled = false;
			const timer = setTimeout(() => {
				this.pending = true;
				const image = new Image();
				image.onload = image.onerror = () => {
					if (cancelled) return;
					this.pending = false;
					if (image.naturalWidth) this.shown = next;
				};
				image.src = next;
			}, 450);
			return () => {
				cancelled = true;
				clearTimeout(timer);
			};
		});
	}
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
