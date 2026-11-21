<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { liveTranscript } from "../variants";
import { getLiveTranscript } from "./context";

/** A working state under the text: transcribing, polishing. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const transcript = getLiveTranscript();
const styles = $derived(liveTranscript({ variant: transcript.variant }));
</script>

<p data-slot="live-transcript-status" role="status" class={cn(styles.status(), classProp)}>
	<span aria-hidden="true" class={styles.dot()}></span>
	{@render children?.()}
</p>
