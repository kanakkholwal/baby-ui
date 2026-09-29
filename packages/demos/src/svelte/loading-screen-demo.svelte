<script lang="ts">
import { LoadingScreen } from "@baby-ui/svelte";
import type { ComponentProps, Snippet } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LoadingScreen>>(props));
</script>

{#snippet mark()}
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path
			fill="currentColor"
			d="M3 3.5A2.5 2.5 0 0 1 8 3.5V16H3ZM8.5 9H15.5A5.5 5.5 0 0 1 21 14.5V17.5A5.5 5.5 0 0 1 15.5 23H8.5A5.5 5.5 0 0 1 3 17.5V14.5A5.5 5.5 0 0 1 8.5 9ZM10.2 14.4A1.6 1.6 0 1 0 10.2 17.6A1.6 1.6 0 1 0 10.2 14.4ZM14.2 14.4A1.6 1.6 0 1 0 14.2 17.6A1.6 1.6 0 1 0 14.2 14.4Z"
		/>
	</svg>
{/snippet}

<div class="relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-border">
	<LoadingScreen
		position="absolute"
		logo={mark as unknown as Snippet}
		open={props.open !== false}
		indicator={p.indicator ?? "bar"}
		logoMotion={p.logoMotion ?? "breathe"}
		label={p.label || "Loading"}
	/>
</div>
