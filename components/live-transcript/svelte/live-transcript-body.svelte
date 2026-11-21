<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { isOverflowing, isPinned } from "../pin";
import { liveTranscript } from "../variants";
import { getLiveTranscript } from "./context";

/** The text. It follows the newest line until the reader scrolls up. `children` shows while empty. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const transcript = getLiveTranscript();
const styles = $derived(liveTranscript({ variant: transcript.variant }));
let el = $state<HTMLDivElement>();
let pinned = true;
let overflowing = $state(false);

$effect(() => {
	void transcript.session;
	pinned = true;
});

$effect(() => {
	void transcript.committed;
	void transcript.tentative;
	if (!el) return;
	overflowing = isOverflowing(el);
	if (pinned) el.scrollTop = el.scrollHeight;
});

const empty = $derived(transcript.committed === "" && transcript.tentative === "");
</script>

<div
	bind:this={el}
	data-slot="live-transcript-body"
	data-overflowing={overflowing ? "" : undefined}
	aria-live="polite"
	onscroll={(event) => {
		pinned = isPinned(event.currentTarget);
	}}
	class={cn(styles.body(), classProp)}
>
	{#if empty}
		<p class={styles.placeholder()}>{@render children?.()}</p>
	{:else}
		<p>
			<span class={styles.committed()}>{transcript.committed ? `${transcript.committed} ` : ""}</span>
			<span class={styles.tentative()}>{transcript.tentative}</span>
		</p>
	{/if}
</div>
