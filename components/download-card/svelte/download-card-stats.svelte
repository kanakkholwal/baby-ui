<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { formatBytes, formatEta, formatSpeed } from "../format";
import { downloadCard } from "../variants";
import { getDownloadCard } from "./context";

/** "12 MB of 80 MB · 4 MB/s · 17 s left"; children replace it. */
let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const card = getDownloadCard();
const eta = $derived(
	formatEta(Math.max(0, card.total - card.downloaded), card.bytesPerSecond),
);
const text = $derived(
	card.phase === "checking"
		? "Making sure the file is intact"
		: card.total > 0
			? [
					`${formatBytes(card.downloaded)} of ${formatBytes(card.total)}`,
					card.bytesPerSecond > 0 ? formatSpeed(card.bytesPerSecond) : "",
					eta,
				]
					.filter(Boolean)
					.join(" · ")
			: "Starting",
);
</script>

<p data-slot="download-card-stats" class={cn(downloadCard().stats(), classProp)}>
	{#if children}{@render children()}{:else}{text}{/if}
</p>
