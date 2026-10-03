import { previewProps } from "@baby-ui/demos/preview-props";
import { flushSync, mount, unmount } from "svelte";
import { loadComponent } from "#lib/component-module.js";
import { proOgSample } from "#lib/pro.js";

/** A template's HTML for given controls: mounted off-screen, read, then torn down. The props
 * match the old server render: sample, then values derived from controls, then the controls. */
export async function ogMarkup(
	slug: string,
	entry: string,
	controls: Record<string, unknown>,
): Promise<string> {
	const Template = await loadComponent(slug, entry);
	if (!Template) throw new Error(`No OG template named "${slug}"`);
	const props = previewProps(slug, controls, await proOgSample(slug));
	const target = document.createElement("div");
	const app = mount(Template, { target, props });
	flushSync();
	const html = target.innerHTML;
	void unmount(app);
	return html;
}
