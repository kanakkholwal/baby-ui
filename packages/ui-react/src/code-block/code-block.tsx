import { CopyButton } from "../copy-button/copy-button";
import { cn } from "../lib/cn";

export interface CodeBlockProps {
	code: string;
	language?: string;
	filename?: string;
	showLineNumbers?: boolean;
	maxHeight?: string;
	className?: string;
}

export function CodeBlock({
	code,
	language = "ts",
	filename,
	showLineNumbers = false,
	maxHeight = "24rem",
	className,
}: CodeBlockProps) {
	const lines = code.replace(/\n$/, "").split("\n");

	return (
		<div
			className={cn(
				"group relative overflow-hidden rounded-xl border border-border bg-card font-mono text-[13px]",
				className,
			)}
		>
			{filename ? (
				<div className="flex items-center justify-between gap-3 border-border border-b bg-background/60 px-4 py-2.5">
					<div className="flex min-w-0 items-center gap-2 text-xs">
						<span className="inline-flex h-5 shrink-0 items-center rounded border border-border bg-card px-1.5 font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
							{language}
						</span>
						<span className="truncate text-foreground">{filename}</span>
					</div>
					<CopyButton text={code} iconOnly />
				</div>
			) : (
				<div className="absolute top-2.5 right-2.5 z-10 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
					<CopyButton text={code} iconOnly />
				</div>
			)}

			<pre
				style={{ maxHeight }}
				className="scroll-area overflow-auto py-4 leading-relaxed"
			>
				<code>
					{lines.map((line, i) => (
						<span key={i} className="flex px-5">
							{showLineNumbers ? (
								<span
									aria-hidden
									className="mr-4 inline-block w-6 shrink-0 select-none text-right text-muted-foreground/60"
								>
									{i + 1}
								</span>
							) : null}
							<span className="text-foreground">{line || " "}</span>
						</span>
					))}
				</code>
			</pre>
		</div>
	);
}
