<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import { Spinner } from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";

let { count }: { count: number } = $props();

const HEADLINE = ["Animated components,", "ready to ship."];

// Four columns of real, live components (Aceternity-style scrolling wall), each card an
// actual mounted demo, not a screenshot.
const COLUMNS = [
	{
		items: ["badge", "progress", "toggle", "alert", "gauge"],
		duration: 16,
		direction: "normal" as const,
		offset: false,
		z: 30,
	},
	{
		items: ["switch", "slider", "checkbox", "breadcrumb", "spinner"],
		duration: 22,
		direction: "reverse" as const,
		offset: true,
		z: -60,
	},
	{
		items: ["avatar", "radio-group", "skeleton", "shortcut", "typography"],
		duration: 18,
		direction: "normal" as const,
		offset: false,
		z: 55,
	},
	{
		items: ["tooltip", "pagination", "collapsible", "label", "textarea"],
		duration: 24,
		direction: "reverse" as const,
		offset: true,
		z: -25,
	},
].map((column) => ({
	...column,
	items: column.items.map((slug) => ({ slug, load: demos[slug] })),
}));

function label(slug: string) {
	return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
</script>

<div class="relative isolate lg:flex lg:min-h-[36rem] lg:items-center">
	<div
		class="collage-viewport pointer-events-none absolute inset-y-0 -right-4 hidden overflow-hidden lg:block lg:w-[48vw]"
		aria-hidden="true"
	>
		<div class="collage absolute inset-0 grid grid-cols-4 gap-3">
			{#each COLUMNS as column, i (i)}
				<div
					class="overflow-hidden {column.offset ? 'mt-12' : ''}"
					style:transform="translateZ({column.z}px)"
				>
					<div
						class="marquee-col flex flex-col gap-3"
						style:animation-duration="{column.duration}s"
						style:animation-direction={column.direction}
					>
						{#each [0, 1] as half (half)}
							{#each column.items as item (item.slug + half)}
								<div class="rounded-2xl border border-border bg-background p-1 shadow-lg">
									<div class="rounded-[15px] bg-card px-3 pt-2.5 pb-3">
										<p class="mb-2 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
											{label(item.slug)}
										</p>
										<div class="grid min-h-16 place-items-center overflow-hidden">
											{#if item.load}
												{#await item.load()}
													<Spinner size="sm" class="text-muted-foreground" />
												{:then mod}
													{const Demo = mod.default}
													<div class="pointer-events-none scale-[0.55]">
														<Demo />
													</div>
												{/await}
											{/if}
										</div>
									</div>
								</div>
							{/each}
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div class="mx-auto w-full max-w-7xl">
		<div class="text-center lg:max-w-xl lg:text-left">
			<!-- Sivir's inset frame on a pill: a rim in bg-background around a bg-card chip, same
			     recipe as the collage cards and Card's `variant="framed"`. -->
			<a
				href="/components"
				class="reveal group mb-7 inline-flex min-h-9 items-center gap-1 rounded-full border border-border bg-background p-1 font-medium text-foreground text-xs transition-colors hover:border-ring"
			>
				<span class="inline-flex min-h-7 items-center gap-2 rounded-full bg-card px-2.5">
					<span class="size-1.5 rounded-full bg-primary"></span>
					{count} components · React 19 + Svelte 5
					<IconArrowUpRight
						size={13}
						stroke={1.7}
						class="text-muted-foreground transition-[transform,scale,translate] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
					/>
				</span>
			</a>

			<h1
				class="mx-auto font-heading font-semibold text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:mx-0"
			>
				{#each HEADLINE as line, lineIndex (line)}
					<span class="block">
						{#each line.split(" ") as word, wordIndex (word)}
							<span
								class="reveal inline-block"
								style:animation-delay="{120 + (lineIndex * 2 + wordIndex) * 90}ms"
							>
								{word}&nbsp;
							</span>
						{/each}
					</span>
				{/each}
			</h1>

			<p
				class="reveal mx-auto mt-6 max-w-md text-pretty text-base text-muted-foreground leading-7 lg:mx-0"
				style:animation-delay="500ms"
			>
				Copy-paste, accessible components for React and Svelte. Built from one spec and
				one token layer, with zero runtime dependency.
			</p>

			<div
				class="reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
				style:animation-delay="650ms"
			>
				<a
					href="/components"
					class="group inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 font-medium text-primary-foreground text-sm transition-[transform,scale,translate] duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
				>
					Browse components
					<IconArrowRight size={16} stroke={1.7} class="transition-[transform,scale,translate] group-hover:translate-x-0.5" />
				</a>
				<a
					href="/docs"
					class="group inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background px-4 font-medium text-foreground text-sm transition-colors hover:bg-card"
				>
					Getting started
				</a>
			</div>
		</div>
	</div>
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(0.4em);
		animation: reveal 620ms var(--ease-out) forwards;
	}

	@keyframes reveal {
		to {
			opacity: 1;
			transform: none;
		}
	}

	.collage-viewport {
		perspective: 1400px;
	}

	.collage {
		transform-style: preserve-3d;
		transform: rotateY(-10deg);
		transform-origin: right center;
		mask-image:
			linear-gradient(to right, transparent, black 16%),
			linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
		mask-composite: intersect;
	}

	.marquee-col {
		animation-name: marquee-y;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
	}

	@keyframes marquee-y {
		to {
			transform: translateY(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			animation-duration: 1ms;
			transform: none;
		}

		.marquee-col {
			animation: none;
		}
	}
</style>
