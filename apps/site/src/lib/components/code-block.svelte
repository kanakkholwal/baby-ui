<script lang="ts">
import { LANG_LABEL } from "$lib/highlight";
import CopyButton from "./copy-button.svelte";

let {
	code,
	html,
	lang = "ts",
	filename,
}: { code: string; html: string; lang?: string; filename?: string } = $props();

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
				<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
					<path
						d="M8 1.5H4A1.5 1.5 0 0 0 2.5 3v8A1.5 1.5 0 0 0 4 12.5h6a1.5 1.5 0 0 0 1.5-1.5V5L8 1.5zM8 1.5V5h3.5"
						stroke="currentColor"
						stroke-width="1.2"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="truncate font-mono text-muted-foreground">
					{#if dir}<span class="text-foreground">{dir}/</span>{/if}
					<span class="font-medium text-foreground">{name}</span>
				</span>
			</div>
			<CopyButton text={code} />
		</div>
	{:else}
		<div class="absolute top-3 right-3 z-10">
			<CopyButton text={code} />
		</div>
	{/if}

	<div
		class="relative max-h-[32rem] overflow-auto py-4 text-[13px] leading-relaxed [&_.line]:px-5 [&_.shiki]:bg-transparent [&_code]:font-mono [&_code]:text-[13px] [&_pre]:!bg-transparent [&_pre]:!p-0"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html html}
	</div>
</div>
