// One-off local generator for the README cover: no Vite/SvelteKit dependency, so it
// runs standalone with `node scripts/generate-cover.mjs`. Re-run whenever the pitch changes.
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";

const css = `
	* { box-sizing: border-box; margin: 0; padding: 0; }
	.root {
		position: relative;
		width: 1280px;
		height: 640px;
		overflow: hidden;
		background-color: #ffffff;
		font-family: Inter;
	}
	.headline {
		position: absolute;
		top: 96px;
		left: 88px;
		width: 900px;
		color: #0a0a0a;
		font-size: 66px;
		font-weight: 700;
		line-height: 1.1;
		letter-spacing: -0.02em;
	}
	.caption {
		position: absolute;
		top: 348px;
		left: 88px;
		color: rgba(10, 10, 10, 0.5);
		font-size: 24px;
	}
	.watermark {
		position: absolute;
		bottom: -70px;
		left: 88px;
		color: rgba(10, 10, 10, 0.028);
		font-size: 260px;
		font-weight: 700;
		letter-spacing: -0.03em;
		white-space: nowrap;
	}
`;

const html = `
	<div class="root">
		<div class="headline">Animated, accessible components for React and Svelte.</div>
		<div class="caption">Copy-paste, one token layer, zero runtime dependency.</div>
		<div class="watermark">BABY UI</div>
	</div>
`;

const fonts = await googleFonts({ families: [{ name: "Inter", weight: [400, 700] }] });

const png = await render(html, { width: 1280, height: 640, css, fonts });

const outPath = resolve(import.meta.dirname, "../.github/assets/cover.png");
await writeFile(outPath, png);
console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(1)} KB)`);
