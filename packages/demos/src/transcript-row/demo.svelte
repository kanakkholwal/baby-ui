<script lang="ts">
import {
	TranscriptRow,
	TranscriptRowActions,
	TranscriptRowCancel,
	TranscriptRowCopy,
	TranscriptRowError,
	TranscriptRowHeader,
	TranscriptRowProgress,
	TranscriptRowRetry,
	TranscriptRowStatusBadge,
	TranscriptRowText,
	TranscriptRowTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TranscriptRow>>(props));
const NOTE =
	"Let's move the review to Thursday afternoon, and I'll send the revised draft to the whole design team before lunch so everyone has time to read it properly.";
let percent = $state(42);

// The demo plays the job; the rows only render the progress they are given.
$effect(() => {
	const id = setInterval(() => (percent = percent >= 100 ? 0 : percent + 6), 600);
	return () => clearInterval(id);
});
</script>

<ul class="grid w-full max-w-md gap-3">
	<TranscriptRow variant={p.variant} clamp={p.clamp}>
		<TranscriptRowHeader>
			<TranscriptRowTitle>Today, 10:42</TranscriptRowTitle>
			<TranscriptRowActions>
				<TranscriptRowCopy text={NOTE} />
			</TranscriptRowActions>
		</TranscriptRowHeader>
		<TranscriptRowText>{NOTE}</TranscriptRowText>
	</TranscriptRow>
	<TranscriptRow status="running" variant={p.variant} clamp={p.clamp}>
		<TranscriptRowHeader>
			<TranscriptRowTitle>weekly-sync.m4a</TranscriptRowTitle>
			<TranscriptRowActions>
				<TranscriptRowStatusBadge />
				<TranscriptRowCancel onclick={() => (percent = 0)} />
			</TranscriptRowActions>
		</TranscriptRowHeader>
		<TranscriptRowProgress value={percent} label="weekly-sync.m4a" />
	</TranscriptRow>
	<TranscriptRow status="failed" variant={p.variant} clamp={p.clamp}>
		<TranscriptRowHeader>
			<TranscriptRowTitle>voice-memo.wav</TranscriptRowTitle>
			<TranscriptRowActions>
				<TranscriptRowStatusBadge />
				<TranscriptRowRetry onclick={() => (percent = 0)} />
			</TranscriptRowActions>
		</TranscriptRowHeader>
		<TranscriptRowError>The file could not be read.</TranscriptRowError>
	</TranscriptRow>
</ul>
