<script lang="ts">
import CopyButton from "../copy-button/copy-button.svelte";
import { cn } from "../lib/cn";

let {
	code,
	language = "ts",
	filename,
	showLineNumbers = false,
	maxHeight = "24rem",
	class: classProp,
}: {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
	maxHeight?: string;
	class?: string;
} = $props();

const lines = $derived(code.replace(/\n$/, "").split("\n"));
</script>

<div
	class={cn(
		"group relative overflow-hidden rounded-xl border border-border bg-card font-mono text-[13px]",
		classProp,
	)}
>
	{#if filename}
		<div class="flex items-center justify-between gap-3 border-border border-b bg-background/60 px-4 py-2.5">
			<div class="flex min-w-0 items-center gap-2 text-xs">
				<span class="inline-flex h-5 shrink-0 items-center rounded border border-border bg-card px-1.5 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
					{language}
				</span>
				<span class="truncate text-foreground">{filename}</span>
			</div>
			<CopyButton text={code} iconOnly />
		</div>
	{:else}
		<div class="absolute top-2.5 right-2.5 z-10 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
			<CopyButton text={code} iconOnly />
		</div>
	{/if}

	<pre
		style:max-height={maxHeight}
		class="scroll-area overflow-auto py-4 leading-relaxed"><code
			>{#each lines as line, i (i)}<span class="flex px-5"
					>{#if showLineNumbers}<span
							aria-hidden="true"
							class="mr-4 inline-block w-6 shrink-0 select-none text-right text-muted-foreground/60"
							>{i + 1}</span
						>{/if}<span class="text-foreground">{line || " "}</span></span
				>{/each}</code
		></pre>
</div>
