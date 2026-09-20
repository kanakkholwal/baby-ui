<script lang="ts">
import { cn } from "../lib/cn";

export type ToastTone = "info" | "success" | "warning" | "error";
export type ToastVariant = "soft" | "solid" | "outline";
export type ToastPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

export type ToastItem = {
	id: string;
	title: string;
	description?: string;
	tone?: ToastTone;
	action?: { label: string; onclick: () => void };
	dismissible?: boolean;
	/** Milliseconds before it removes itself. Omit or 0 to keep it until dismissed. */
	duration?: number;
};

let {
	toasts = $bindable<ToastItem[]>([]),
	position = "bottom-right",
	variant = "soft",
	max = 4,
	class: classProp,
	ondismiss,
}: {
	toasts?: ToastItem[];
	position?: ToastPosition;
	variant?: ToastVariant;
	max?: number;
	class?: string;
	ondismiss?: (id: string) => void;
} = $props();

const POSITION: Record<ToastPosition, string> = {
	"top-left": "top-4 left-4 items-start",
	"top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
	"top-right": "top-4 right-4 items-end",
	"bottom-left": "bottom-4 left-4 items-start",
	"bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
	"bottom-right": "bottom-4 right-4 items-end",
};

const ACCENT: Record<ToastTone, string> = {
	info: "var(--foreground)",
	success: "var(--success)",
	warning: "var(--warning)",
	error: "var(--destructive)",
};

const MARK: Record<ToastTone, string> = {
	info: "M8 5.2v.01M8 7.4v3.4",
	success: "M4.8 8.2 7 10.4l4.2-4.6",
	warning: "M8 4.8v3.6M8 10.8v.01",
	error: "m5.6 5.6 4.8 4.8M10.4 5.6l-4.8 4.8",
};

const fromTop = $derived(position.startsWith("top"));
const shown = $derived(fromTop ? toasts.slice(0, max) : toasts.slice(-max));

function dismiss(id: string) {
	toasts = toasts.filter((t) => t.id !== id);
	ondismiss?.(id);
}

// Opt-in only: a timer that removes text the reader is still on is hostile.
$effect(() => {
	const timers = shown
		.filter((toast) => toast.duration && toast.duration > 0)
		.map((toast) => setTimeout(() => dismiss(toast.id), toast.duration));
	return () => timers.forEach(clearTimeout);
});
</script>

<div
	aria-live="polite"
	class={cn("pointer-events-none fixed z-50 flex flex-col gap-2", POSITION[position], classProp)}
>
	{#each shown as toast (toast.id)}
		{@const tone = toast.tone ?? "info"}
		<div
			style:--toast-accent={ACCENT[tone]}
			class={cn(
				"toast-in pointer-events-auto flex w-[min(22rem,calc(100vw-2rem))] items-start gap-2.5 rounded-xl border p-3 shadow-2xl",
				variant === "soft" &&
					"border-[color-mix(in_oklch,var(--toast-accent)_30%,transparent)] bg-popover",
				variant === "outline" && "border-[var(--toast-accent)] bg-background",
				variant === "solid" &&
					"border-transparent bg-[var(--toast-accent)] text-[var(--background)]",
			)}
		>
			<svg
				viewBox="0 0 16 16"
				fill="none"
				aria-hidden="true"
				class={cn("mt-0.5 size-4 shrink-0", variant !== "solid" && "text-[var(--toast-accent)]")}
			>
				<circle cx="8" cy="8" r="6.4" stroke="currentColor" stroke-width="1.3" />
				<path d={MARK[tone]} stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>

			<div class="min-w-0 flex-1">
				<p class="font-medium text-sm">{toast.title}</p>
				{#if toast.description}
					<p
						class={cn(
							"mt-0.5 text-xs leading-relaxed",
							variant === "solid" ? "opacity-80" : "text-muted-foreground",
						)}
					>
						{toast.description}
					</p>
				{/if}
				{#if toast.action}
					<button
						type="button"
						onclick={toast.action.onclick}
						class="mt-2 font-medium text-xs underline underline-offset-4 transition-opacity hover:opacity-70"
					>
						{toast.action.label}
					</button>
				{/if}
			</div>

			{#if toast.dismissible !== false}
				<button
					type="button"
					aria-label="Dismiss"
					onclick={() => dismiss(toast.id)}
					class={cn(
						"-mr-1 shrink-0 rounded-md p-1 transition-colors",
						variant === "solid" ? "opacity-70 hover:opacity-100" : "text-muted-foreground hover:text-foreground",
					)}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
						<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</button>
			{/if}
		</div>
	{/each}
</div>
