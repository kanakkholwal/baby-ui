"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	ALERT_ICON,
	Alert,
	AlertDescription,
	AlertTitle,
	type AlertVariant,
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	type BadgeSize,
	type BadgeVariant,
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	type CardVariant,
	Checkbox,
	Input,
	type InputSize,
	Label,
	Progress,
	Skeleton,
	Switch,
	Textarea,
} from "@baby-ui/react";
import { useEffect, useId, useState } from "react";

type Props = Record<string, unknown>;

const SERVICES = [
	{ name: "image-resizer", tone: "warning", state: "Degraded" },
	{ name: "legacy-billing", tone: "destructive", state: "Down" },
] as const;

export function BadgeDemo({ props }: { props: Props }) {
	const size = (props.size as BadgeSize) ?? "md";
	return (
		<div className="flex w-72 flex-col gap-3 text-sm">
			<div className="flex items-center justify-between gap-4">
				<span className="text-muted-foreground">api-gateway</span>
				<Badge
					variant={(props.variant as BadgeVariant) ?? "success"}
					size={size}
					dot={props.dot !== false}
				>
					Healthy
				</Badge>
			</div>
			{SERVICES.map((service) => (
				<div key={service.name} className="flex items-center justify-between gap-4">
					<span className="text-muted-foreground">{service.name}</span>
					<Badge variant={service.tone} dot>
						{service.state}
					</Badge>
				</div>
			))}
		</div>
	);
}

export function AvatarDemo({ props }: { props: Props }) {
	const name = (props.name as string) || "Kanak Kholwal";
	const initials = name
		.trim()
		.split(/\s+/)
		.map((word) => word[0] ?? "")
		.slice(0, 2)
		.join("")
		.toUpperCase();
	return (
		<div className="flex items-center gap-3">
			<Avatar
				size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
				shape={(props.shape as "circle" | "square") ?? "circle"}
			>
				<AvatarFallback>{initials}</AvatarFallback>
				<AvatarImage src={(props.src as string) || undefined} alt={name} />
			</Avatar>
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
			interactive={props.interactive !== false}
			variant={(props.variant as CardVariant) ?? "default"}
			className="w-[min(28rem,calc(100vw-4rem))]"
		>
			<CardHeader>
				<CardTitle className="text-base">baby-ui</CardTitle>
				<CardDescription>baby-ui.nexonauts.com</CardDescription>
				<CardAction>
					<Badge variant="secondary">Next.js</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 text-sm">
				<div className="flex items-center gap-2">
					<span className="size-2 rounded-full bg-success" aria-hidden />
					<span className="font-medium text-foreground">Ready</span>
					<span className="ml-auto text-muted-foreground">Production</span>
					<span className="text-muted-foreground">Deployed 2h ago</span>
				</div>
				<div className="flex items-center gap-2 rounded-lg bg-foreground/[0.04] px-3 py-2">
					<svg
						viewBox="0 0 16 16"
						fill="none"
						aria-hidden
						className="size-4 shrink-0 text-muted-foreground"
					>
						<path
							d="M5 3v10M5 6a3 3 0 0 0 6 0"
							stroke="currentColor"
							strokeWidth="1.4"
							strokeLinecap="round"
						/>
						<circle cx="5" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.4" />
						<circle cx="11" cy="4" r="1.5" stroke="currentColor" strokeWidth="1.4" />
						<circle cx="5" cy="13" r="1.5" stroke="currentColor" strokeWidth="1.4" />
					</svg>
					<span className="font-medium text-foreground">main</span>
					<span className="truncate text-muted-foreground">
						feat(select): unfold from the trigger edge
					</span>
					<span className="ml-auto shrink-0 font-mono text-muted-foreground text-xs">
						20a9de6
					</span>
				</div>
			</CardContent>
			<CardFooter className="justify-end">
				<Button size="sm" variant="outline">
					Visit
				</Button>
				<Button size="sm">View deployment</Button>
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
	const [value, setValue] = useState(
		"Same field tokens as Input, so labels and focus rings stay consistent.",
	);
	return (
		<div className="w-full max-w-md">
			<Textarea
				value={value}
				onChange={(e) => setValue(e.currentTarget.value)}
				label={(props.label as string) ?? "Message"}
				description={props.description as string}
				size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
				variant={(props.variant as "outline" | "soft") ?? "outline"}
				rows={Number(props.rows ?? 4)}
				autoGrow={Boolean(props.autoGrow)}
				maxRows={Number(props.maxRows ?? 10)}
				showCount={Boolean(props.showCount)}
				invalid={Boolean(props.invalid)}
				disabled={Boolean(props.disabled)}
			/>
		</div>
	);
}

const SCOPES = ["Read repositories", "Write issues", "Manage webhooks"];

export function CheckboxDemo({ props }: { props: Props }) {
	const [checked, setChecked] = useState(false);
	const [scopes, setScopes] = useState([true, false, false]);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	const granted = scopes.filter(Boolean).length;

	return (
		<div className="flex w-72 flex-col gap-3">
			<Checkbox
				checked={granted === SCOPES.length}
				indeterminate={granted > 0 && granted < SCOPES.length}
				onCheckedChange={(next) => setScopes(SCOPES.map(() => next))}
				label="All permissions"
			/>
			<div className="flex flex-col gap-3 border-border border-l pl-4">
				{SCOPES.map((scope, i) => (
					<Checkbox
						key={scope}
						checked={scopes[i]}
						onCheckedChange={(next) =>
							setScopes(scopes.map((on, j) => (i === j ? next : on)))
						}
						label={scope}
					/>
				))}
			</div>
			<Checkbox
				checked={checked}
				onCheckedChange={setChecked}
				disabled={Boolean(props.disabled)}
				indeterminate={Boolean(props.indeterminate)}
				size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
				label={(props.label as string) || "Remember this grant"}
				description={
					(props.description as string) || "Skips the prompt for the next 30 days."
				}
			/>
		</div>
	);
}

// Switch renders its own label; reversing the row puts the text first without a second one.
const SWITCH_ROW = "flex w-full flex-row-reverse items-center justify-between gap-6";

export function SwitchDemo({ props }: { props: Props }) {
	const [checked, setChecked] = useState(false);
	const [digest, setDigest] = useState(true);
	useEffect(() => setChecked(Boolean(props.checked)), [props.checked]);
	const size = (props.size as "sm" | "md" | "lg" | "xl") ?? "md";

	return (
		<div className="flex w-72 flex-col divide-y divide-border rounded-xl border border-border">
			<div className="px-4 py-3">
				<Switch
					checked={checked}
					onCheckedChange={setChecked}
					disabled={Boolean(props.disabled)}
					size={size}
					label={(props.label as string) || "Push notifications"}
					className={SWITCH_ROW}
				/>
			</div>
			<div className="px-4 py-3">
				<Switch
					checked={digest}
					onCheckedChange={setDigest}
					label="Weekly digest"
					className={SWITCH_ROW}
				/>
			</div>
			<div className="px-4 py-3">
				<Switch checked={false} disabled label="SMS alerts" className={SWITCH_ROW} />
			</div>
		</div>
	);
}

export function ProgressDemo({ props }: { props: Props }) {
	const value = Number(props.value ?? 68);
	const indeterminate = Boolean(props.indeterminate);
	return (
		<div className="flex w-72 flex-col gap-2">
			<div className="flex items-baseline justify-between gap-4 text-sm">
				<span className="truncate text-foreground">design-system.zip</span>
				<span className="shrink-0 text-muted-foreground text-xs tabular-nums">
					{indeterminate ? "Preparing…" : `${value}%`}
				</span>
			</div>
			<Progress
				value={value}
				indeterminate={indeterminate}
				size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
				label="Upload progress"
			/>
			<p className="text-muted-foreground text-xs">12.4 MB of 18.2 MB · 6s remaining</p>
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
				<Skeleton width="60%" height="0.75rem" />
			</div>
		</div>
	);
}

export function AlertDemo({ props }: { props: Props }) {
	const variant = (props.variant as AlertVariant) ?? "info";
	return (
		<div className="w-full max-w-md">
			<Alert
				key={`${variant}-${String(props.dismissible)}`}
				variant={variant}
				dismissible={Boolean(props.dismissible)}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden>
					<circle cx="8" cy="8" r="6.4" stroke="currentColor" strokeWidth="1.3" />
					<path
						d={ALERT_ICON[variant]}
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				<AlertTitle>Deployment finished</AlertTitle>
				<AlertDescription>
					Your last deploy finished 4 minutes ago and is serving traffic.
				</AlertDescription>
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
	const type = (props.type as "single" | "multiple") ?? "single";
	const [value, setValue] = useState<string | string[]>("install");
	// Switching modes changes the value's shape, so it is reseeded rather than coerced.
	useEffect(() => setValue(type === "multiple" ? ["install"] : "install"), [type]);
	return (
		<div className="w-full max-w-md">
			<Accordion
				type={type}
				collapsible={props.collapsible !== false}
				value={value}
				onValueChange={setValue}
			>
				{ACCORDION_ITEMS.map((item) => (
					<AccordionItem key={item.id} value={item.id}>
						<AccordionTrigger>{item.title}</AccordionTrigger>
						<AccordionContent>{item.content}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}
