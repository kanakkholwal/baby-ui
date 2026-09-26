<script lang="ts">
import type { Snippet } from "svelte";

let { children }: { children: Snippet } = $props();

let width = $state(1200);
</script>

<!-- OG cards are a fixed 1200x630 canvas; the frame scales that canvas to whatever width it gets. -->
<div
	bind:clientWidth={width}
	class="relative aspect-[1200/630] w-full max-w-3xl overflow-hidden rounded-xl border border-border shadow-sm"
>
	<div class="absolute top-0 left-0 origin-top-left" style="transform: scale({width / 1200})">
		{@render children()}
	</div>
</div>
