import { cn } from "../lib/cn";

export type DiffLine = { kind: "add" | "remove" | "context"; text: string };

const MARK = { add: "+", remove: "-", context: " " };
const TONE = {
	add: "bg-[color-mix(in_oklch,var(--success)_12%,transparent)] text-foreground",
	remove: "bg-[color-mix(in_oklch,var(--destructive)_12%,transparent)] text-foreground",
	context: "text-muted-foreground",
};

export interface FileDiffProps {
	filename: string;
	lines: DiffLine[];
	showLineNumbers?: boolean;
	className?: string;
}

export function FileDiff({
	filename,
	lines,
	showLineNumbers = true,
	className,
}: FileDiffProps) {
	const added = lines.filter((l) => l.kind === "add").length;
	const removed = lines.filter((l) => l.kind === "remove").length;

	return (
		<div
			className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}
		>
			<div className="flex items-center justify-between gap-3 border-border border-b bg-background/60 px-4 py-2.5">
				<span className="truncate font-mono text-foreground text-xs">{filename}</span>
				<span className="flex shrink-0 items-center gap-2 font-mono text-[11px]">
					<span className="text-[var(--success)]">+{added}</span>
					<span className="text-[var(--destructive)]">-{removed}</span>
				</span>
			</div>

			<div className="overflow-x-auto font-mono text-[13px] leading-relaxed">
				{lines.map((line, i) => (
					<div key={i} className={cn("flex whitespace-pre px-4", TONE[line.kind])}>
						{showLineNumbers ? (
							<span
								aria-hidden
								className="mr-3 inline-block w-6 shrink-0 select-none text-right text-muted-foreground/60"
							>
								{i + 1}
							</span>
						) : null}
						<span aria-hidden className="mr-2 inline-block w-2 shrink-0 select-none">
							{MARK[line.kind]}
						</span>
						<span>
							<span className="sr-only">
								{line.kind === "add"
									? "Added: "
									: line.kind === "remove"
										? "Removed: "
										: ""}
							</span>
							{line.text || " "}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
