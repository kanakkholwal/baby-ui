"use client";

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@baby-ui/react";
import { useState } from "react";

type Props = Record<string, unknown>;

export function ContextMenuDemo(_: { props: Props }) {
	const [last, setLast] = useState("");
	const [grid, setGrid] = useState(true);
	const [sort, setSort] = useState("name");
	return (
		<div className="flex flex-col items-center gap-3">
			<ContextMenu>
				<ContextMenuTrigger>
					<div className="grid size-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm">
						Right-click anywhere here
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent>
					<ContextMenuItem onClick={() => setLast("open")}>
						Open in editor
						<ContextMenuShortcut>⏎</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuItem onClick={() => setLast("copy")}>
						Copy path
						<ContextMenuShortcut>⌘C</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuSub>
						<ContextMenuSubTrigger>Arrange</ContextMenuSubTrigger>
						<ContextMenuSubContent>
							<ContextMenuItem onClick={() => setLast("bring-to-front")}>
								Bring to front
							</ContextMenuItem>
							<ContextMenuItem onClick={() => setLast("bring-forward")}>
								Bring forward
							</ContextMenuItem>
							<ContextMenuItem onClick={() => setLast("send-backward")}>
								Send backward
							</ContextMenuItem>
							<ContextMenuItem onClick={() => setLast("send-to-back")}>
								Send to back
							</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSeparator />
					<ContextMenuCheckboxItem checked={grid} onCheckedChange={setGrid}>
						Show grid
					</ContextMenuCheckboxItem>
					<ContextMenuLabel inset>Sort by</ContextMenuLabel>
					<ContextMenuRadioGroup value={sort} onValueChange={setSort}>
						<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
						<ContextMenuRadioItem value="date">Date modified</ContextMenuRadioItem>
					</ContextMenuRadioGroup>
					<ContextMenuSeparator />
					<ContextMenuItem variant="destructive" onClick={() => setLast("delete")}>
						Delete
						<ContextMenuShortcut>⌫</ContextMenuShortcut>
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>
			{last ? <p className="text-muted-foreground text-xs">Selected: {last}</p> : null}
		</div>
	);
}
