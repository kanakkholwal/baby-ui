"use client";

import type { AlertVariant, BadgeSize, BadgeVariant, InputSize } from "@baby-ui/react";
import {
	Accordion,
	Alert,
	Avatar,
	Badge,
	Button,
	Card,
	CardFooter,
	CardHeader,
	Checkbox,
	Input,
	Label,
	Progress,
	Skeleton,
	Switch,
	Textarea,
} from "@baby-ui/react";
import { useEffect, useId, useState } from "react";

type Props = Record<string, unknown>;

export function BadgeDemo({ props }: { props: Props }) {
	return (
		<Badge
			variant={(props.variant as BadgeVariant) ?? "secondary"}
			size={(props.size as BadgeSize) ?? "md"}
			dot={Boolean(props.dot)}
		>
			Production
		</Badge>
	);
}

export function AvatarDemo({ props }: { props: Props }) {
	const name = (props.name as string) || "Kanak Kholwal";
	return (
		<div className="flex items-center gap-3">
			<Avatar
				name={name}
				src={(props.src as string) || undefined}
				size={(props.size as "xs" | "sm" | "md" | "lg") ?? "md"}
				shape={(props.shape as "circle" | "square") ?? "circle"}
			/>
			<div className="text-sm">
				<p className="font-medium text-foreground">{name}</p>
				<p className="text-muted-foreground text-xs">
					Fallback shows until an image loads
				</p>
			</div>
		</div>
	);
}

export function CardDemo({ props }: { props: Props }) {
	return (
		<Card
			padding={(props.padding as "sm" | "md" | "lg") ?? "md"}
			interactive={Boolean(props.interactive)}
			className="w-80"
		>
			<CardHeader
				title="Deploy preview"
				description="Builds on every push to a branch."
			/>
			<p className="mt-3 text-muted-foreground text-sm">
				Previews are torn down when the branch is deleted.
			</p>
			<CardFooter>
				<Button size="sm">Open</Button>
				<Button size="sm" variant="ghost">
					Settings
				</Button>
			</CardFooter>
		</Card>
	);
}

export function InputDemo({ props }: { props: Props }) {
	const id = useId();
	const [value, setValue] = useState("");
	return (
		<div className="flex w-72 flex-col gap-1.5">
			<Label htmlFor={id} required>
				Workspace name
			</Label>
			<Input
				id={id}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				size={(props.size as InputSize) ?? "md"}
				invalid={Boolean(props.invalid)}
				disabled={Boolean(props.disabled)}
				placeholder={(props.placeholder as string) || "Enter a value"}
			/>
			{props.invalid ? (
				<p className="text-[var(--destructive)] text-xs">That name is already taken.</p>
			) : null}
		</div>
	);
}

export function LabelDemo({ props }: { props: Props }) {
	const id = useId();
	return (
		<div className="flex w-72 flex-col gap-1.5">
			<Label
				htmlFor={id}
				required={Boolean(props.required)}
				disabled={Boolean(props.disabled)}
			>
				Email address
			</Label>
			<Input id={id} placeholder="you@example.com" disabled={Boolean(props.disabled)} />
		</div>
	);
}

export function TextareaDemo({ props }: { props: Props }) {
	const id = useId();
	const [value, setValue] = useState(
		"Type a few lines and watch the field grow with the content.",
	);
	return (
		<div className="flex w-80 flex-col gap-1.5">
			<Label htmlFor={id}>Release notes</Label>
			<Textarea
				id={id}
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				rows={Number(props.rows ?? 3)}
				autoGrow={props.autoGrow !== false}
				maxRows={Number(props.maxRows ?? 10)}
				invalid={Boolean(props.invalid)}
				disabled={Boolean(props.disabled)}
			/>
		</div>
	);
}

export function CheckboxDemo({ props }: { props: Props }) {
	const [checked, setChecked] = useState(false);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	return (
		<Checkbox
			checked={checked}
			onCheckedChange={setChecked}
			indeterminate={Boolean(props.indeterminate)}
			disabled={Boolean(props.disabled)}
			label={(props.label as string) || "Accept terms"}
		/>
	);
}

export function SwitchDemo({ props }: { props: Props }) {
	const [checked, setChecked] = useState(false);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	const label = (props.label as string) || "Notifications";
	return (
		<div className="flex items-center gap-3">
			<Switch
				checked={checked}
				onCheckedChange={setChecked}
				disabled={Boolean(props.disabled)}
				size={(props.size as "sm" | "md") ?? "md"}
				label={label}
			/>
			<span className="text-muted-foreground text-sm">{label}</span>
		</div>
	);
}

export function ProgressDemo({ props }: { props: Props }) {
	return (
		<div className="w-72">
			<Progress
				value={Number(props.value ?? 40)}
				indeterminate={Boolean(props.indeterminate)}
				size={(props.size as "sm" | "md") ?? "md"}
				label="Upload progress"
			/>
		</div>
	);
}

export function SkeletonDemo({ props }: { props: Props }) {
	const shape = (props.shape as "line" | "circle" | "block") ?? "line";
	return (
		<div className="flex w-72 items-center gap-3">
			<Skeleton width="2.5rem" height="2.5rem" shape="circle" />
			<div className="flex flex-1 flex-col gap-2">
				<Skeleton
					width={(props.width as string) || "100%"}
					height={(props.height as string) || "1rem"}
					shape={shape}
				/>
				<Skeleton width="60%" height="0.75rem" shape={shape} />
			</div>
		</div>
	);
}

export function AlertDemo({ props }: { props: Props }) {
	const variant = (props.variant as AlertVariant) ?? "info";
	return (
		<div className="w-96">
			<Alert
				key={`${variant}-${String(props.dismissible)}`}
				variant={variant}
				title={(props.title as string) || undefined}
				dismissible={Boolean(props.dismissible)}
			>
				Your last deploy finished 4 minutes ago and is serving traffic.
			</Alert>
		</div>
	);
}

const ACCORDION_ITEMS = [
	{
		id: "install",
		title: "How do I install a component?",
		content:
			"Run the CLI command on the Install tab. It copies the source into your project.",
	},
	{
		id: "own",
		title: "Do I own the code?",
		content:
			"Yes. Nothing is imported from a package at runtime, so you can edit any file freely.",
	},
	{
		id: "update",
		title: "How do updates work?",
		content: "Re-run the add command. The CLI will show you a diff before overwriting.",
	},
];

export function AccordionDemo({ props }: { props: Props }) {
	return (
		<div className="w-96">
			<Accordion
				items={ACCORDION_ITEMS}
				multiple={Boolean(props.multiple)}
				collapsible={props.collapsible !== false}
			/>
		</div>
	);
}
