<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { IMAGE_GENERATION_ICONS } from "../variants";
import { imageGenerationState } from "./context";

let {
	onclick,
	class: classProp,
	children,
}: {
	/** Starts the generation again; the button only shows once it has failed. */
	onclick: () => void;
	class?: string;
	children?: Snippet;
} = $props();
const gen = imageGenerationState("ImageGenerationRetry");
</script>

{#if gen.status === "error"}
	<Button data-slot="image-generation-retry" variant="ghost" size="sm" class={cn(gen.styles.retry(), "rounded-full", classProp)} {onclick}>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={gen.styles.icon()}><path d={IMAGE_GENERATION_ICONS.retry} /></svg>
		{#if children}{@render children()}{:else}Try again{/if}
	</Button>
{/if}
