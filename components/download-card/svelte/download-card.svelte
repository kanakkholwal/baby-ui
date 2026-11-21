<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { percentOf } from "../format";
import {
	type DownloadCardPhase,
	type DownloadCardVariant,
	downloadCard,
} from "../variants";
import { setDownloadCard } from "./context";

let {
	downloaded,
	total,
	bytesPerSecond = 0,
	phase = "downloading",
	variant = "default",
	class: classProp,
	children,
	...rest
}: {
	downloaded: number;
	total: number;
	bytesPerSecond?: number;
	phase?: DownloadCardPhase;
	variant?: DownloadCardVariant;
	class?: string;
	children?: Snippet;
} & Omit<HTMLAttributes<HTMLDivElement>, "class" | "children"> = $props();

setDownloadCard({
	get variant() {
		return variant;
	},
	get phase() {
		return phase;
	},
	get downloaded() {
		return downloaded;
	},
	get total() {
		return total;
	},
	get bytesPerSecond() {
		return bytesPerSecond;
	},
	get percent() {
		return percentOf(downloaded, total);
	},
});

const root = $derived(downloadCard({ variant, phase }).root());
</script>

<div
	{...rest}
	data-slot="download-card"
	data-phase={phase}
	role="status"
	aria-live="polite"
	class={cn(root, classProp)}
>
	{@render children?.()}
</div>
