"use client";

import {
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@baby-ui/react";
import { type ComponentProps, useId, useState } from "react";
import { controlProps } from "../data/preview-props";
import { BTN } from "../shared/dialogs";

type Props = Record<string, unknown>;

const REGIONS = [
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "syd", label: "Sydney" },
];

export function SheetDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SheetContent>>(props);
	const [region, setRegion] = useState("fra");
	const id = useId();
	return (
		<Sheet>
			<SheetTrigger className={BTN}>Open sheet</SheetTrigger>
			<SheetContent side={p.side ?? "right"} variant={p.variant ?? "default"}>
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
					<SheetClose />
				</SheetHeader>
				<div className="flex flex-col gap-1.5">
					<Label htmlFor={id}>Region</Label>
					<Select value={region} onValueChange={setRegion} items={REGIONS}>
						<SelectTrigger id={id} aria-label="Region">
							<SelectValue placeholder="Pick a region" />
						</SelectTrigger>
						<SelectContent>
							{REGIONS.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<p className="text-muted-foreground text-sm">
					Escape closes the sheet and restores focus.
				</p>
			</SheetContent>
		</Sheet>
	);
}
