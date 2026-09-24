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
	type MessageAlign,
	MessageAvatar,
	MessageBubble,
	type MessageBubbleVariant,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
	type MessageMotion,
	RadioGroup,
	RadioGroupItem,
	Reasoning,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
	type ReasoningVariant,
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

	const display = Array.isArray(value) ? `${value[0]}-${value[1]}` : value;

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
	const align = (props.align as MessageAlign) ?? "start";
	const motion = (props.motion as MessageMotion) ?? "spring";
	const variant = (props.variant as MessageBubbleVariant) ?? "default";
	const animated = props.animated !== false;
	return (
		<MessageGroup className="w-96">
			<Message align="end" animated={false}>
				<MessageContent>
					<MessageBubble variant="primary">
						Why is the dock magnifying from the wrong centre?
					</MessageBubble>
				</MessageContent>
			</Message>
			<Message
				key={`${align}-${motion}-${animated}`}
				align={align}
				motion={motion}
				animated={animated}
			>
				<MessageAvatar>A</MessageAvatar>
				<MessageContent>
					<MessageHeader>Assistant</MessageHeader>
					<MessageBubble variant={variant}>
						Because the item&apos;s own width grows as it magnifies, so its measured
						centre moves with it. Measure from the resting rect instead.
					</MessageBubble>
					<MessageFooter>Just now</MessageFooter>
				</MessageContent>
			</Message>
		</MessageGroup>
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

const REASONING_STEPS = [
	{
		label: "Read the brief",
		description: "Pulled the goals and constraints out of the request.",
	},
	{ label: "Search the docs" },
	{ label: "Compare two approaches" },
	{ label: "Draft the answer" },
];

function stepStatus(index: number, progress: number): ReasoningStepStatus {
	return index < progress ? "done" : index === progress ? "active" : "pending";
}

export function ReasoningDemo({ props }: { props: Props }) {
	const scripted = props.thinking !== false;
	const [progress, setProgress] = useState(0);
	useEffect(() => {
		if (!scripted) return;
		const id = setInterval(
			() => setProgress((p) => (p >= REASONING_STEPS.length + 2 ? 0 : p + 1)),
			1400,
		);
		return () => clearInterval(id);
	}, [scripted]);
	const step = scripted ? progress : REASONING_STEPS.length;
	const thinking = step < REASONING_STEPS.length;
	return (
		<div className="w-96">
			<Reasoning
				thinking={thinking}
				duration={thinking ? Math.round(step * 1.4) : Number(props.duration ?? 4)}
				defaultOpen={Boolean(props.defaultOpen)}
				variant={(props.variant as ReasoningVariant) ?? "outline"}
				thinkingLabel={(props.thinkingLabel as string) || "Thinking"}
			>
				<ReasoningSteps>
					{REASONING_STEPS.map((s, i) => (
						<ReasoningStep
							key={s.label}
							label={s.label}
							description={s.description}
							status={stepStatus(i, step)}
						>
							{i === 1 ? (
								<ReasoningStepSources>
									<ReasoningStepSource href="https://base-ui.com">
										base-ui.com
									</ReasoningStepSource>
									<ReasoningStepSource>svelte.dev</ReasoningStepSource>
								</ReasoningStepSources>
							) : null}
							{i === 2 ? (
								<ReasoningStepDetails summary="Why grid rows">
									<p>Animating grid-template-rows needs no height measuring.</p>
									<p>A height tween needs a ResizeObserver and still snaps.</p>
								</ReasoningStepDetails>
							) : null}
						</ReasoningStep>
					))}
				</ReasoningSteps>
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
