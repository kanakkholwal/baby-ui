import interExt from "@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2";
import inter from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2";
import mono from "@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2";
import serif from "@fontsource-variable/newsreader/files/newsreader-latin-wght-normal.woff2";
import satoshi500 from "../../../../../packages/tokens/fonts/satoshi-500.woff2";
import satoshi700 from "../../../../../packages/tokens/fonts/satoshi-700.woff2";
import satoshi900 from "../../../../../packages/tokens/fonts/satoshi-900.woff2";

/** The site's self-hosted faces for OG renders; names must equal the theme's font families,
 * since takumi falls back silently on a miss. */
export const OG_FONT_FILES: { name: string; url: string; weight?: number }[] = [
	{ name: "Inter Variable", url: inter },
	{ name: "Inter Variable", url: interExt },
	{ name: "Satoshi", url: satoshi500, weight: 500 },
	{ name: "Satoshi", url: satoshi700, weight: 700 },
	{ name: "Satoshi", url: satoshi900, weight: 900 },
	{ name: "JetBrains Mono Variable", url: mono },
	{ name: "Newsreader Variable", url: serif },
];
