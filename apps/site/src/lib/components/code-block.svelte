<script lang="ts">
import IconFileCode from "@tabler/icons-svelte/icons/file-code";
import { LANG_LABEL } from "$lib/highlight";
import CopyButton from "./copy-button.svelte";

let {
	code,
	html,
	lang = "ts",
	filename,
	maxHeight = "32rem",
}: {
	code: string;
	html: string;
	lang?: string;
	filename?: string;
	maxHeight?: string;
} = $props();

const dir = $derived(filename ? filename.split("/").slice(0, -1).join("/") : null);
const name = $derived(filename ? filename.split("/").pop() : null);
const label = $derived(LANG_LABEL[lang] ?? lang.toUpperCase());
</script>

<div
	class="group relative overflow-hidden rounded-xl border border-border bg-card font-mono text-[13px]"
>
	{#if filename}
		<div
			class="flex items-center justify-between gap-3 border-border border-b bg-background/60 px-4 py-2.5"
		>
			<div class="flex min-w-0 items-center gap-2 text-xs">
				<span
					class="inline-flex h-5 shrink-0 items-center rounded border border-border bg-card px-1.5 font-mono font-semibold text-[10px] text-muted-foreground uppercase tracking-wider"
				>
					{label}
				</span>
				<IconFileCode size={14} stroke={1.5} class="shrink-0 text-muted-foreground" />
				<span class="truncate font-mono text-muted-foreground"
					>{#if dir}<span class="text-foreground">{dir}/</span
						>{/if}<span class="font-medium text-foreground">{name}</span></span
				>
			</div>
			<CopyButton text={code} />
		</div>
	{:else}
		<div class="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
			<CopyButton text={code} />
		</div>
	{/if}

	<div
		style:max-height={maxHeight}
		class="scroll-area relative overflow-auto py-4 text-[13px] leading-relaxed [&_.line]:px-5 [&_.shiki]:bg-transparent [&_code]:font-mono [&_code]:text-[13px] [&_pre]:!bg-transparent [&_pre]:!p-0"
	>
		<!-- Shiki output, generated on the server from our own sources. -->
		{@html html}
	</div>
</div>
