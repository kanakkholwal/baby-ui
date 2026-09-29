<script lang="ts">
import { HoverTransition } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof HoverTransition>>(props));
</script>

<HoverTransition
	effect={p.effect ?? "wipe"}
	direction={p.direction ?? "right"}
	durationMs={Number(props.durationMs ?? 720)}
	tilt={p.tilt ?? true}
	label={p.label || "Hover to reveal more"}
	class="aspect-4/5 w-full max-w-xs rounded-3xl border border-border"
>
	<div class="relative flex size-full flex-col justify-end bg-card text-card-foreground">
		<img
			src="https://picsum.photos/id/64/640/800"
			alt=""
			class="absolute inset-0 size-full object-cover"
		/>
		<div class="relative bg-linear-to-t from-background/90 to-transparent p-6 pt-16">
			<p class="font-medium text-2xl tracking-tight">Maya Chen</p>
			<p class="mt-1 text-muted-foreground text-sm">Hover or focus the card</p>
		</div>
	</div>
	{#snippet hoverContent()}
		<div class="flex size-full flex-col justify-between bg-primary p-6 text-primary-foreground">
			<p class="font-medium text-xl leading-tight tracking-tight">
				Turning complex product ideas into clear, expressive experiences.
			</p>
			<div>
				<p class="font-semibold">Maya Chen</p>
				<p class="mt-1 text-xs uppercase tracking-widest opacity-70">Product designer</p>
			</div>
		</div>
	{/snippet}
</HoverTransition>
