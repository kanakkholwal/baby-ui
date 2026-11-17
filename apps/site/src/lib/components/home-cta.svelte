<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
</script>

<section aria-labelledby="home-cta-heading" class="mx-auto max-w-5xl px-4 pb-24 md:px-8">
	<div class="flex flex-col items-start gap-4 rounded-2xl bg-card p-8 md:p-12">
		<h2 id="home-cta-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">
			Try one in your project
		</h2>
		<p class="m-0 max-w-lg text-pretty text-muted-foreground leading-7">
			Pick a component from the list, copy its command, and run it in a project that has Tailwind. If it
			doesn't fit, delete the file.
		</p>
		<div class="mt-2 flex flex-wrap gap-2">
			<Button href="/components" variant="dark" size="lg" class="group">
				Browse components
				<IconArrowRight
					aria-hidden="true"
					class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</Button>
			<Button href="/docs/installation" variant="ghost" size="lg">Installation guide</Button>
		</div>
	</div>
</section>
