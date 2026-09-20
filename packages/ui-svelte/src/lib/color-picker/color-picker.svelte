<script lang="ts">
import { cn } from "../lib/cn";

let {
	value = $bindable("#7dd3fc"),
	swatches = ["#7dd3fc", "#a78bfa", "#86efac", "#fcd34d", "#fda4af", "#e5e7eb"],
	label = "Colour",
	class: classProp,
}: { value?: string; swatches?: string[]; label?: string; class?: string } = $props();

const id = $props.id();
</script>

<div class={cn("flex flex-col gap-2", classProp)}>
	<div class="flex items-center gap-2">
		<label
			for={id}
			class="relative size-9 shrink-0 overflow-hidden rounded-lg border border-border"
			style:background={value}
		>
			<span class="sr-only">{label}</span>
			<!-- A real colour input, so the platform picker and eyedropper come free. -->
			<input
				{id}
				type="color"
				bind:value
				class="absolute inset-0 size-full cursor-pointer opacity-0"
			/>
		</label>
		<input
			type="text"
			aria-label="{label} hex value"
			bind:value
			spellcheck="false"
			class="h-9 w-28 rounded-lg border border-input bg-background px-2.5 font-mono text-foreground text-sm uppercase outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
		/>
	</div>

	<div class="flex flex-wrap items-center gap-1.5">
		{#each swatches as swatch (swatch)}
			<button
				type="button"
				aria-label={swatch}
				aria-pressed={value.toLowerCase() === swatch.toLowerCase()}
				onclick={() => (value = swatch)}
				style:background={swatch}
				class="size-6 rounded-full ring-offset-2 ring-offset-background transition-shadow aria-pressed:ring-2 aria-pressed:ring-foreground/40"
			></button>
		{/each}
	</div>
</div>
