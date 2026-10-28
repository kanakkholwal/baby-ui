<script lang="ts">
import { StarHistory } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { DEMO_STAR_HISTORIES, DEMO_STAR_HISTORIES_LIST } from "../data/star-history";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof StarHistory>>(props));
const history = $derived(DEMO_STAR_HISTORIES_LIST[0] ?? DEMO_STAR_HISTORIES.mid);
let mode = $state<"cumulative" | "daily">("cumulative");
$effect(() => {
	mode = p.mode === "daily" ? "daily" : "cumulative";
});
</script>

<div class="w-full max-w-4xl">
	<StarHistory
		{history}
		variant={p.variant ?? "default"}
		locale={p.locale || undefined}
		bind:mode
	/>
</div>
