<script lang="ts">
import Badge from "../badge/badge.svelte";
import { cn } from "../lib/cn";
import type { TaskRow, TaskRowsLabels } from "./types";
import { type TaskRowsTone, type TaskRowsVariant, taskRows } from "./variants";

const DEFAULT_LABELS: TaskRowsLabels = { completed: "Completed", failed: "Failed" };

let {
	variant = "capsules",
	rows,
	labels,
	class: classProp,
	onToggleRow,
	onRetry,
}: {
	variant?: TaskRowsVariant;
	rows: TaskRow[];
	labels?: Partial<TaskRowsLabels>;
	class?: string;
	onToggleRow?: (key: string, open: boolean) => void;
	onRetry?: (key: string) => void;
} = $props();

let manualOpen = $state<Record<string, boolean>>({});
const copy = $derived({ ...DEFAULT_LABELS, ...labels });
const slots = $derived(taskRows({ variant }));

function isOpen(row: TaskRow) {
	return manualOpen[row.key] ?? false;
}

function toggle(row: TaskRow) {
	const next = !isOpen(row);
	manualOpen = { ...manualOpen, [row.key]: next };
	onToggleRow?.(row.key, next);
}
</script>

{#snippet spinnerRing(active: boolean, step: number | undefined)}
	{@const size = 24}
	{@const stroke = 2}
	{@const r = (size - stroke) / 2}
	{@const c = 2 * Math.PI * r}
	<span class="relative inline-flex shrink-0 items-center justify-center" style="width: {size}px; height: {size}px">
		<svg width={size} height={size} aria-hidden="true" class={cn("absolute inset-0", active && "spinner")}>
			<circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" stroke-width={stroke} />
			{#if active}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					fill="none"
					stroke="var(--muted-foreground)"
					stroke-width={stroke}
					stroke-linecap="round"
					stroke-dasharray="{c * 0.28} {c * 0.72}"
				/>
			{/if}
		</svg>
		<span class="relative font-semibold text-[10.5px] text-foreground tabular-nums">{step}</span>
	</span>
{/snippet}

{#snippet statusDot(tone: TaskRowsTone, icon: "check" | "x")}
	<span class={taskRows({ tone }).statusDot()}>
		{#if icon === "check"}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-3">
				<path d="M20 6L9 17l-5-5" />
			</svg>
		{:else}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" aria-hidden="true" class="size-3">
				<path d="M18 6L6 18M6 6l12 12" />
			</svg>
		{/if}
	</span>
{/snippet}

{#snippet badgeFor(row: TaskRow)}
	{#if row.status === "done"}
		{@render statusDot("success", "check")}
	{:else if row.status === "failed"}
		{@render statusDot("destructive", "x")}
	{:else}
		{@render spinnerRing(row.status === "running", row.step)}
	{/if}
{/snippet}

{#snippet pillFor(row: TaskRow)}
	{#if row.status === "done"}
		<Badge variant="success" size="sm">{copy.completed}</Badge>
	{:else if row.status === "failed"}
		<span class="flex items-center gap-1">
			<Badge variant="destructive" size="sm">{copy.failed}</Badge>
			{#if onRetry}
				<button
					type="button"
					aria-label="Retry"
					onclick={() => onRetry?.(row.key)}
					class="grid size-5.5 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
				>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="size-3">
						<path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" />
					</svg>
				</button>
			{/if}
		</span>
	{/if}
{/snippet}

<div data-slot="task-rows" class={cn(slots.root(), "max-w-[27.5rem]", classProp)}>
	{#each rows as row, i (row.key)}
		{@const open = isOpen(row)}
		<div
			data-slot="task-row"
			class={cn(slots.item(), "card-fade-up")}
			style="border-radius: {variant === 'list' ? 0 : open ? 14 : 22}px; animation-delay: {i * 80}ms"
		>
			<button
				type="button"
				aria-expanded={open}
				onclick={() => toggle(row)}
				class="flex h-11 w-full items-center gap-2.5 px-2.5 text-left"
			>
				<span class="flex size-6 shrink-0 items-center justify-center">
					{@render badgeFor(row)}
				</span>
				<span class="min-w-0 flex-1 truncate font-medium text-[13px] text-foreground">{row.label}</span>
				<span class="text-[12.5px] text-muted-foreground tabular-nums">{row.amount}</span>
				{@render pillFor(row)}
				<span aria-hidden="true" class="-ml-2 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground">
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
						style="transform: {open ? 'rotate(180deg)' : 'none'}"
						class="size-3.5 transition-transform duration-300 ease-[var(--ease-out)] motion-reduce:transition-none"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</span>
			</button>

			<div
				class="grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]"
				style="grid-template-rows: {open ? '1fr' : '0fr'}; opacity: {open ? 1 : 0}"
			>
				<div class="overflow-hidden">
					<div class="mb-2.5 grid grid-cols-[24px_1fr] gap-2.5 px-2.5">
						<span aria-hidden="true" class="mx-auto h-full w-px bg-border"></span>
						<div class="flex flex-col gap-1.5">
							{#each row.details as d (d.label)}
								<div class="flex items-center justify-between">
									<span class="text-[12px] text-muted-foreground">{d.label}</span>
									<span class="font-mono text-[11.5px] text-muted-foreground tabular-nums">{d.meta}</span>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	{/each}
</div>
