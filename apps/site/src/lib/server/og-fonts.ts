import interExt from "@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2";
import inter from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2";
import mono from "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2";
import { read } from "$app/server";
import satoshi500 from "../../../../../packages/tokens/fonts/satoshi-500.woff2";
import satoshi700 from "../../../../../packages/tokens/fonts/satoshi-700.woff2";
import satoshi900 from "../../../../../packages/tokens/fonts/satoshi-900.woff2";

// Names must equal the families in the theme tokens; takumi falls back silently on a miss.
const FILES = [
	{ name: "Inter Variable", url: inter },
	{ name: "Inter Variable", url: interExt },
	{ name: "Satoshi", url: satoshi500, weight: 500 },
	{ name: "Satoshi", url: satoshi700, weight: 700 },
	{ name: "Satoshi", url: satoshi900, weight: 900 },
	{ name: "JetBrains Mono Variable", url: mono },
];

let loaded: Promise<{ name: string; data: ArrayBuffer; weight?: number }[]> | undefined;

/** The site's own self-hosted fonts, so a rendered card matches the live preview. */
export function ogFonts() {
	loaded ??= Promise.all(
		FILES.map(async ({ url, ...font }) => ({
			...font,
			data: await read(url).arrayBuffer(),
		})),
	);
	return loaded;
}
