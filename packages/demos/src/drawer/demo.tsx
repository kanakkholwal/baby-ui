"use client";

import {
	Button,
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
	Slider,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { BTN } from "../shared/dialogs";

type Props = Record<string, unknown>;

export function DrawerDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Drawer>>(props);
	const pContent = controlProps<ComponentProps<typeof DrawerContent>>(props);
	const [open, setOpen] = useState(false);
	const [budget, setBudget] = useState(60);
	return (
		<Drawer
			open={open}
			onOpenChange={setOpen}
			direction={p.direction ?? "bottom"}
			dismissible={p.dismissible ?? true}
		>
			<DrawerTrigger className={BTN}>Set a budget</DrawerTrigger>
			<DrawerContent variant={pContent.variant ?? "default"}>
				<DrawerHeader>
					<DrawerTitle>Monthly budget</DrawerTitle>
					<DrawerDescription>
						Alerts go out when spend crosses this line.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerClose />
				<div className="mt-6 flex flex-col gap-4">
					<div className="flex items-baseline justify-between">
						<span className="text-muted-foreground text-sm">Limit</span>
						<span className="font-semibold text-3xl text-foreground tabular-nums">
							${budget}
						</span>
					</div>
					<Slider
						value={budget}
						onValueChange={(next) =>
							setBudget(typeof next === "number" ? next : (next[0] ?? 10))
						}
						min={10}
						max={200}
						step={5}
						label="Monthly budget"
					/>
					<p className="text-muted-foreground text-xs">Spent so far this month: $42.</p>
				</div>
				<DrawerFooter>
					<DrawerClose className="inline-flex h-9 items-center justify-center rounded-lg px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]">
						Cancel
					</DrawerClose>
					<Button onClick={() => setOpen(false)}>Save budget</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
