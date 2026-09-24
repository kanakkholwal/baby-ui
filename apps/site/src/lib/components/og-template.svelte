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
<div
	id="og-root"
	class="flex h-full w-full flex-col justify-between bg-[#fafafa] px-20 py-16 text-[#0a0a0a]"
>
	<div class="flex items-center gap-3">
		<svg viewBox="0 0 24 24" width="40" height="40">
			<path
				fill="#0a0a0a"
				d="M3 3.5A2.5 2.5 0 0 1 8 3.5V16H3ZM8.5 9H15.5A5.5 5.5 0 0 1 21 14.5V17.5A5.5 5.5 0 0 1 15.5 23H8.5A5.5 5.5 0 0 1 3 17.5V14.5A5.5 5.5 0 0 1 8.5 9ZM10.2 14.4A1.6 1.6 0 1 0 10.2 17.6A1.6 1.6 0 1 0 10.2 14.4ZM14.2 14.4A1.6 1.6 0 1 0 14.2 17.6A1.6 1.6 0 1 0 14.2 14.4Z"
			/>
		</svg>
		<span class="font-semibold text-3xl tracking-tight">Baby UI</span>
	</div>

	<div class="flex flex-col gap-6">
		{#if tag}
			<span
				class="w-fit rounded-full border border-[#0a0a0a]/15 px-4 py-1.5 text-[#0a0a0a]/70 text-xl"
			>
				{tag}
			</span>
		{/if}
		<h1 class="max-w-[900px] font-semibold text-7xl leading-[1.08] tracking-tight">
			{title}
		</h1>
		{#if description}
			<p class="max-w-[820px] text-2xl text-[#0a0a0a]/60 leading-snug">
				{description}
			</p>
		{/if}
	</div>

	<div class="flex items-center justify-between text-[#0a0a0a]/50 text-xl">
		<span>baby-ui.nexonauts.com</span>
		<span>React + Svelte</span>
	</div>
</div>

<style>
	#og-root {
		background-image: radial-gradient(circle, rgba(10, 10, 10, 0.1) 1.5px, transparent 1.5px);
		background-size: 28px 28px;
	}
</style>
