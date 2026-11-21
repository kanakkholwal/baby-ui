<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { getTranscriptRow } from "./context";

/** Stops a waiting or running job. Renders only when a handler is given. */
let { onclick, children }: { onclick?: () => void; children?: Snippet } = $props();

const row = getTranscriptRow();
</script>

{#if onclick && (row.status === "queued" || row.status === "running")}
	<Button data-slot="transcript-row-cancel" size="sm" variant="ghost" {onclick}>
		{#if children}{@render children()}{:else}Cancel{/if}
	</Button>
{/if}
