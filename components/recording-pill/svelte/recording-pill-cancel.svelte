<script lang="ts">
import { cn } from "../../lib/cn";
import { RECORDING_PILL_ICONS } from "../timer";
import { recordingPill } from "../variants";

/** Renders only when a handler is given. */
let {
	onclick,
	label = "Cancel",
	class: classProp,
}: { onclick?: () => void; label?: string; class?: string } = $props();
</script>

{#if onclick}
	<button
		type="button"
		data-slot="recording-pill-cancel"
		aria-label={label}
		class={cn(recordingPill().cancel(), classProp)}
		{onclick}
	>
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
			<path d={RECORDING_PILL_ICONS.cancel} />
		</svg>
	</button>
{/if}
