"use client";

import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Message,
	type MessageLayout,
	type MessageMotion,
	type MessageTone,
	RadioGroup,
	RadioGroupItem,
	Reasoning,
	ResponseStream,
	Slider,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	type TabsVariant,
	TaskSteps,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

export function BreadcrumbDemo({ props }: { props: Props }) {
	const collapsed = props.collapsed !== false;
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{collapsed ? (
					<BreadcrumbItem>
						<BreadcrumbEllipsis />
					</BreadcrumbItem>
				) : (
					<>
						<BreadcrumbItem>
							<BreadcrumbLink href="/components">Components</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/components/base">Base</BreadcrumbLink>
						</BreadcrumbItem>
					</>
				)}
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}

const RADIO_OPTIONS = [
	{ value: "daily", label: "Daily digest" },
	{ value: "weekly", label: "Weekly summary" },
	{ value: "never", label: "Never" },
];

export function RadioGroupDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("weekly");
	return (
		<RadioGroup
			value={value}
			onValueChange={setValue}
			orientation={(props.orientation as "vertical" | "horizontal") ?? "vertical"}
			variant={(props.variant as "default" | "card") ?? "default"}
			size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
			disabled={Boolean(props.disabled)}
			name="demo-radio"
		>
			{RADIO_OPTIONS.map((option) => (
				<RadioGroupItem key={option.value} value={option.value} label={option.label} />
			))}
		</RadioGroup>
	);
}

export function SliderDemo({ props }: { props: Props }) {
	const orientation = (props.orientation as "horizontal" | "vertical") ?? "horizontal";
	const range = Boolean(props.range);
	const [value, setValue] = useState<number | number[]>(50);
	useEffect(() => {
		setValue(range ? [25, 75] : Number(props.value ?? 50));
	}, [range, props.value]);

	const display = Array.isArray(value) ? `${value[0]}–${value[1]}` : value;

	const wrapperClass =
		orientation === "vertical" ? "flex flex-row gap-3" : "flex w-72 flex-col gap-3";
	const labelClass =
		orientation === "vertical"
			? "flex flex-col items-center gap-1 text-sm"
			: "flex items-baseline justify-between text-sm";

	return (
		<div className={wrapperClass}>
			<div className={labelClass}>
				<span className="text-muted-foreground">Volume</span>
				<span className="font-mono text-foreground text-xs tabular-nums">{display}</span>
			</div>
			<Slider
				value={value}
				onValueChange={setValue}
				orientation={orientation}
				min={Number(props.min ?? 0)}
				max={Number(props.max ?? 100)}
				step={Number(props.step ?? 1)}
				disabled={Boolean(props.disabled)}
				label="Volume"
				style={orientation === "vertical" ? { height: "14rem" } : undefined}
			/>
		</div>
	);
}

const TABS = [
	{ id: "overview", label: "Overview" },
	{ id: "activity", label: "Activity" },
	{ id: "settings", label: "Settings" },
];

const TAB_COPY: Record<string, string> = {
	overview: "Deployment health, traffic and recent errors at a glance.",
	activity: "Every deploy, who triggered it and how long it took.",
	settings: "Build command, environment variables and domains.",
};

export function TabsDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("overview");
	return (
		<div className="w-96">
			<Tabs
				value={value}
				onValueChange={setValue}
				variant={(props.variant as TabsVariant) ?? "pill"}
				size={(props.size as "sm" | "md" | "lg" | "xl") ?? "md"}
			>
				<TabsList>
					{TABS.map((tab) => (
						<TabsTrigger key={tab.id} value={tab.id}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				{TABS.map((tab) => (
					<TabsContent key={tab.id} value={tab.id}>
						<p className="text-muted-foreground text-sm">{TAB_COPY[tab.id]}</p>
					</TabsContent>
				))}
			</Tabs>
		</div>
	);
}

export function MessageDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-96 flex-col gap-4">
			<Message align="end" name="Kanak Kholwal" tone="solid" showActions={false}>
				Why is the dock magnifying from the wrong centre?
			</Message>
			<Message
				key={String(props.motion)}
				align={(props.align as "start" | "end") ?? "start"}
				name={(props.name as string) || "Assistant"}
				tone={(props.tone as MessageTone) ?? "surface"}
				layout={(props.layout as MessageLayout) ?? "default"}
				motion={(props.motion as MessageMotion) ?? "none"}
				pending={Boolean(props.pending)}
				showActions={props.showActions !== false}
			>
				Because the item&apos;s own width grows as it magnifies, so its measured centre
				moves with it. Measure from the resting rect instead.
			</Message>
		</div>
	);
}

export function ResponseStreamDemo({ props }: { props: Props }) {
	const text =
		(props.text as string) ||
		"Streaming reveals text at a steady rate so the reader is never chasing it.";
	return (
		<div className="w-96 rounded-xl border border-border bg-card p-4">
			<ResponseStream
				key={`${text}-${String(props.speed)}`}
				text={text}
				speed={Number(props.speed ?? 60)}
				streaming={props.streaming !== false}
			/>
		</div>
	);
}

export function ReasoningDemo({ props }: { props: Props }) {
	return (
		<div className="w-96">
			<Reasoning
				thinking={props.thinking !== false}
				duration={Number(props.duration ?? 4)}
				defaultOpen={Boolean(props.defaultOpen)}
			>
				The measured centre shifts because the element&apos;s own width is part of the
				measurement. Using the resting rect keeps the falloff symmetric.
			</Reasoning>
		</div>
	);
}

const STEPS = [
	{ id: "read", label: "Read the component spec", status: "done" as const },
	{ id: "port", label: "Author the Svelte port", status: "done" as const },
	{ id: "check", label: "Run svelte-check", status: "active" as const },
	{ id: "docs", label: "Write the doc page", status: "pending" as const },
];

export function TaskStepsDemo({ props }: { props: Props }) {
	return (
		<div className="w-80">
			<TaskSteps
				steps={STEPS}
				showConnector={props.showConnector !== false}
				compact={Boolean(props.compact)}
			/>
		</div>
	);
}
