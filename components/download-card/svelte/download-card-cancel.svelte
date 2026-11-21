<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { getDownloadCard } from "./context";

/** Renders only while downloading and when a handler is given; cancelling a check is not offered. */
let {
	onclick,
	class: classProp,
	children,
}: { onclick?: () => void; class?: string; children?: Snippet } = $props();

const card = getDownloadCard();
</script>

{#if onclick && card.phase === "downloading"}
	<Button data-slot="download-card-cancel" size="sm" variant="ghost" class={classProp} {onclick}>
		{#if children}{@render children()}{:else}Cancel{/if}
	</Button>
{/if}
