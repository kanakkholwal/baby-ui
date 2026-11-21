<script lang="ts">
import {
	RecordingPill,
	RecordingPillCancel,
	RecordingPillIcon,
	RecordingPillLabel,
	RecordingPillMeter,
	RecordingPillTimer,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof RecordingPill>>(props));
const LABEL = {
	starting: "Starting",
	listening: "Listening",
	working: "Transcribing…",
	notice: "Microphone not found",
} as const;
const phase = $derived(p.state ?? "listening");
let seconds = $state(12);
let level = $state(0.3);

// The demo plays the session; the pill only renders what it is given.
$effect(() => {
	const clock = setInterval(() => (seconds += 1), 1000);
	const meter = setInterval(() => (level = 0.15 + Math.random() * 0.45), 120);
	return () => {
		clearInterval(clock);
		clearInterval(meter);
	};
});
</script>

<RecordingPill state={phase} variant={p.variant} {level}>
	<RecordingPillIcon />
	<RecordingPillLabel>{LABEL[phase]}</RecordingPillLabel>
	<RecordingPillMeter />
	{#if phase === "listening"}<RecordingPillTimer {seconds} />{/if}
	{#if phase !== "notice"}<RecordingPillCancel onclick={() => (seconds = 0)} />{/if}
</RecordingPill>
