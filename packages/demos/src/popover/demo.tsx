"use client";

import {
	Button,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Switch,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { TRIGGER } from "../shared/overlays";

type Props = Record<string, unknown>;

// Switch renders its own label; reversing the row puts the text first without a second one.
const SWITCH_ROW = "flex w-full flex-row-reverse items-center justify-between gap-4";

export function PopoverDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PopoverContent>>(props);
	const [autoDeploy, setAutoDeploy] = useState(true);
	const [comments, setComments] = useState(false);

	return (
		<Popover>
			<PopoverTrigger className={TRIGGER}>Deploy settings</PopoverTrigger>
			<PopoverContent
				size={p.size}
				side={p.side ?? "bottom"}
				sideOffset={Number(p.sideOffset ?? 4)}
				align={p.align ?? "center"}
			>
				<div className="flex flex-col gap-3">
					<Label>Preview branches</Label>
					<Switch
						checked={autoDeploy}
						onCheckedChange={setAutoDeploy}
						size="sm"
						label="Auto deploy"
						className={SWITCH_ROW}
					/>
					<Switch
						checked={comments}
						onCheckedChange={setComments}
						size="sm"
						label="Comment on PRs"
						className={SWITCH_ROW}
					/>
					<Button size="sm" className="mt-1 w-full">
						Save
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
