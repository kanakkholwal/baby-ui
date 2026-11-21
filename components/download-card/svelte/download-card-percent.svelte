<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { downloadCard } from "../variants";
import { getDownloadCard } from "./context";

/** The share done, or "Checking" while the file is verified; children replace either. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const card = getDownloadCard();
</script>

<span data-slot="download-card-percent" class={cn(downloadCard().percent(), classProp)}>
	{#if children}
		{@render children()}
	{:else}
		{card.phase === "checking" ? "Checking" : `${Math.round(card.percent)}%`}
	{/if}
</span>
