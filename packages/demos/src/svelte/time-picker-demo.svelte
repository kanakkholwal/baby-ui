<script lang="ts">
import { TimePicker } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof TimePicker>>(props));

let time = $state<string | null>("09:30");
const cycle = $derived(
	props.hourCycle === "24" ? 24 : props.hourCycle === "12" ? 12 : undefined,
);
</script>

<div class="flex w-fit flex-col gap-2">
	<span class="font-medium text-sm">Meeting starts</span>
	<TimePicker
		bind:value={time}
		aria-label="Meeting starts"
		hourCycle={cycle}
		step={p.step ?? 15}
		invalid={p.invalid ?? false}
		size={p.size ?? "md"}
	/>
	<p class="text-muted-foreground text-xs tabular-nums">Saved as {time ?? "no time"}</p>
</div>
