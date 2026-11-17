<script lang="ts">
import InstallCommand from "./install-command.svelte";

let { slug }: { slug: string } = $props();
</script>

<section aria-labelledby="home-install-heading" class="mx-auto max-w-xl px-4 pb-20">
	<h2 id="home-install-heading" class="m-0 mb-4 text-center font-normal text-muted-foreground text-sm">
		One command per component, with the shadcn CLI
	</h2>
	<div class="rounded-2xl bg-card p-1">
		<InstallCommand {slug} cascade />
	</div>
</section>
