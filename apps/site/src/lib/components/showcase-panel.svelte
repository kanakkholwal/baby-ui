<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import { Button, ShowcasePanel, type ShowcaseSpan, Spinner } from "@baby-ui/svelte";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import type { CardItem } from "$lib/registry";

let {
	slug,
	item,
	span,
	class: classProp = "",
	props: extraProps = {},
}: {
	slug: string;
	/** Name, link and default props, from the page's server load. */
	item?: CardItem;
	span: ShowcaseSpan;
	class?: string;
	props?: Record<string, unknown>;
} = $props();

const href = $derived(item?.href ?? "/components");
let frame = $state<HTMLElement>();
let near = $state(false);

// Below the fold on the home page: load and start each demo only as it scrolls close.
$effect(() => {
	if (!frame || near) return;
	const io = new IntersectionObserver(
		(entries) => {
			if (entries.some((e) => e.isIntersecting)) near = true;
		},
		{ rootMargin: "400px 0px" },
	);
	io.observe(frame);
	return () => io.disconnect();
});

const demoPromise = $derived(near ? demos[slug]?.() : undefined);
let run = $state(0);
const demoProps = $derived({ ...item?.defaults, ...extraProps });
</script>

<ShowcasePanel {span} class={classProp}>
	{#snippet actions()}
		<Button
			size="icon-sm"
			variant="outline"
			aria-label="Replay {item?.name ?? slug}"
			onclick={() => run++}
		>
			<IconRefresh stroke={1.7} />
		</Button>
		<Button {href} size="sm" variant="outline" tabindex={-1} aria-hidden="true">{item?.name ?? slug}</Button>
	{/snippet}
	<div bind:this={frame} class="flex h-full max-h-full w-full min-w-0 items-center justify-center">
		{#if demoPromise}
			{#await demoPromise}
				<Spinner size="sm" label="Loading preview" class="text-muted-foreground" />
			{:then mod}
				{@const Demo = mod.default}
				{#key run}
					<Demo props={demoProps} />
				{/key}
			{/await}
		{/if}
	</div>
	<a {href} class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-background focus:px-2 focus:py-1 focus:text-xs focus:ring-2 focus:ring-ring">
		Open {item?.name ?? slug} docs
	</a>
</ShowcasePanel>
