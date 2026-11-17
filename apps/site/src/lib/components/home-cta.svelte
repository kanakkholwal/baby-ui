<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
</script>

<!-- The close: two clear paths, the free docs or Pro, with nothing else competing. -->
<section aria-labelledby="home-cta-heading" class="mx-auto max-w-5xl px-4 pb-24 md:px-8">
	<div class="grid gap-2 md:grid-cols-2">
		<div class="flex flex-col items-start gap-3 rounded-2xl bg-card p-6 md:p-8">
			<h2 id="home-cta-heading" class="m-0 font-display font-medium text-2xl text-foreground tracking-[-0.02em]">
				Start with one component
			</h2>
			<p class="m-0 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
				Pick it, run its command, and it lands in your project as source, styled by your own tokens.
			</p>
			<Button href="/docs/installation" variant="dark" class="group mt-2">
				Install guide
				<IconArrowRight
					aria-hidden="true"
					class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</Button>
		</div>
		{#if __SHOW_PRO__}
			<div class="flex flex-col items-start gap-3 rounded-2xl bg-primary/8 p-6 md:p-8">
				<h2 class="m-0 font-display font-medium text-2xl text-foreground tracking-[-0.02em]">
					Need more than components?
				</h2>
				<p class="m-0 max-w-sm text-pretty text-muted-foreground text-sm leading-6">
					Pro adds data-heavy blocks like kanban, gantt and cohort charts, plus email templates and OG images, with the same source ownership.
				</p>
				<Button href="/pricing" variant="default" class="mt-2">See Pro</Button>
			</div>
		{/if}
	</div>
</section>
