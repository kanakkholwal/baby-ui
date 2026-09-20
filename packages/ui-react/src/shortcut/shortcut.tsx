import { cn } from "../lib/cn";

// Written out so a screen reader says "Control K", not "ctrl plus k".
const SPOKEN: Record<string, string> = {
	"⌘": "Command",
	"⌃": "Control",
	"⌥": "Option",
	"⇧": "Shift",
	"↵": "Enter",
	"⎋": "Escape",
};

const SIZE = { sm: "h-4 min-w-4 px-1 text-[10px]", md: "h-5 min-w-5 px-1.5 text-[11px]" };

export interface ShortcutProps {
	keys: string[];
	size?: "sm" | "md";
	className?: string;
}

export function Shortcut({ keys, size = "md", className }: ShortcutProps) {
	const spoken = keys.map((k) => SPOKEN[k] ?? k).join(" then ");

	return (
		<span className={cn("inline-flex items-center gap-1", className)}>
			<span className="sr-only">{spoken}</span>
			{keys.map((key) => (
				<kbd
					key={key}
					aria-hidden
					className={cn(
						"inline-flex items-center justify-center rounded border border-border bg-card font-mono text-muted-foreground",
						SIZE[size],
					)}
				>
					{key}
				</kbd>
			))}
		</span>
	);
}
