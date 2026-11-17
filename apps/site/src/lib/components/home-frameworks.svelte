<script lang="ts">
import { HOME_PANES as PANES } from "#lib/home-code.js";
</script>

<!-- The claim is parity, so the proof is the same call written both ways. -->
<section aria-labelledby="home-frameworks-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
		<div>
			<h2
				id="home-frameworks-heading"
				class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
			>
				The same component in React and Svelte
			</h2>
			<p class="mt-4 max-w-md text-pretty text-muted-foreground leading-7">
				Both ports come from one spec, so props, variants, class names and motion timing match. Move a
				screen between frameworks and the components keep their names.
			</p>
			<ul class="mt-6 flex list-none flex-col gap-2 p-0 text-foreground text-sm">
				<li>Same variants and sizes in both</li>
				<li>Built on Base UI for React and bits-ui for Svelte</li>
				<li>Parity checked on every change</li>
			</ul>
		</div>
		<div class="grid gap-2 sm:grid-cols-2">
			{#each PANES as pane (pane.id)}
				<div class="min-w-0 rounded-2xl bg-card p-1">
					<p class="m-0 px-3 py-2 font-medium text-muted-foreground text-xs">{pane.label}</p>
					<pre
						class="m-0 overflow-x-auto rounded-[calc(var(--radius-2xl)-0.25rem)] bg-background p-4 font-mono text-[12.5px] text-foreground leading-6"><code>{pane.code}</code></pre>
				</div>
			{/each}
		</div>
	</div>
</section>
