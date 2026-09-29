<script lang="ts">
import { RollText } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof RollText>>(props));
const groupHover = $derived(props.groupHover === true);
</script>

{#snippet roll()}
	<RollText
		text={p.text || "Roll on hover"}
		{groupHover}
		disabled={props.disabled === true}
		stagger={p.stagger ?? "none"}
		staggerMs={Number(props.staggerMs ?? 32)}
		durationMs={Number(props.durationMs ?? 450)}
		size={p.size ?? "lg"}
		motion={p.motion ?? "slide"}
		class="font-semibold text-foreground"
	/>
{/snippet}

{#if groupHover}
	<button
		type="button"
		data-roll-group
		class="rounded-lg border border-border px-6 py-4 text-left hover:bg-foreground/[0.06]"
	>
		{@render roll()}
	</button>
{:else}
	{@render roll()}
{/if}
