<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import { specs } from "@baby-ui/registry-schema/components";
import { Button, ShowcasePanel, type ShowcaseSpan, Spinner } from "@baby-ui/svelte";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import { defaultProps, specHref } from "$lib/registry";

let {
	slug,
	span,
	class: classProp = "",
	props: extraProps = {},
}: {
	slug: string;
	span: ShowcaseSpan;
	class?: string;
	props?: Record<string, unknown>;
} = $props();

const spec = $derived(specs.find((s) => s.slug === slug));
const href = $derived(spec ? specHref(spec) : "/components");
const demoPromise = $derived(demos[slug]?.());
let run = $state(0);
const demoProps = $derived(spec ? { ...defaultProps(spec), ...extraProps } : extraProps);
</script>

<ShowcasePanel {span} class={classProp}>
	{#snippet actions()}
		<Button
			size="icon-sm"
			variant="outline"
			aria-label="Replay {spec?.name ?? slug}"
			onclick={() => run++}
		>
			<IconRefresh stroke={1.7} />
		</Button>
		<Button {href} size="sm" variant="outline" tabindex={-1} aria-hidden="true">{spec?.name ?? slug}</Button>
	{/snippet}
	<div class="flex h-full max-h-full w-full min-w-0 items-center justify-center">
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
		Open {spec?.name ?? slug} docs
	</a>
</ShowcasePanel>
