import { cn } from "../lib/cn";
import { ATTACHMENT_LABELS, type AttachmentLabels } from "./labels";
import { ATTACHMENT_ICON, type AttachmentStatus, attachment } from "./variants";

export type { AttachmentLabels, AttachmentStatus };

export interface AttachmentProps {
	name: string;
	/** Human-readable file size, shown once ready. */
	size?: string;
	status?: AttachmentStatus;
	/** Upload percentage, 0 to 100, while uploading. */
	progress?: number;
	/** Thumbnail URL, e.g. an object URL for an image being uploaded. */
	preview?: string;
	labels?: Partial<AttachmentLabels>;
	className?: string;
	onRemove?: () => void;
	/** Shows a retry action on failed uploads. */
	onRetry?: () => void;
}

export function Attachment({
	name,
	size,
	status = "ready",
	progress = 0,
	preview,
	labels,
	className,
	onRemove,
	onRetry,
}: AttachmentProps) {
	const l = { ...ATTACHMENT_LABELS, ...labels };
	const clamped = Math.min(100, Math.max(0, progress));
	const s = attachment({ status });
	const uploading = status === "uploading";
	const meta = uploading
		? `${l.uploading} ${Math.round(clamped)}%`
		: status === "error"
			? l.error
			: (size ?? l.ready);

	return (
		<div data-slot="attachment" data-status={status} className={cn(s.root(), className)}>
			<span aria-hidden="true" className={s.tile()}>
				{preview && status !== "error" ? (
					<img src={preview} alt="" className={s.thumb()} />
				) : (
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
						<path
							d={ATTACHMENT_ICON[status === "error" ? "error" : "file"]}
							stroke="currentColor"
							strokeWidth="1.2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				)}
			</span>

			<div className={s.body()}>
				<p className={s.name()}>{name}</p>
				<p className={s.meta()}>{meta}</p>
				<div className={s.progress()} inert={!uploading}>
					<div className="min-h-0 overflow-hidden">
						<div
							role="progressbar"
							aria-label={name}
							aria-valuemin={0}
							aria-valuemax={100}
							aria-valuenow={Math.round(clamped)}
							className={s.track()}
						>
							<div
								className={s.fill()}
								style={{ transform: `scaleX(${clamped / 100})` }}
							/>
						</div>
					</div>
				</div>
				{/* Announces state changes only; every percent would be noise. */}
				<span className="sr-only" aria-live="polite">
					{uploading ? "" : `${name}: ${l[status]}`}
				</span>
			</div>

			{status === "error" && onRetry ? (
				<button
					type="button"
					aria-label={`${l.retry} ${name}`}
					onClick={onRetry}
					className={s.action()}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
						<path
							d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			) : null}
			{onRemove ? (
				<button
					type="button"
					aria-label={`${l.remove} ${name}`}
					onClick={onRemove}
					className={s.action()}
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-3.5">
						<path
							d="m4 4 8 8M12 4l-8 8"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			) : null}
		</div>
	);
}
