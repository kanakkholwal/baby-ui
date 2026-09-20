<script lang="ts">
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";

let { count }: { count: number } = $props();

const HEADLINE = ["One spec,", "two frameworks."];
const words = HEADLINE.flatMap((line, i) =>
	line.split(" ").map((word) => ({ word, line: i })),
);
</script>

<div class="mx-auto max-w-7xl text-center">
	<a
		href="/components"
		class="group mb-7 inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-card px-3 font-medium text-foreground text-xs transition-colors hover:border-ring"
	>
		<span class="size-1.5 rounded-full bg-primary"></span>
		{count} components · React 19 + Svelte 5
		<IconArrowUpRight
			size={13}
			stroke={1.7}
			class="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
		/>
	</a>

	<h1
		class="mx-auto font-heading font-semibold text-5xl leading-[0.92] tracking-tight sm:text-6xl md:text-7xl"
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

	<p class="mx-auto mt-6 max-w-md text-pretty text-base text-muted-foreground leading-7">
		Copy-paste components for React and Svelte that share one token layer, so both
		renders match without hand-tuning either.
	</p>

	<div class="mt-8 flex flex-wrap items-center justify-center gap-3">
		<a
			href="/components"
			class="group inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 font-medium text-primary-foreground text-sm transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]"
		>
			Browse components
			<IconArrowRight size={16} stroke={1.7} class="transition-transform group-hover:translate-x-0.5" />
		</a>
		<a
			href="/docs"
			class="group inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-background px-4 font-medium text-foreground text-sm transition-colors hover:bg-card"
		>
			Getting started
		</a>
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

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			animation-duration: 1ms;
			transform: none;
		}
	}
</style>
