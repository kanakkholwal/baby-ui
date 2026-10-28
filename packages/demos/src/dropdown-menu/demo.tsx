"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { TRIGGER } from "../shared/overlays";

type Props = Record<string, unknown>;

export function DropdownMenuDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof DropdownMenuContent>>(props);
	const [last, setLast] = useState("");
	return (
		<div className="flex flex-col items-center gap-3">
			<DropdownMenu>
				<DropdownMenuTrigger className={TRIGGER}>Actions</DropdownMenuTrigger>
				<DropdownMenuContent
					size={p.size}
					side={p.side ?? "bottom"}
					align={p.align ?? "start"}
				>
					<DropdownMenuLabel>This file</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => setLast("rename")}>
						Rename
						<DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setLast("duplicate")}>
						Duplicate
						<DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>Archive</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>Arrange</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuItem onClick={() => setLast("bring-to-front")}>
								Bring to front
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setLast("bring-forward")}>
								Bring forward
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setLast("send-backward")}>
								Send backward
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setLast("send-to-back")}>
								Send to back
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
					<DropdownMenuSeparator />
					<DropdownMenuItem destructive onClick={() => setLast("delete")}>
						Delete
						<DropdownMenuShortcut>⌫</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{last ? <p className="text-muted-foreground text-xs">Selected: {last}</p> : null}
		</div>
	);
}
