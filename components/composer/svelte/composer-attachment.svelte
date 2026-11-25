<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	name,
	src,
	icon,
	progress,
	error,
	onRemove,
	removeLabel = "Remove attachment",
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
	name?: string;
	src?: string;
	icon?: Snippet;
	/** 0 to 100 while uploading; leave it out once the file is ready. */
	progress?: number;
	/** The upload failed: the tile turns destructive and shows this text, or "Failed". */
	error?: boolean | string;
	onRemove?: () => void;
	removeLabel?: string;
} = $props();
const ctx = composerState("ComposerAttachment");
$effect(() => ctx.registerAttachment());
</script>

<!-- One attachment tile: src for an image, or icon and name for a file. progress shows an upload. -->
<div data-slot="composer-attachment" data-error={error ? true : undefined} class={cn(ctx.styles.attachment(), classProp)} {...rest}>
	{#if src}
		<img {src} alt={name ?? ""} class={ctx.styles.attachmentImage()} />
	{:else}
		<span aria-hidden="true" class={ctx.styles.attachmentIcon()}>{@render icon?.()}</span>
	{/if}
	{#if !src && name}<span class={ctx.styles.attachmentName()}>{name}</span>{/if}
	{#if error}
		<span class="absolute top-1.5 right-2 font-medium text-xs">{typeof error === "string" ? error : "Failed"}</span>
	{:else if progress !== undefined}
		<span class="absolute top-1.5 right-2 font-medium text-primary text-xs tabular-nums">{Math.round(progress)}%</span>
		<span
			role="progressbar"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(progress)}
			aria-label={name}
			class={ctx.styles.attachmentProgress()}
			style:scale="{Math.min(100, Math.max(0, progress)) / 100} 1"
		></span>
	{/if}
	{#if onRemove}
		<button type="button" aria-label={removeLabel} onclick={onRemove} class={ctx.styles.attachmentRemove()}>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path d="M6 6l12 12M18 6 6 18" />
			</svg>
		</button>
	{/if}
</div>
