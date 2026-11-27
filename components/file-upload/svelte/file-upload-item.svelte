<script lang="ts">
import type { HTMLLiAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { transitionMs } from "../../lib/motion";
import { formatBytes, statusLabel, type UploadFile } from "../core";
import { FILE_GLYPHS, FILE_SHEET, fileKind, fileLabel, fileUpload } from "../variants";
import { fileUploadState } from "./context";

let {
	file: item,
	onRemove,
	onRetry,
	class: classProp,
	...rest
}: Omit<HTMLLiAttributes, "children"> & {
	file: UploadFile;
	/** Shows a remove action; the row folds shut before this runs. */
	onRemove?: () => void;
	/** Shows a retry action on a failed upload. */
	onRetry?: () => void;
} = $props();

const ctx = fileUploadState("FileUploadItem");
const s = $derived(fileUpload({ size: ctx.size, status: item.status }));
const name = $derived(item.file.name);
const preview = $derived(ctx.previews[item.id]);
const clamped = $derived(Math.min(100, Math.max(0, item.progress)));
const done = $derived(item.status === "done");
const glyph = $derived(FILE_GLYPHS[fileKind(name, item.file.type)]);
const meta = $derived(
	[
		fileLabel(name, item.file.type),
		formatBytes(item.file.size),
		...(item.status === "error" ? [item.error ?? ctx.labels.failed] : []),
	].join(" · "),
);
let root = $state<HTMLLIElement>();
let leaving = $state(false);

// Removal waits for the fold, then hands back; under reduced motion it runs at once.
$effect(() => {
	if (!leaving) return;
	const ms = root ? transitionMs(root) : 0;
	const timer = setTimeout(() => onRemove?.(), ms);
	return () => clearTimeout(timer);
});
</script>

<li
	bind:this={root}
	{...rest}
	data-slot="file-upload-item"
	data-status={item.status}
	data-leaving={leaving}
	class={cn(s.item(), classProp)}
>
	<!-- The clip folds to 0; the row's own padding and border could not. -->
	<div class="min-h-0 overflow-hidden">
		<div class={s.row()}>
			<span aria-hidden="true" class={s.thumb()}>
				{#if preview}
					<img src={preview} alt="" class={s.thumbImage()} />
				{:else}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
						<path d={FILE_SHEET} />
						{#if glyph}<path d={glyph} />{/if}
					</svg>
				{/if}
			</span>
			<span class={s.body()}>
				<span class={s.line()}>
					<span class={s.copy()}>
						<span class={s.name()} title={name}>{name}</span>
						<span class={s.meta()}>{meta}</span>
					</span>
					<span class={s.actions()}>
						<span class={s.status()}>
							{#key item.status}
								<svg
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									aria-hidden="true"
									class={cn("file-status-in", item.status === "uploading" && "animate-spin motion-reduce:animate-none")}
								>
									{#if item.status === "done"}
										<circle cx="12" cy="12" r="10" />
										<path d="m9 12 2 2 4-4" />
									{:else if item.status === "error"}
										<circle cx="12" cy="12" r="10" />
										<path d="M12 8v4M12 16h.01" />
									{:else if item.status === "uploading"}
										<path d="M21 12a9 9 0 1 1-6.219-8.56" />
									{:else}
										<path d={FILE_SHEET} />
									{/if}
								</svg>
							{/key}
							<span class="sr-only">{ctx.labels[statusLabel(item.status)]}</span>
						</span>
						{#if item.status === "error" && onRetry}
							<button type="button" aria-label="{ctx.labels.retry} {name}" class={s.action()} onclick={() => onRetry?.()}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4" />
									<path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
								</svg>
							</button>
						{/if}
						{#if onRemove}
							<button type="button" aria-label="{ctx.labels.remove} {name}" class={s.action()} disabled={leaving} onclick={() => (leaving = true)}>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
									<path d="M18 6 6 18M6 6l12 12" />
								</svg>
							</button>
						{/if}
					</span>
				</span>
				<span
					role="progressbar"
					aria-label="{name}, {ctx.labels[statusLabel(item.status)]}"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(done ? 100 : clamped)}
					class={s.progress()}
				>
					<span class={s.bar()} style:scale="{(done ? 100 : clamped) / 100} 1"></span>
				</span>
			</span>
		</div>
	</div>
</li>
