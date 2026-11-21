<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { RECORDING_PILL_ICONS } from "../timer";
import { recordingPill } from "../variants";
import { getRecordingPill } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const pill = getRecordingPill();
const icon = $derived(recordingPill({ state: pill.state }).icon());
</script>

<span data-slot="recording-pill-icon" aria-hidden="true" class={cn(icon, classProp)}>
	{#if children}
		{@render children()}
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d={RECORDING_PILL_ICONS[pill.state === "notice" ? "notice" : "mic"]} />
		</svg>
	{/if}
</span>
