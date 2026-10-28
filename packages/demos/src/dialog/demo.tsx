"use client";

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	Label,
} from "@baby-ui/react";
import { type ComponentProps, useId, useState } from "react";
import { controlProps } from "../data/preview-props";
import { BTN } from "../shared/dialogs";

type Props = Record<string, unknown>;

export function DialogDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Dialog>>(props);
	const [open, setOpen] = useState(false);
	const [domain, setDomain] = useState("");
	const id = useId();
	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
			motion={p.motion ?? "zoom"}
			size={p.size ?? "default"}
			variant={p.variant ?? "default"}
			dismissOnBackdrop={p.dismissOnBackdrop ?? true}
		>
			<DialogTrigger className={BTN}>Add domain</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						<svg viewBox="0 0 20 20" fill="none" aria-hidden>
							<circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.5" />
							<path
								d="M2.5 10h15M10 2.5c2.5 2.5 2.5 12.5 0 15M10 2.5c-2.5 2.5-2.5 12.5 0 15"
								stroke="currentColor"
								strokeWidth="1.5"
							/>
						</svg>
						Add a domain
					</DialogTitle>
					<DialogDescription>
						Add an existing domain to your baby-ui project.
					</DialogDescription>
				</DialogHeader>
				<DialogClose />
				<div className="mt-4 flex flex-col gap-1.5">
					<Label htmlFor={id}>Domain</Label>
					<Input
						id={id}
						value={domain}
						onChange={(e) => setDomain(e.currentTarget.value)}
						placeholder="example.com"
					/>
					<p className="text-muted-foreground text-sm">
						We'll guide you through DNS configuration next.
					</p>
				</div>
				<DialogFooter>
					<Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button size="sm" className="ml-auto" onClick={() => setOpen(false)}>
						Add
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
