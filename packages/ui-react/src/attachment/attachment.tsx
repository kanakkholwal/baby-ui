import { cn } from "../lib/cn";
import { type AttachmentStatus, attachment } from "./variants";

export interface AttachmentProps {
	name: string;
	size?: string;
	status?: AttachmentStatus;
	progress?: number;
	className?: string;
	onRemove?: () => void;
}

export function Attachment({
	name,
	size,
	status = "ready",
	progress = 0,
	className,
	onRemove,
}: AttachmentProps) {
	const clamped = Math.min(100, Math.max(0, progress));
	const frame = attachment({ status });

	return (
		<div className={cn(frame.root(), className)}>
			<span
				aria-hidden
				className="grid size-9 shrink-0 place-items-center rounded-lg bg-background text-muted-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
					<path
						d="M9 1.5H4A1.5 1.5 0 0 0 2.5 3v10A1.5 1.5 0 0 0 4 14.5h8a1.5 1.5 0 0 0 1.5-1.5V6L9 1.5zM9 1.5V6h4.5"
						stroke="currentColor"
						strokeWidth="1.2"
						strokeLinejoin="round"
					/>
				</svg>
			</span>

			<div className="min-w-0 flex-1">
				<p className="truncate font-medium text-foreground text-sm">{name}</p>
				{status === "uploading" ? (
					<>
						<div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-input">
							<div
								style={{ width: `${clamped}%` }}
								className="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)]"
							/>
						</div>
						<p className="mt-1 text-muted-foreground text-xs">
							Uploading {Math.round(clamped)}%
						</p>
					</>
				) : (
					<p className={frame.meta()}>
						{status === "error" ? "Upload failed" : (size ?? "Ready")}
					</p>
				)}
			</div>

			{onRemove ? (
				<button
					type="button"
					aria-label={`Remove ${name}`}
					onClick={onRemove}
					className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-3.5">
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
