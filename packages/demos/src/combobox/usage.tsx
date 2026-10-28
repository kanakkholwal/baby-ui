"use client";

import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxGroup,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
	ComboboxTrigger,
} from "@baby-ui/react";
import { useState } from "react";

const regions = [
	{ value: "iad1", label: "Washington, D.C." },
	{ value: "fra1", label: "Frankfurt" },
	{ value: "bom1", label: "Mumbai" },
];

export function Example() {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const selected = regions.find((r) => r.value === value);

	return (
		<Combobox open={open} onOpenChange={setOpen}>
			<ComboboxTrigger>{selected?.label ?? "Select region…"}</ComboboxTrigger>
			<ComboboxContent>
				<ComboboxInput placeholder="Search regions…" />
				<ComboboxList>
					<ComboboxEmpty>No matches</ComboboxEmpty>
					<ComboboxGroup>
						{regions.map((region) => (
							<ComboboxItem
								key={region.value}
								value={region.value}
								keywords={region.label}
								onClick={() => {
									setValue(region.value);
									setOpen(false);
								}}
							>
								{region.label}
							</ComboboxItem>
						))}
					</ComboboxGroup>
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
