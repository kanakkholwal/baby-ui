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
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const REGIONS = [
	{ value: "ams", label: "Amsterdam" },
	{ value: "blr", label: "Bengaluru" },
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "nrt", label: "Tokyo" },
	{ value: "syd", label: "Sydney" },
];

export function ComboboxDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ComboboxTrigger>>(props);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState("");
	const selected = REGIONS.find((r) => r.value === value);
	const size = p.size ?? "default";

	return (
		<Combobox open={open} onOpenChange={setOpen}>
			<ComboboxTrigger size={size}>
				{selected?.label ?? "Search regions…"}
				<svg
					viewBox="0 0 16 16"
					fill="none"
					aria-hidden
					className="size-3.5 shrink-0 text-muted-foreground"
				>
					<path
						d="m4 6 4 4 4-4"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</ComboboxTrigger>
			<ComboboxContent size={size}>
				<ComboboxInput placeholder="Search regions…" />
				<ComboboxList>
					<ComboboxEmpty>No matches</ComboboxEmpty>
					<ComboboxGroup>
						{REGIONS.map((region) => (
							<ComboboxItem
								key={region.value}
								value={region.value}
								keywords={region.label}
								onSelect={() => {
									setValue(region.value === value ? "" : region.value);
									setOpen(false);
								}}
							>
								{region.label}
								{region.value === value ? (
									<svg
										viewBox="0 0 14 14"
										fill="none"
										aria-hidden
										className="size-3.5 shrink-0"
									>
										<path
											d="M3 7.4 5.6 10 11 4.2"
											stroke="currentColor"
											strokeWidth="1.6"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								) : null}
							</ComboboxItem>
						))}
					</ComboboxGroup>
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
