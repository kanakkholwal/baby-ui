<script lang="ts">
import { demos } from "@baby-ui/demos/svelte";
import { specs } from "@baby-ui/registry-schema/components";
import { Button, Spinner } from "@baby-ui/svelte";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import { defaultProps, specHref } from "$lib/registry";
import ShowcaseDots from "./showcase-dots.svelte";

let {
	slug,
	span,
	class: classProp = "",
	props: extraProps = {},
}: {
	slug: string;
	span: 5 | 7 | 12;
	class?: string;
	props?: Record<string, unknown>;
} = $props();

const SPAN = { 5: "md:col-span-5", 7: "md:col-span-7", 12: "md:col-span-12" } as const;

const spec = $derived(specs.find((s) => s.slug === slug));
const href = $derived(spec ? specHref(spec) : "/components");
const demoPromise = $derived(demos[slug]?.());
let run = $state(0);
const demoProps = $derived(spec ? { ...defaultProps(spec), ...extraProps } : extraProps);
</script>

<!-- Controls stay hidden until hover or keyboard focus; touch devices always show them. -->
<div
	data-slot="showcase-panel"
	class="group/panel relative col-span-full flex min-h-60 min-w-0 flex-col border-border border-r border-b bg-background md:min-h-75 md:overflow-hidden {SPAN[span]} {classProp}"
>
	<ShowcaseDots weights={[1]} class="md:hidden" />
	<div
		class="absolute top-3 right-3 z-10 flex items-center gap-1.5 opacity-0 transition-opacity duration-150 group-focus-within/panel:opacity-100 group-hover/panel:opacity-100 pointer-coarse:opacity-100 motion-reduce:transition-none"
	>
		<Button
			size="icon-sm"
			variant="outline"
			aria-label="Replay {spec?.name ?? slug}"
			onclick={() => run++}
		>
			<IconRefresh stroke={1.7} />
		</Button>
		<Button {href} size="sm" variant="outline" tabindex={-1} aria-hidden="true">{spec?.name ?? slug}</Button>
	</div>
	<div class="absolute inset-0 z-2 flex items-center justify-center p-4 md:p-5">
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
	</div>
	<a {href} class="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-background focus:px-2 focus:py-1 focus:text-xs focus:ring-2 focus:ring-ring">
		Open {spec?.name ?? slug} docs
	</a>
</div>
