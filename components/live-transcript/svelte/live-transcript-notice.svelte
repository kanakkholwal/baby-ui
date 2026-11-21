<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { type LiveTranscriptTone, liveTranscript } from "../variants";

/** Why something went wrong, in place; the transcript stays. */
let {
	tone = "info",
	class: classProp,
	children,
}: { tone?: LiveTranscriptTone; class?: string; children?: Snippet } = $props();

const notice = $derived(liveTranscript({ tone }).notice());
</script>

<div
	data-slot="live-transcript-notice"
	data-tone={tone}
	role={tone === "destructive" ? "alert" : "status"}
	class={cn(notice, classProp)}
>
	{@render children?.()}
</div>
