<script lang="ts">
import CopyButton from "../../copy-button/svelte/copy-button.svelte";
import { getTranscriptRow } from "./context";

/** Copies the text; for history entries and finished jobs. */
let { text, label = "Copy text" }: { text: string; label?: string } = $props();

const row = getTranscriptRow();
</script>

{#if !row.status || row.status === "done"}
	<CopyButton {text} iconOnly {label} />
{/if}
