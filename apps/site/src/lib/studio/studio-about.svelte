<script lang="ts">
import type { Studio } from "./studios";

let { studio }: { studio: Studio } = $props();
</script>

<!-- Server-rendered copy under the tool, so search engines see what the studio does. -->
<section
	aria-labelledby="studio-about"
	class="mx-auto grid w-full max-w-5xl gap-8 px-4 py-12 text-muted-foreground text-sm leading-relaxed sm:grid-cols-2"
>
	<div>
		<h2 id="studio-about" class="font-medium text-base text-foreground">{studio.seo.title}</h2>
		<p class="mt-2">{studio.seo.description}</p>
		<ul class="mt-4 flex flex-col gap-1.5">
			{#each studio.seo.features as feature (feature)}
				<li class="flex gap-2"><span aria-hidden="true" class="text-foreground">·</span>{feature}</li>
			{/each}
		</ul>
	</div>
	<div>
		<h3 class="font-medium text-foreground">How it works</h3>
		<ol class="mt-2 flex list-decimal flex-col gap-1.5 pl-5">
			{#each studio.seo.steps as step (step)}
				<li>{step}</li>
			{/each}
		</ol>
		<p class="mt-4">
			Free, no sign-up, and nothing leaves your browser. Every control is a real component prop,
			so the code you copy matches what you see.
		</p>
	</div>
</section>
