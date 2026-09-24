import type { Framework } from "@baby-ui/registry-schema";
import { highlight, langFor } from "$lib/highlight";
import { componentCss, sourceFiles } from "$lib/registry-items";
import type { InstallSource } from "$lib/source";

/** Highlighted files for manual install; served as JSON so pages only pay for it on demand. */
export async function installSource(
	slug: string,
	framework: Framework,
): Promise<InstallSource> {
	const files = await Promise.all(
		sourceFiles(slug, framework).map(async (file) => {
			const tsLang = langFor(file.path);
			const jsLang = file.jsPath ? langFor(file.jsPath) : tsLang;
			return {
				path: file.path,
				jsPath: file.jsPath,
				ts: { code: file.ts, lang: tsLang, html: await highlight(file.ts, tsLang) },
				js: file.js
					? { code: file.js, lang: jsLang, html: await highlight(file.js, jsLang) }
					: null,
			};
		}),
	);
	const css = componentCss(slug, framework);
	return { files, css: css ? { code: css, html: await highlight(css, "css") } : null };
}
