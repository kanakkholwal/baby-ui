<script lang="ts">
import { cn } from "../lib/cn";

export type TaskStatus = "pending" | "active" | "done" | "failed";
type Step = { id: string; label: string; status: TaskStatus };

let {
	steps,
	showConnector = true,
	compact = false,
	class: classProp,
}: {
	steps: Step[];
	showConnector?: boolean;
	compact?: boolean;
	class?: string;
} = $props();

const LABEL: Record<TaskStatus, string> = {
	pending: "Pending",
	active: "In progress",
	done: "Done",
	failed: "Failed",
};
</script>

<ol aria-live="polite" class={cn("flex flex-col", classProp)}>
	{#each steps as step, i (step.id)}
		<li class={cn("relative flex gap-3", compact ? "py-1" : "py-1.5")}>
			{#if showConnector && i < steps.length - 1}
				<span
					aria-hidden="true"
					class={cn(
						"absolute top-6 bottom-0 left-[0.6875rem] w-px",
						step.status === "done" ? "bg-[var(--success)]" : "bg-border",
					)}
				></span>
			{/if}

			<span
				aria-hidden="true"
				class={cn(
					"relative z-10 grid size-5.5 shrink-0 place-items-center rounded-full border bg-background",
					step.status === "done" && "border-[var(--success)] text-[var(--success)]",
					step.status === "failed" && "border-[var(--destructive)] text-[var(--destructive)]",
					step.status === "active" && "border-primary text-primary",
					step.status === "pending" && "border-border text-muted-foreground",
				)}
			>
				{#if step.status === "done"}
					<svg viewBox="0 0 12 12" fill="none" class="checkbox-check size-3" data-on="true">
						<path d="M2.5 6.2 4.8 8.5 9.5 3.6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{:else if step.status === "failed"}
					<svg viewBox="0 0 12 12" fill="none" class="size-3">
						<path d="M3.5 3.5 8.5 8.5M8.5 3.5 3.5 8.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
					</svg>
				{:else if step.status === "active"}
					<svg viewBox="0 0 12 12" fill="none" class="step-spinner size-3">
						<circle cx="6" cy="6" r="4.4" stroke="currentColor" stroke-width="1.5" opacity="0.25" />
						<path d="M10.4 6A4.4 4.4 0 0 0 6 1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				{:else}
					<span class="size-1.5 rounded-full bg-current"></span>
				{/if}
			</span>

			<span class="min-w-0 flex-1 text-sm">
				<span
					class={cn(
						step.status === "pending" ? "text-muted-foreground" : "text-foreground",
						step.status === "done" && "line-through decoration-muted-foreground/40",
					)}
				>
					{step.label}
				</span>
				<span class="sr-only">{LABEL[step.status]}</span>
			</span>
		</li>
	{/each}
</ol>
