<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../../badge/svelte/badge.svelte";
import { STATUS_BADGE } from "../variants";
import { getTranscriptRow } from "./context";

/** The job's badge; children replace its label. Renders nothing for a history entry. */
let { children }: { children?: Snippet } = $props();

const row = getTranscriptRow();
const badge = $derived(row.status ? STATUS_BADGE[row.status] : undefined);
</script>

{#if badge}
	<Badge data-slot="transcript-row-status" size="sm" variant={badge.variant}>
		{#if children}{@render children()}{:else}{badge.label}{/if}
	</Badge>
{/if}
