<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { transcriptRow } from "../variants";
import { getTranscriptRow } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const row = getTranscriptRow();
const text = $derived(transcriptRow({ clamp: row.clamp }).text());
</script>

<p data-slot="transcript-row-text" class={cn(text, classProp)}>
	{@render children?.()}
</p>
