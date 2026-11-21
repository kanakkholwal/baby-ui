<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { DOWNLOAD_CARD_ICONS } from "../icons";
import { downloadCard } from "../variants";
import { getDownloadCard } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const card = getDownloadCard();
const icon = $derived(downloadCard({ phase: card.phase, variant: card.variant }).icon());
</script>

<span
	data-slot="download-card-icon"
	aria-hidden="true"
	class={cn(icon, classProp)}
	style:--dl-progress={`${card.percent}%`}
>
	{#if children}
		{@render children()}
	{:else}
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d={DOWNLOAD_CARD_ICONS[card.phase]} />
		</svg>
	{/if}
</span>
