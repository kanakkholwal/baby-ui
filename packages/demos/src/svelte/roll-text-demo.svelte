<script lang="ts">
import {
	type RollStagger,
	RollText,
	type RollTextMotion,
	type RollTextSize,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const groupHover = $derived(props.groupHover === true);
</script>

{#snippet roll()}
	<RollText
		text={(props.text as string) || "Roll on hover"}
		{groupHover}
		disabled={props.disabled === true}
		stagger={(props.stagger as RollStagger) ?? "none"}
		staggerMs={Number(props.staggerMs ?? 32)}
		durationMs={Number(props.durationMs ?? 450)}
		size={(props.size as RollTextSize) ?? "lg"}
		motion={(props.motion as RollTextMotion) ?? "slide"}
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
