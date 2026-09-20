<script lang="ts">
import { cn } from "../lib/cn";

export type DiffLine = { kind: "add" | "remove" | "context"; text: string };

let {
	filename,
	lines,
	showLineNumbers = true,
	class: classProp,
}: {
	filename: string;
	lines: DiffLine[];
	showLineNumbers?: boolean;
	class?: string;
} = $props();

const added = $derived(lines.filter((l) => l.kind === "add").length);
const removed = $derived(lines.filter((l) => l.kind === "remove").length);

const MARK = { add: "+", remove: "-", context: " " };
const TONE = {
	add: "bg-[color-mix(in_oklch,var(--success)_12%,transparent)] text-foreground",
	remove: "bg-[color-mix(in_oklch,var(--destructive)_12%,transparent)] text-foreground",
	context: "text-muted-foreground",
};
</script>

<div class={cn("overflow-hidden rounded-xl border border-border bg-card", classProp)}>
	<div class="flex items-center justify-between gap-3 border-border border-b bg-background/60 px-4 py-2.5">
		<span class="truncate font-mono text-foreground text-xs">{filename}</span>
		<span class="flex shrink-0 items-center gap-2 font-mono text-[11px]">
			<span class="text-[var(--success)]">+{added}</span>
			<span class="text-[var(--destructive)]">-{removed}</span>
		</span>
	</div>

	<div class="overflow-x-auto font-mono text-[13px] leading-relaxed">
		{#each lines as line, i (i)}
			<div class={cn("flex whitespace-pre px-4", TONE[line.kind])}>
				{#if showLineNumbers}
					<span aria-hidden="true" class="mr-3 inline-block w-6 shrink-0 select-none text-right text-muted-foreground/60">
						{i + 1}
					</span>
				{/if}
				<span aria-hidden="true" class="mr-2 inline-block w-2 shrink-0 select-none">
					{MARK[line.kind]}
				</span>
				<span>
					<span class="sr-only">
						{line.kind === "add" ? "Added: " : line.kind === "remove" ? "Removed: " : ""}
					</span>
					{line.text || " "}
				</span>
			</div>
		{/each}
	</div>
</div>
