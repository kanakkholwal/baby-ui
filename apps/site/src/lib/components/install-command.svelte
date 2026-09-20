<script lang="ts">
import CopyButton from "./copy-button.svelte";
import Tabs from "./tabs.svelte";

let { slug, namespace = "@baby-ui" }: { slug: string; namespace?: string } = $props();

const PM: Record<string, string> = {
	bun: "bunx --bun",
	npm: "npx",
	pnpm: "pnpm dlx",
	yarn: "yarn dlx",
};
const tabs = Object.keys(PM).map((id) => ({ id, label: id }));

let pm = $state("bun");
const runner = $derived(PM[pm] ?? PM.bun);
const parts = $derived((runner ?? "").split(" "));
const command = $derived(`${runner} shadcn add ${namespace}/${slug}`);
</script>

<div class="relative overflow-hidden rounded-xl border border-border bg-card text-sm">
	<div class="flex items-center gap-2 border-border border-b px-3 py-1.5">
		<Tabs {tabs} bind:active={pm} variant="segment" />
		<div class="ml-auto shrink-0"><CopyButton text={command} iconOnly /></div>
	</div>

	<div class="overflow-x-auto">
		<div class="min-w-max whitespace-nowrap px-5 py-4 font-mono text-[13px]">
			<span class="select-none text-[#6e7781] dark:text-[#8b949e]">$&nbsp;</span
			><span class="text-[#1f6feb] dark:text-[#ffa657]">{parts[0]}</span
			>{#if parts[1]}<span class="text-[#6f42c1] dark:text-[#d2a8ff]"
					>&nbsp;{parts[1]}</span
				>{/if}<span class="text-[#24292f] dark:text-[#e6edf3]">&nbsp;shadcn&nbsp;</span
			><span class="text-[#0550ae] dark:text-[#79c0ff]">add</span
			><span class="text-[#24292f]/70 dark:text-[#e6edf3]/60">&nbsp;{namespace}/</span
			><span class="font-medium text-[#0a3069] dark:text-[#a5d6ff]">{slug}</span>
		</div>
	</div>
</div>
