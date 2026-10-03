<script lang="ts">
import { cn } from "../lib/cn";
import {
	OG_LANDING_AXIS,
	OG_LANDING_HANDLES,
	OG_LANDING_ROW,
	OG_LANDING_SHOWCASE,
	OG_LANDING_SPOTLIGHT,
	OG_LANDING_STREAKS,
	type OgLandingMode,
	type OgLandingTone,
	type OgLandingVariant,
	type OgLandingWordStep,
	ogLanding,
	ogLandingWord,
} from "./variants";

let {
	title,
	site,
	logo,
	description,
	cta,
	images,
	words,
	active,
	mode = "light",
	tone = "neutral",
	variant = "streaks",
	class: className,
}: {
	/** Headline; the lead word in `picker`. */
	title: string;
	/** Product name beside the logo. */
	site?: string;
	logo?: string;
	description?: string;
	/** Button label under the lead word in `picker`. */
	cta?: string;
	/** Screenshots for `showcase` and `screen`, portraits for `spotlight`; they cycle. */
	images?: string[];
	/** The vertical word list in `picker`. */
	words?: string[];
	/** Index of the selected word in `picker`; defaults to the middle one. */
	active?: number;
	mode?: OgLandingMode;
	tone?: OgLandingTone;
	variant?: OgLandingVariant;
	class?: string;
} = $props();

const STEPS: OgLandingWordStep[] = [0, 1, 2, 3];
const s = $derived(ogLanding({ mode, tone, variant }));
const pics = $derived(images?.filter(Boolean) ?? []);
const list = $derived(words?.filter(Boolean) ?? []);
const picked = $derived(
	Math.min(Math.max(active ?? Math.floor(list.length / 2), 0), list.length - 1),
);
const box = (b: { left: number; top: number; width: number; height: number }) =>
	`left:${b.left}px;top:${b.top}px;width:${b.width}px;height:${b.height}px`;
</script>

{#snippet brand()}
	{#if logo || site}
		<div class={s.brand()}>
			{#if logo}<img src={logo} alt="" class={s.logo()} />{/if}
			{#if site}<span class={s.site()}>{site}</span>{/if}
		</div>
	{/if}
{/snippet}

{#snippet headline()}
	<h1 class={s.title()}>
		{#if variant === "streaks"}
			{title.replace(/\.$/, "")}<span class={s.mark()}>.</span>
		{:else}
			{title}
		{/if}
	</h1>
{/snippet}

<div data-slot="og-landing" class={cn(s.root(), className)}>
	{#if variant === "streaks"}
		{#each OG_LANDING_STREAKS as line (line.left)}
			<div
				class={line.accent ? s.streakAccent() : s.streak()}
				style="left:{line.left}px;top:700px;opacity:{line.opacity}"
			></div>
		{/each}
		<div class={s.spark()}></div>
		<div class={s.sparkCore()}></div>
	{:else if variant === "showcase" && pics.length}
		{#each OG_LANDING_SHOWCASE as col, c (col.left)}
			<div class={s.column()} style="left:{col.left}px;top:{col.top}px">
				{#each col.heights as height, i (`${c}-${height}-${i}`)}
					<div class={s.frame()} style="height:{height}px">
						<img src={pics[(c * 3 + i) % pics.length]} alt="" class={s.shot()} />
					</div>
				{/each}
			</div>
		{/each}
	{:else if variant === "screen"}
		<div class={s.glow()}></div>
		{#if pics.length}<img src={pics[0]} alt="" class={s.screen()} />{/if}
	{:else if variant === "spotlight"}
		<div class={s.grid()}></div>
		{#if pics.length}
			{#each OG_LANDING_SPOTLIGHT as tile, i (`${tile.left}-${tile.top}`)}
				<img src={pics[i % pics.length]} alt="" class={s.face()} style={box(tile)} />
			{/each}
		{/if}
	{/if}

	{#if variant === "picker"}
		<div class={s.wash()}></div>
		{#if list.length}
			<div
				class={s.words()}
				style="top:{OG_LANDING_AXIS - picked * OG_LANDING_ROW - OG_LANDING_ROW / 2}px"
			>
				{#each list as word, i (`${i}-${word}`)}
					<div class={ogLandingWord({ step: STEPS[Math.min(Math.abs(i - picked), 3)] })}>
						{#if i === picked}
							<div class={s.box()}>
								{#each OG_LANDING_HANDLES as [x, y] (`${x}-${y}`)}
									<div class={s.handle()} style="left:{x}%;top:{y}%"></div>
								{/each}
							</div>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linejoin="round"
								class={cn(s.cursor(), "text-foreground")}
								aria-hidden="true"
							>
								<path d="M4 3l16 7.5-7 1.8-2.2 7.2z" />
							</svg>
						{/if}
						<span class="relative">{word}</span>
					</div>
				{/each}
			</div>
		{/if}
		{@render brand()}
		{@render headline()}
		{#if cta}<span class={s.cta()}>{cta}</span>{/if}
	{:else if variant === "spotlight"}
		{@render headline()}
		{@render brand()}
	{:else}
		{@render brand()}
		{@render headline()}
		{#if description}<p class={s.description()}>{description}</p>{/if}
	{/if}
</div>
