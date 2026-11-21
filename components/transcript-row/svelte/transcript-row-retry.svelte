<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { getTranscriptRow } from "./context";

/** Starts a failed job again. Renders only when a handler is given. */
let { onclick, children }: { onclick?: () => void; children?: Snippet } = $props();

const row = getTranscriptRow();
</script>

{#if onclick && row.status === "failed"}
	<Button data-slot="transcript-row-retry" size="sm" variant="secondary" {onclick}>
		{#if children}{@render children()}{:else}Try again{/if}
	</Button>
{/if}
