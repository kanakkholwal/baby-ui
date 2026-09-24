<script lang="ts">
let {
	title = "Baby UI",
	description = "",
	tag = "",
}: { title?: string; description?: string; tag?: string } = $props();
</script>

<svelte:options css="injected" />

<!-- Always light: OG cards render once and get cached/shared everywhere, so they must not
     follow a visitor's own dark-mode preference. -->
<div id="og-root" class="relative h-full w-full overflow-hidden bg-white">
	<div class="absolute top-24 left-24 flex max-w-[820px] flex-col gap-4">
		{#if tag}
			<span class="font-semibold text-[#0a0a0a]/50 text-lg uppercase tracking-widest">
				{tag}
			</span>
		{/if}
		<h1 class="font-bold text-6xl text-[#0a0a0a] leading-[1.1] tracking-tight">
			{title}
		</h1>
		{#if description}
			<p class="text-[#0a0a0a]/55 text-2xl leading-snug">
				{description}
			</p>
		{/if}
	</div>

	<div
		class="-bottom-14 absolute left-24 whitespace-nowrap font-bold text-[#0a0a0a]/[0.028] text-[150px] tracking-tight"
	>
		BABY UI
	</div>
</div>
