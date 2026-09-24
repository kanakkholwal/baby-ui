<script lang="ts">
import { Button } from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import ShowcaseDots from "./showcase-dots.svelte";
import ShowcasePanel from "./showcase-panel.svelte";

type Cell = { slug: string; span: 5 | 7 | 12; class?: string };

const ROWS: Cell[][] = [
	[
		{ slug: "dia-text", span: 7, class: "md:min-h-70" },
		{ slug: "rolling-digits", span: 5, class: "md:min-h-70" },
	],
	[
		{ slug: "area-chart", span: 7, class: "min-h-85 md:min-h-90" },
		{ slug: "message", span: 5, class: "min-h-85 md:min-h-100" },
	],
	[
		{ slug: "reasoning", span: 7, class: "min-h-85 md:min-h-90" },
		{ slug: "thinking-state", span: 5, class: "min-h-85 md:min-h-95" },
	],
	[
		{ slug: "bar-chart", span: 7, class: "min-h-85 md:min-h-95" },
		{ slug: "streaming-text", span: 5, class: "md:min-h-95" },
	],
	[{ slug: "week-calendar", span: 12, class: "md:min-h-80" }],
];

const weightsOf = (row: Cell[]) => row.map((c) => c.span);
const RULE = "absolute block bg-muted-foreground/40";
const HATCH =
	"absolute block size-6 bg-[repeating-linear-gradient(45deg,color-mix(in_oklch,var(--muted-foreground)_40%,transparent)_0,color-mix(in_oklch,var(--muted-foreground)_40%,transparent)_1px,transparent_0,transparent_50%)] bg-size-[5px_5px] opacity-80";
</script>

<section aria-labelledby="home-showcase-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-showcase-heading"
		class="font-normal text-[clamp(1.1rem,3.4vw,1.85rem)] text-foreground tracking-[-0.05em] md:whitespace-nowrap"
	>
		Every component, live and ready to explore.
	</h2>

	<div class="relative mt-8 flex w-full flex-col border-border border-t border-l sm:mt-10">
		{#each ROWS as row, r (r)}
			<div class="relative w-full">
				<div class="grid w-full grid-cols-1 md:grid-cols-12">
					{#each row as cell (cell.slug)}
						<ShowcasePanel slug={cell.slug} span={cell.span} class={cell.class} />
					{/each}
				</div>
				<ShowcaseDots weights={weightsOf(row)} class="hidden md:block" />
			</div>
		{/each}

		<div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 hidden md:block">
			<span class="{RULE} -top-8 left-0 h-10 w-px"></span>
			<span class="{RULE} top-0 -left-8 h-px w-10"></span>
			<span class="{RULE} -top-8 right-0 h-10 w-px"></span>
			<span class="{RULE} top-0 -right-8 h-px w-10"></span>
			<span class="{RULE} -bottom-8 left-0 h-10 w-px"></span>
			<span class="{RULE} bottom-0 -left-8 h-px w-10"></span>
			<span class="{RULE} right-0 -bottom-8 h-10 w-px"></span>
			<span class="{RULE} -right-8 bottom-0 h-px w-10"></span>
			<span class="{HATCH} -top-8 -right-8"></span>
			<span class="{HATCH} -bottom-8 -left-8"></span>
		</div>
	</div>

	<div class="mt-12 flex justify-center">
		<Button href="/components" variant="outline" size="lg" class="group">
			Browse all components
			<IconArrowRight
				stroke={1.7}
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</Button>
	</div>
</section>
