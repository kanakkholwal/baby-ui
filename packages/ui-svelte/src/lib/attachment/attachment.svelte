<script lang="ts">
import { cn } from "../lib/cn";
import { ATTACHMENT_LABELS, type AttachmentLabels } from "./labels";
import { ATTACHMENT_ICON, type AttachmentStatus, attachment } from "./variants";

let {
	name,
	size,
	status = "ready",
	progress = 0,
	preview,
	labels,
	class: classProp,
	onremove,
	onretry,
}: {
	name: string;
	/** Human-readable file size, shown once ready. */
	size?: string;
	status?: AttachmentStatus;
	/** Upload percentage, 0 to 100, while uploading. */
	progress?: number;
	/** Thumbnail URL, e.g. an object URL for an image being uploaded. */
	preview?: string;
	labels?: Partial<AttachmentLabels>;
	class?: string;
	onremove?: () => void;
	/** Shows a retry action on failed uploads. */
	onretry?: () => void;
} = $props();

const l = $derived({ ...ATTACHMENT_LABELS, ...labels });
const clamped = $derived(Math.min(100, Math.max(0, progress)));
const s = $derived(attachment({ status }));
const uploading = $derived(status === "uploading");
const meta = $derived(
	uploading
		? `${l.uploading} ${Math.round(clamped)}%`
		: status === "error"
			? l.error
			: (size ?? l.ready),
);
</script>

<div data-slot="attachment" data-status={status} class={cn(s.root(), classProp)}>
	<span aria-hidden="true" class={s.tile()}>
		{#if preview && status !== "error"}
			<img src={preview} alt="" class={s.thumb()} />
		{:else}
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
				<path
					d={ATTACHMENT_ICON[status === "error" ? "error" : "file"]}
					stroke="currentColor"
					stroke-width="1.2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	</span>

	<div class={s.body()}>
		<p class={s.name()}>{name}</p>
		<p class={s.meta()}>{meta}</p>
		<div class={s.progress()} inert={!uploading}>
			<div class="min-h-0 overflow-hidden">
				<div
					role="progressbar"
					aria-label={name}
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={Math.round(clamped)}
					class={s.track()}
				>
					<div class={s.fill()} style:transform="scaleX({clamped / 100})"></div>
				</div>
			</div>
		</div>
		<!-- Announces state changes only; every percent would be noise. -->
		<span class="sr-only" aria-live="polite">{uploading ? "" : `${name}: ${l[status]}`}</span>
	</div>

	{#if status === "error" && onretry}
		<button type="button" aria-label="{l.retry} {name}" onclick={onretry} class={s.action()}>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<path
					d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	{/if}
	{#if onremove}
		<button type="button" aria-label="{l.remove} {name}" onclick={onremove} class={s.action()}>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
			</svg>
		</button>
	{/if}
</div>
