<script lang="ts">
import { cn } from "../lib/cn";
import { type AttachmentStatus, attachment } from "./variants";

let {
	name,
	size,
	status = "ready",
	progress = 0,
	class: classProp,
	onremove,
}: {
	name: string;
	size?: string;
	status?: AttachmentStatus;
	progress?: number;
	class?: string;
	onremove?: () => void;
} = $props();

const clamped = $derived(Math.min(100, Math.max(0, progress)));
const frame = $derived(attachment({ status }));
</script>

<div class={cn(frame.root(), classProp)}>
	<span
		aria-hidden="true"
		class="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-muted-foreground"
	>
		<svg viewBox="0 0 16 16" fill="none" class="size-4">
			<path d="M9 1.5H4A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6L9 1.5zM9 1.5V6h4.5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
		</svg>
	</span>

	<div class="min-w-0 flex-1">
		<p class="truncate font-medium text-foreground text-sm">{name}</p>
		{#if status === "uploading"}
			<div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-input">
				<div
					style:width="{clamped}%"
					class="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)]"
				></div>
			</div>
			<p class="mt-1 text-muted-foreground text-xs">Uploading {Math.round(clamped)}%</p>
		{:else}
			<p class={frame.meta()}>
				{status === "error" ? "Upload failed" : (size ?? "Ready")}
			</p>
		{/if}
	</div>

	{#if onremove}
		<button
			type="button"
			aria-label="Remove {name}"
			onclick={onremove}
			class="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		</button>
	{/if}
</div>
