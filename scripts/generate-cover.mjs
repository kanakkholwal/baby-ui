// One-off local generator for the README cover: no Vite/SvelteKit dependency, so it
// runs standalone with `node scripts/generate-cover.mjs`. Re-run whenever the pitch changes.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { render } from "takumi-js";
import { googleFonts } from "takumi-js/helpers";

const root = resolve(import.meta.dirname, "..");
const specs = (
	await readdir(resolve(root, "packages/registry-schema/src/components"))
).filter((f) => f.endsWith(".ts") && f !== "index.ts");
const logo = (await readFile(resolve(root, "apps/site/static/logo.svg"), "utf8")).replace(
	"#151515",
	"#0a0a0a",
);
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`;

const BARS = [38, 52, 44, 66, 58, 74, 62, 86, 70, 92, 80, 100];

const css = `
	* { box-sizing: border-box; margin: 0; padding: 0; }
	.root {
		position: relative; display: flex; width: 1280px; height: 640px; overflow: hidden;
		background-color: #fafafa; font-family: Inter; color: #0a0a0a;
		background-image: radial-gradient(circle, rgba(10,10,10,0.09) 1px, transparent 1px);
		background-size: 22px 22px;
	}
	.fade {
		position: absolute; top: 0; left: 0; width: 664px; height: 640px;
		background-image: linear-gradient(90deg, #fafafa 70%, rgba(250,250,250,0));
	}
	.copy { position: absolute; top: 72px; left: 80px; width: 560px; display: flex; flex-direction: column; }
	.brand { display: flex; align-items: center; gap: 12px; font-size: 26px; font-weight: 700; letter-spacing: -0.02em; }
	.brand img { width: 36px; height: 36px; }
	.headline { margin-top: 44px; font-size: 54px; font-weight: 700; line-height: 1.08; letter-spacing: -0.035em; }
	.caption { margin-top: 20px; font-size: 22px; line-height: 1.45; color: rgba(10,10,10,0.55); }
	.chips { margin-top: 36px; display: flex; gap: 10px; }
	.chip {
		display: flex; align-items: center; height: 38px; padding: 0 16px; border-radius: 999px;
		border: 1px solid rgba(10,10,10,0.12); background-color: #ffffff; font-size: 16px; font-weight: 500;
	}
	.chip b { font-weight: 700; margin-right: 6px; }

	.stage { position: absolute; top: 64px; left: 664px; width: 576px; display: flex; flex-direction: column; gap: 16px; }
	.row { display: flex; gap: 16px; }
	.card {
		display: flex; flex-direction: column; padding: 20px; border-radius: 18px; background-color: #ffffff;
		border: 1px solid rgba(10,10,10,0.1); box-shadow: 0 12px 32px -12px rgba(10,10,10,0.18);
	}
	.label { font-size: 13px; font-weight: 500; color: rgba(10,10,10,0.5); }
	.big { margin-top: 6px; font-size: 32px; font-weight: 700; letter-spacing: -0.03em; }

	.search { display: flex; align-items: center; justify-content: space-between; height: 44px; padding: 0 14px;
		border-radius: 12px; border: 1px solid rgba(10,10,10,0.12); font-size: 16px; color: rgba(10,10,10,0.45); }
	.kbd { display: flex; white-space: nowrap; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(10,10,10,0.14);
		font-size: 13px; font-weight: 600; color: rgba(10,10,10,0.6); }
	.hit { display: flex; flex-direction: column; margin-top: 8px; padding: 10px 12px; border-radius: 10px; }
	.hit.on { background-color: rgba(10,10,10,0.05); }
	.hit-title { font-size: 15px; font-weight: 600; }
	.hit-sub { margin-top: 2px; font-size: 13px; color: rgba(10,10,10,0.5); }

	.buttons { display: flex; gap: 10px; align-items: center; }
	.btn { display: flex; align-items: center; height: 42px; padding: 0 18px; border-radius: 12px; font-size: 15px; font-weight: 600; }
	.btn.primary { background-color: #0a0a0a; color: #ffffff; }
	.btn.outline { border: 1px solid rgba(10,10,10,0.14); }
	.switch { display: flex; align-items: center; width: 46px; height: 26px; padding: 3px; border-radius: 999px;
		background-color: #16a34a; justify-content: flex-end; }
	.knob { width: 20px; height: 20px; border-radius: 999px; background-color: #ffffff; }
	.setting { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; font-size: 15px; font-weight: 500; }
	.badge { display: flex; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 600;
		background-color: rgba(22,163,74,0.12); color: #15803d; }

	.bars { display: flex; align-items: flex-end; gap: 7px; height: 96px; margin-top: 16px; }
	.bar { width: 15px; border-radius: 5px 5px 2px 2px; background-image: linear-gradient(180deg, #0a0a0a, rgba(10,10,10,0.55)); }
	.track { display: flex; height: 8px; margin-top: 16px; border-radius: 999px; background-color: rgba(10,10,10,0.08); }
	.fill { width: 100%; height: 8px; border-radius: 999px; background-color: #0a0a0a; }

	.term { display: flex; align-items: center; gap: 14px; height: 60px; padding: 0 22px; border-radius: 16px;
		background-color: #0a0a0a; color: #fafafa; font-family: "JetBrains Mono"; font-size: 17px;
		box-shadow: 0 12px 32px -12px rgba(10,10,10,0.35); }
	.dim { color: rgba(250,250,250,0.45); }
	.pkg { color: #86efac; }
`;

const html = `
	<div class="root">
		<div class="stage">
			<div class="row">
				<div class="card" style="width: 280px;">
					<div class="search"><span>Search…</span><span class="kbd">Ctrl K</span></div>
					<div class="hit on"><span class="hit-title">Wheel Carousel</span><span class="hit-sub">Advanced · rotary photo picker</span></div>
					<div class="hit"><span class="hit-title">Text Cascade</span><span class="hit-sub">Text · per-letter roll</span></div>
				</div>
				<div class="card" style="width: 280px;">
					<div class="buttons"><span class="btn primary">Get started</span><span class="btn outline">Docs</span></div>
					<div class="setting"><span>Reduced motion</span><span class="switch"><span class="knob"></span></span></div>
					<div class="setting"><span>Status</span><span class="badge">Live</span></div>
				</div>
			</div>
			<div class="row">
				<div class="card" style="width: 310px;">
					<span class="label">Revenue</span>
					<span class="big">$48,210</span>
					<div class="bars">${BARS.map((h) => `<span class="bar" style="height: ${h}%;"></span>`).join("")}</div>
				</div>
				<div class="card" style="width: 250px;">
					<span class="label">Ports in sync</span>
					<span class="big">${specs.length}/${specs.length}</span>
					<div class="track"><span class="fill"></span></div>
					<div class="setting"><span>React</span><span class="badge">Ready</span></div>
					<div class="setting" style="margin-top: 10px;"><span>Svelte</span><span class="badge">Ready</span></div>
				</div>
			</div>
			<div class="term"><span class="dim">$</span><span>npx shadcn@latest add <span class="pkg">@baby-ui/wheel-carousel</span></span></div>
		</div>
		<div class="fade"></div>
		<div class="copy">
			<div class="brand"><img src="${logoSrc}" />Baby UI</div>
			<div class="headline">Animated, accessible components for React and Svelte.</div>
			<div class="caption">Copy-paste through the shadcn CLI. One token layer, every component in both frameworks.</div>
			<div class="chips">
				<span class="chip"><b>${specs.length}</b>components</span>
				<span class="chip">React + Svelte</span>
				<span class="chip">Apache-2.0</span>
			</div>
		</div>
	</div>
`;

const fonts = await googleFonts({
	families: [
		{ name: "Inter", weight: [400, 500, 600, 700] },
		{ name: "JetBrains Mono", weight: [500] },
	],
});

const png = await render(html, { width: 1280, height: 640, css, fonts });

const outPath = resolve(root, ".github/assets/cover.png");
await writeFile(outPath, png);
console.log(`Wrote ${outPath} (${(png.length / 1024).toFixed(1)} KB)`);
