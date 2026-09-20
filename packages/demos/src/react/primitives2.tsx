"use client";

import {
	Collapsible,
	Gauge,
	Pagination,
	ScrollArea,
	Shortcut,
	ShowMore,
	Spinner,
	Toggle,
	ToggleGroup,
	Typography,
	type TypographyVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const LOREM =
	"Components here are copied into your project rather than installed, which means you own the source and can change anything. The registry only decides what the first version looks like. Every port satisfies the same ComponentSpec, so the React and Svelte builds behave identically even though neither is generated from the other.";

export function SpinnerDemo({ props }: { props: Props }) {
	const label = (props.label as string) || "Loading results";
	return (
		<div className="flex items-center gap-3 text-muted-foreground">
			<Spinner size={(props.size as "sm" | "md" | "lg") ?? "md"} label={label} />
			<span className="text-sm">{label}</span>
		</div>
	);
}

export function ToggleDemo({ props }: { props: Props }) {
	const [pressed, setPressed] = useState(false);
	useEffect(() => setPressed(Boolean(props.pressed)), [props.pressed]);
	return (
		<Toggle
			pressed={pressed}
			onPressedChange={setPressed}
			size={(props.size as "sm" | "md") ?? "md"}
			disabled={Boolean(props.disabled)}
			label={(props.label as string) || "Bold"}
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
				<path
					d="M5 3h4.5a2.5 2.5 0 0 1 0 5H5zm0 5h5a2.5 2.5 0 0 1 0 5H5z"
					stroke="currentColor"
					strokeWidth="1.4"
					strokeLinejoin="round"
				/>
			</svg>
		</Toggle>
	);
}

const VIEWS = [
	{ value: "list", label: "List" },
	{ value: "grid", label: "Grid" },
	{ value: "board", label: "Board" },
];

export function ToggleGroupDemo({ props }: { props: Props }) {
	const [value, setValue] = useState<string | string[]>("grid");
	return (
		<ToggleGroup
			options={VIEWS}
			value={value}
			onValueChange={setValue}
			multiple={Boolean(props.multiple)}
			disabled={Boolean(props.disabled)}
			label="View"
		/>
	);
}

export function CollapsibleDemo({ props }: { props: Props }) {
	return (
		<div className="w-80">
			<Collapsible label={(props.label as string) || "Advanced options"}>
				Build command, install command and the output directory. Changing these rebuilds
				every preview deployment.
			</Collapsible>
		</div>
	);
}

export function ShowMoreDemo({ props }: { props: Props }) {
	return (
		<div className="w-80">
			<ShowMore
				lines={Number(props.lines ?? 3)}
				maxHeight={Number(props.maxHeight ?? 320)}
				moreLabel={(props.moreLabel as string) || "Show more"}
				lessLabel={(props.lessLabel as string) || "Show less"}
			>
				<p>{LOREM}</p>
			</ShowMore>
		</div>
	);
}

export function ShortcutDemo({ props }: { props: Props }) {
	const size = (props.size as "sm" | "md") ?? "md";
	return (
		<div className="flex flex-col gap-2 text-sm">
			<div className="flex items-center justify-between gap-6">
				<span className="text-muted-foreground">Command palette</span>
				<Shortcut keys={["⌘", "K"]} size={size} />
			</div>
			<div className="flex items-center justify-between gap-6">
				<span className="text-muted-foreground">Save</span>
				<Shortcut keys={["⌘", "S"]} size={size} />
			</div>
		</div>
	);
}

export function TypographyDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-80 flex-col gap-3">
			<Typography variant="h2">Ship it twice</Typography>
			<Typography variant={(props.variant as TypographyVariant) ?? "body"}>
				One spec, two implementations, one token layer. Change the variant control to see
				each level.
			</Typography>
		</div>
	);
}

export function GaugeDemo({ props }: { props: Props }) {
	return (
		<div className="flex items-center gap-6">
			<Gauge
				value={Number(props.value ?? 68)}
				size={Number(props.size ?? 96)}
				thickness={Number(props.thickness ?? 8)}
				tone={(props.tone as "default" | "success" | "warning" | "danger") ?? "default"}
				label="Performance score"
			/>
			<p className="max-w-40 text-muted-foreground text-xs">
				A meter is a reading, not a task in progress.
			</p>
		</div>
	);
}

export function PaginationDemo({ props }: { props: Props }) {
	const [page, setPage] = useState(4);
	useEffect(() => setPage(Number(props.page ?? 4)), [props.page]);
	return (
		<Pagination
			page={page}
			onPageChange={setPage}
			total={Number(props.total ?? 12)}
			siblings={Number(props.siblings ?? 1)}
		/>
	);
}

const REGIONS = [
	"Amsterdam",
	"Bengaluru",
	"Cape Town",
	"Dublin",
	"Frankfurt",
	"Hong Kong",
	"Johannesburg",
	"London",
	"Mumbai",
	"Paris",
	"São Paulo",
	"Singapore",
	"Sydney",
	"Tokyo",
	"Toronto",
	"Washington DC",
];

export function ScrollAreaDemo({ props }: { props: Props }) {
	return (
		<div className="w-64 rounded-xl border border-border bg-card p-1">
			<ScrollArea maxHeight={(props.maxHeight as string) || "12rem"}>
				<ul className="flex flex-col">
					{REGIONS.map((region) => (
						<li
							key={region}
							className="rounded-lg px-3 py-2 text-foreground text-sm hover:bg-foreground/[0.04]"
						>
							{region}
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}
