<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { transcriptRow } from "../variants";
import { getTranscriptRow } from "./context";

/** Shown when the job failed. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const row = getTranscriptRow();
</script>

{#if row.status === "failed"}
	<p data-slot="transcript-row-error" class={cn(transcriptRow().error(), classProp)}>
		{@render children?.()}
	</p>
{/if}
