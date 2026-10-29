<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Badge, Button, RollingDigits } from "@baby-ui/svelte";
import { page } from "$app/state";

let { count }: { count: number } = $props();
</script>

<!-- The close mirrors the hero: centred, quiet, two actions, then every category one tap away. -->
<section aria-labelledby="home-cta-heading" class="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
	<h2
		id="home-cta-heading"
		class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-5xl"
	>
		<RollingDigits value={Math.floor(count / 10) * 10} />+ components.
		<span class="block text-muted-foreground">Start with one.</span>
	</h2>
	<p class="mt-5 max-w-md text-pretty text-muted-foreground">
		It lands in your project as source, styled by your own tokens.
	</p>
	<div class="mt-8 flex flex-wrap items-center justify-center gap-2.5">
		<Button href="/docs/installation" size="lg" variant="dark" class="rounded-full px-5">Install guide</Button>
		<Button href="/components" size="lg" variant="secondary" class="group rounded-full px-5">
			Browse components
			<IconArrowRight
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</Button>
	</div>
	<div class="mt-10 flex flex-wrap justify-center gap-2">
		{#each page.data.categories ?? [] as group (group.category)}
			<a href={group.href} class="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
				<Badge variant="outline" class="rounded-full">
					{group.label}
					<span class="text-muted-foreground tabular-nums">{group.count}</span>
				</Badge>
			</a>
		{/each}
	</div>
</section>
