"use client";

import { Button, Shortcut } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const ROWS: [string, string][] = [
	["Search", "cmd+k"],
	["Toggle sidebar", "cmd+b"],
	["Settings", "cmd+,"],
];

export function ShortcutDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Shortcut>>(props);
	const variant = p.variant ?? "default";
	const size = p.size ?? "default";
	const [log, setLog] = useState<string[]>([]);
	const note = (action: string) => setLog((prev) => [action, ...prev].slice(0, 3));
	return (
		<div className="flex w-full max-w-80 flex-col gap-3 text-sm">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" onClick={() => note("New file")}>
					New file
					<Shortcut
						shortcut={p.shortcut || "cmd+n"}
						variant={variant}
						size={size}
						joined={p.joined ?? false}
					/>
				</Button>
				<Button size="sm" onClick={() => note("Sent")}>
					Send
					<Shortcut shortcut="cmd+enter" />
				</Button>
			</div>
			<div className="divide-y divide-border rounded-xl border border-border">
				{ROWS.map(([label, keys]) => (
					<button
						key={keys}
						type="button"
						onClick={() => note(label)}
						className="flex w-full items-center justify-between px-3 py-2 text-left text-foreground transition-colors hover:bg-foreground/[0.04]"
					>
						{label}
						<Shortcut shortcut={keys} variant="ghost" />
					</button>
				))}
			</div>
			<p className="min-h-4 text-muted-foreground text-xs">
				{log.length ? `Fired: ${log.join(", ")}` : "Press a shortcut or click a row"}
			</p>
		</div>
	);
}
