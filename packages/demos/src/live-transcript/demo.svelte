<script lang="ts">
import {
	LiveTranscript,
	LiveTranscriptBody,
	LiveTranscriptNotice,
	LiveTranscriptStatus,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LiveTranscript>>(props));
const WORDS =
	"Let's move the review to Thursday afternoon, and I'll send the revised draft to the whole design team before lunch so everyone has time to read it properly".split(
		" ",
	);
let count = $state(3);

// The demo plays the engine: it settles one word at a time and guesses the next.
$effect(() => {
	const id = setInterval(() => (count = count >= WORDS.length ? 3 : count + 1), 450);
	return () => clearInterval(id);
});

const done = $derived(count >= WORDS.length);
</script>

<div class="w-full max-w-md">
	<LiveTranscript
		variant={p.variant}
		session="demo"
		committed={p.committed ?? WORDS.slice(0, Math.max(0, count - 1)).join(" ")}
		tentative={p.tentative ?? (done ? "" : (WORDS[count - 1] ?? ""))}
	>
		<LiveTranscriptBody>Say something to start.</LiveTranscriptBody>
		{#if done}
			<LiveTranscriptStatus>Transcribing…</LiveTranscriptStatus>
		{:else if count === 3}
			<LiveTranscriptNotice tone="warning">The model is still loading, so this may lag.</LiveTranscriptNotice>
		{/if}
	</LiveTranscript>
</div>
