<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import Badge from "../../badge/svelte/badge.svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import Progress from "../../progress/svelte/progress.svelte";
import { clampProgress, TASK_STEP_ICONS, type TaskStatus } from "../variants";
import { taskStepsState } from "./context";

let {
	label,
	status = "pending",
	meta,
	step,
	progress,
	onRetry,
	open = $bindable(false),
	onOpenChange,
	class: classProp,
	children,
}: {
	/** What the step is, e.g. "Run the tests". */
	label: string;
	status?: TaskStatus;
	/** A right-aligned figure, such as an amount or a count. */
	meta?: string;
	/** Rows: the number in the pending or active ring. */
	step?: number;
	/** Active steps: how far along, from 0 to 1, shown as a thin bar. */
	progress?: number;
	/** Shows a retry button on a failed step. */
	onRetry?: () => void;
	/** Rows: whether the details are open; bindable. */
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	class?: string;
	/** TaskStepDetails: inline under a timeline step, or the fold a row opens onto. */
	children?: Snippet;
} = $props();
const ctx = taskStepsState("TaskStep");
const s = $derived(ctx.styles);
const ring = 2 * Math.PI * 11;
</script>

{#snippet glyph(d: string, extra = "")}
	<svg viewBox="0 0 24 24" aria-hidden="true" class={cn(s.glyph(), extra)}><path {d} /></svg>
{/snippet}

{#snippet bar()}
	{#if status === "active" && progress !== undefined}
		<Progress size="sm" value={clampProgress(progress) * 100} {label} class={s.progress()} />
	{/if}
{/snippet}

{#snippet retry()}
	{#if status === "failed" && onRetry}
		<Button variant="ghost" size="icon-xs" aria-label="Retry {label}" onclick={onRetry} class={s.retry()}>
			{@render glyph(TASK_STEP_ICONS.retry, "size-3 [stroke-width:3]")}
		</Button>
	{/if}
{/snippet}

{#snippet heading()}
	<span class={s.badge()}>
		{#if status === "done" || status === "failed"}
			<span data-status={status} class={s.statusDot()}>{@render glyph(status === "done" ? TASK_STEP_ICONS.check : TASK_STEP_ICONS.cross)}</span>
		{:else}
			<span class="relative inline-flex size-6 shrink-0 items-center justify-center">
				<svg viewBox="0 0 24 24" aria-hidden="true" class={cn("absolute inset-0", status === "active" && "step-spinner")}>
					<circle cx="12" cy="12" r="11" fill="none" stroke="var(--border)" stroke-width="2" />
					{#if status === "active"}
						<circle cx="12" cy="12" r="11" fill="none" stroke="var(--muted-foreground)" stroke-width="2" stroke-linecap="round" stroke-dasharray="{ring * 0.28} {ring * 0.72}" />
					{/if}
				</svg>
				<span class="relative font-semibold text-foreground text-xs tabular-nums">{step}</span>
			</span>
		{/if}
	</span>
	<span data-status={status} class={s.label()}>{label}</span>
	<span class="sr-only">{ctx.labels[status]}</span>
	{#if meta}<span class={s.meta()}>{meta}</span>{/if}
	{#if status === "done"}<Badge variant="success" size="sm">{ctx.labels.done}</Badge>{/if}
	{#if status === "failed"}<Badge variant="destructive" size="sm">{ctx.labels.failed}</Badge>{/if}
{/snippet}

{#if ctx.variant === "timeline"}
	<li data-slot="task-step" data-status={status} class={cn(s.item(), classProp)}>
		{#if ctx.showConnector}<span aria-hidden="true" data-status={status} class={s.connector()}></span>{/if}
		<div class={s.row()}>
			<span aria-hidden="true" data-status={status} class={s.marker()}>
				{#if status === "done"}
					<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" data-on="true" class={cn(s.icon(), "checkbox-check")}>
						<path d="M2.5 6.2 4.8 8.5 9.5 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{:else if status === "failed"}
					<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class={s.icon()}>
						<path d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
					</svg>
				{:else if status === "active"}
					<svg viewBox="0 0 12 12" fill="none" aria-hidden="true" class={cn(s.icon(), "step-spinner")}>
						<circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
						<path d="M10.4 6A4.4 4.4 0 0 0 6 1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				{:else}
					<span class={s.dot()}></span>
				{/if}
			</span>
			<div class={s.text()}>
				<div class={s.labelRow()}>
					<span data-status={status} class={s.label()}>{label}</span>
					<span class="sr-only">{ctx.labels[status]}</span>
					{#if meta}<span class={s.meta()}>{meta}</span>{/if}
					{@render retry()}
				</div>
				{@render bar()}
				{@render children?.()}
			</div>
		</div>
	</li>
{:else if !children}
	<li data-slot="task-step" data-status={status} class={cn(s.item(), classProp)}>
		<div class={s.row()}>
			<div class={cn(s.trigger(), "cursor-default")}>{@render heading()}</div>
			{@render retry()}
		</div>
		{@render bar()}
	</li>
{:else}
	<li data-slot="task-step" data-status={status} class={cn(s.item(), classProp)}>
		<CollapsiblePrimitive.Root
			bind:open={
				() => open,
				(next) => {
					open = next;
					onOpenChange?.(next);
				}
			}
		>
			<div class={s.row()}>
				<CollapsiblePrimitive.Trigger data-slot="task-step-trigger" class={cn(s.trigger(), "group/trigger")}>
					{@render heading()}
					{@render glyph(TASK_STEP_ICONS.chevron, s.chevron())}
				</CollapsiblePrimitive.Trigger>
				{@render retry()}
			</div>
			{@render bar()}
			<!-- forceMount keeps a closed frame for the grid-rows transition to animate from. -->
			<CollapsiblePrimitive.Content forceMount class={s.panel()}>
				<div class={s.clip()}>
					<div class={s.panelBody()}>
						<span aria-hidden="true" class={s.rail()}></span>
						{@render children()}
					</div>
				</div>
			</CollapsiblePrimitive.Content>
		</CollapsiblePrimitive.Root>
	</li>
{/if}
