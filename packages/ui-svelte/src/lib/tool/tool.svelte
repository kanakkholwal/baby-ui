<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { type ToolState, tool } from "./variants";

let {
	name,
	status = "running",
	input,
	output,
	defaultOpen = false,
	class: classProp,
}: {
	name: string;
	status?: ToolState;
	input?: string;
	output?: string;
	defaultOpen?: boolean;
	class?: string;
} = $props();

const id = $props.id();
let open = $state(untrack(() => defaultOpen));

const LABEL: Record<ToolState, string> = {
	pending: "Queued",
	running: "Running",
	done: "Completed",
	error: "Failed",
};

const classes = $derived(tool({ status }));
</script>

<div data-slot="tool" class={cn(classes.root(), classProp)}>
	<button
		type="button"
		aria-expanded={open}
		aria-controls={id}
		onclick={() => (open = !open)}
		class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.03]"
	>
		<span aria-hidden="true" class={classes.icon()}>
			{#if status === "running"}
				<svg viewBox="0 0 12 12" fill="none" class="spinner size-3">
					<circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
					<path d="M10.4 6A4.4 4.4 0 0 0 6 1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			{:else if status === "done"}
				<svg viewBox="0 0 12 12" fill="none" class="size-3">
					<path d="M2.5 6.2 4.8 8.5 9.5 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			{:else if status === "error"}
				<svg viewBox="0 0 12 12" fill="none" class="size-3">
					<path d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
				</svg>
			{:else}
				<span class="size-1.5 rounded-full bg-current"></span>
			{/if}
		</span>

		<span class="flex-1 font-mono text-foreground text-xs">{name}</span>
		<span class={classes.label()}>{LABEL[status]}</span>
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			style:transform={open ? "rotate(180deg)" : "none"}
			class="size-3.5 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
		>
			<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>

	<div
		{id}
		style:grid-template-rows={open ? "1fr" : "0fr"}
		class="grid transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
	>
		<div class="overflow-hidden">
			<div class="flex flex-col gap-2 border-border/60 border-t p-3">
				{#if input}
					<div>
						<p class="mb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
							Input
						</p>
						<pre class="overflow-x-auto rounded-lg bg-background p-2 font-mono text-[11px] text-muted-foreground"><code>{input}</code></pre>
					</div>
				{/if}
				{#if output}
					<div>
						<p class="mb-1 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
							Output
						</p>
						<pre class="overflow-x-auto rounded-lg bg-background p-2 font-mono text-[11px] text-foreground"><code>{output}</code></pre>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
