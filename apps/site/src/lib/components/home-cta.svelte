<script lang="ts">
import { Badge, Button, FillButton, RollingDigits } from "@baby-ui/svelte";
import { page } from "$app/state";
import ShowcaseDots from "./showcase-dots.svelte";

let { count }: { count: number } = $props();
</script>

<section aria-labelledby="home-cta-heading" class="mx-auto max-w-7xl px-4 pb-12 md:px-8">
	<div class="relative border-border border-t border-l">
		<div
			aria-hidden="true"
			class="pointer-events-none absolute inset-0 bg-[radial-gradient(color-mix(in_oklch,var(--muted-foreground)_28%,transparent)_1px,transparent_1px)] bg-size-[14px_14px] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)]"
		></div>
		<div class="relative grid grid-cols-1 md:grid-cols-12">
			<div class="flex flex-col justify-center gap-6 border-border border-r border-b p-8 md:col-span-7 md:p-12">
				<h2
					id="home-cta-heading"
					class="font-normal text-[clamp(1.6rem,4vw,2.75rem)] text-foreground leading-[1.05] tracking-[-0.05em]"
				>
					{count} components.<br />Start with one.
				</h2>
				<p class="max-w-md text-foreground/70 text-sm leading-6">
					Install a single component with the shadcn CLI. It lands in your project as source,
					styled by your own tokens.
				</p>
				<div class="flex flex-wrap items-center gap-3">
					<FillButton href="/docs/installation">Install guide</FillButton>
					<Button href="/docs" size="lg" variant="outline" class="h-11 rounded-xl">Read the docs</Button>
				</div>
			</div>

			<div class="flex flex-col justify-center gap-5 border-border border-r border-b bg-background/60 p-8 md:col-span-5 md:p-12">
				<p class="text-muted-foreground text-xs">In the registry today</p>
				<span class="font-normal text-6xl text-foreground tracking-[-0.05em]">
					<RollingDigits value={count} />
				</span>
				<div class="flex flex-wrap gap-2">
					{#each page.data.categories ?? [] as group (group.category)}
						<a href={group.href} class="rounded-md">
							<Badge variant="outline">
								{group.label}
								<span class="text-muted-foreground tabular-nums">{group.count}</span>
							</Badge>
						</a>
					{/each}
				</div>
			</div>
		</div>
		<ShowcaseDots weights={[7, 5]} class="hidden md:block" />
	</div>
</section>
