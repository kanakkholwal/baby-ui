<script lang="ts">
import {
	LoadingState,
	LoadingStateElapsed,
	LoadingStateIndicator,
	LoadingStateLabel,
	TextLoop,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LoadingState>>(props));
// A label can cycle what the agent is doing: compose TextLoop inside it.
const PHRASES = ["Reading the brief", "Searching the docs", "Drafting the answer"];
</script>

<div class="flex flex-col gap-4">
	<LoadingState variant={p.variant ?? "drive"}>
		<LoadingStateIndicator />
		<LoadingStateLabel>Churning</LoadingStateLabel>
		<LoadingStateElapsed />
	</LoadingState>
	<LoadingState variant={p.variant ?? "drive"}>
		<LoadingStateIndicator />
		<LoadingStateLabel><TextLoop items={PHRASES} variant="roll" intervalMs={2200} /></LoadingStateLabel>
		<LoadingStateElapsed />
	</LoadingState>
</div>
