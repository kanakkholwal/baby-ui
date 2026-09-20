<script lang="ts">
import Logo from "$lib/components/logo.svelte";
</script>

<footer class="border-border border-t">
	<div
		class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-10 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between md:px-6 xl:px-8"
	>
		<p class="flex items-center gap-2">
			<Logo class="size-4 text-foreground" />
			Components are yours once copied.
		</p>
		<nav class="flex items-center gap-4">
			<a href="/llms.txt" class="transition-colors hover:text-foreground">llms.txt</a>
			<a href="/r/registry.json" class="transition-colors hover:text-foreground">registry</a>
			<a href="/docs" class="transition-colors hover:text-foreground">docs</a>
		</nav>
	</div>
</footer>
