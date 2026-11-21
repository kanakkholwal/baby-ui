<script lang="ts">
import {
	DownloadCard,
	DownloadCardCancel,
	DownloadCardDetail,
	DownloadCardFooter,
	DownloadCardHeader,
	DownloadCardIcon,
	DownloadCardPercent,
	DownloadCardProgress,
	DownloadCardStats,
	DownloadCardText,
	DownloadCardTitle,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof DownloadCard>>(props));
const TOTAL = 1.8 * 1024 ** 3;
const SPEED = 24 * 1024 ** 2;
let downloaded = $state(0.34 * TOTAL);

// The demo plays the download; the component only renders what it is given.
$effect(() => {
	const id = setInterval(() => {
		downloaded = downloaded + SPEED / 2 >= TOTAL ? 0 : downloaded + SPEED / 2;
	}, 500);
	return () => clearInterval(id);
});

const compact = $derived(p.variant === "compact");
</script>

<div class="w-full max-w-sm">
	<DownloadCard
		downloaded={p.phase === "checking" ? TOTAL : downloaded}
		total={TOTAL}
		bytesPerSecond={SPEED}
		phase={p.phase}
		variant={p.variant}
	>
		{#if !compact}
			<DownloadCardHeader>
				<DownloadCardIcon />
				<DownloadCardText>
					<DownloadCardTitle>Llama 3.2 3B Instruct</DownloadCardTitle>
					<DownloadCardDetail>Q4 quantised, runs on 8 GB</DownloadCardDetail>
				</DownloadCardText>
				<DownloadCardPercent />
			</DownloadCardHeader>
		{/if}
		<DownloadCardProgress label="Llama 3.2 3B Instruct" />
		<DownloadCardFooter>
			<DownloadCardStats />
			<DownloadCardCancel onclick={() => (downloaded = 0)} />
		</DownloadCardFooter>
	</DownloadCard>
</div>
