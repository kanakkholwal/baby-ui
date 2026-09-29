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
	MessageAvatar,
	MessageBubble,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
	RadioGroup,
	RadioGroupItem,
	Reasoning,
	ReasoningStep,
	ReasoningStepDetails,
	ReasoningStepSource,
	ReasoningStepSources,
	type ReasoningStepStatus,
	ReasoningSteps,
	ResponseStream,
	Slider,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	TaskSteps,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";
import { SLIDER_MARKS, SLIDER_PRESETS } from "../data/slider";

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
	const p = controlProps<ComponentProps<typeof RadioGroup>>(props);
	const [value, setValue] = useState("weekly");
	return (
		<RadioGroup
			value={value}
			onValueChange={setValue}
			orientation={p.orientation ?? "vertical"}
			variant={p.variant ?? "default"}
			size={p.size ?? "md"}
			disabled={p.disabled ?? false}
			name="demo-radio"
		>
			{RADIO_OPTIONS.map((option) => (
				<RadioGroupItem key={option.value} value={option.value} label={option.label} />
			))}
		</RadioGroup>
	);
}

export function SliderDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Slider>>(props);
	const variant = p.variant ?? "default";
	const preset = SLIDER_PRESETS[variant] ?? SLIDER_PRESETS.default;
	const orientation =
		variant === "default" ? (p.orientation ?? "horizontal") : "horizontal";
	const range = Boolean(props.range);
	const [value, setValue] = useState<number | number[]>(50);
	useEffect(() => {
		setValue(range ? [25, 75] : Number(props.value ?? 50));
	}, [range, props.value]);

	return (
		<div
			className={
				orientation === "vertical"
					? "flex h-56"
					: variant === "default"
						? "w-72"
						: "w-full max-w-sm"
			}
		>
			<Slider
				value={value}
				onValueChange={setValue}
				variant={variant}
				orientation={orientation}
				min={p.min ?? 0}
				max={p.max ?? 100}
				step={p.step ?? 1}
				disabled={p.disabled ?? false}
				label={preset?.label}
				formatValue={preset?.format}
				size={p.size ?? "md"}
				showValue={props.showValue === true}
				marks={variant === "default" ? SLIDER_MARKS : undefined}
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
	const p = controlProps<ComponentProps<typeof Tabs>>(props);
	const [value, setValue] = useState("overview");
	return (
		<div className="w-full max-w-96">
			<Tabs
				value={value}
				onValueChange={setValue}
				variant={p.variant ?? "pill"}
				size={p.size ?? "md"}
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
	const p = controlProps<ComponentProps<typeof Message>>(props);
	const pBubble = controlProps<ComponentProps<typeof MessageBubble>>(props);
	const align = p.align ?? "start";
	const motion = p.motion ?? "spring";
	const animated = p.animated ?? true;
	return (
		<MessageGroup className="w-full max-w-96">
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
					<MessageBubble variant={pBubble.variant ?? "default"}>
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
	const p = controlProps<ComponentProps<typeof ResponseStream>>(props);
	const text =
		p.text ||
		"Streaming reveals text at a steady rate so the reader is never chasing it.";
	return (
		<div className="w-full max-w-96 rounded-xl border border-border bg-card p-4">
			<ResponseStream
				key={`${text}-${String(props.speed)}`}
				text={text}
				speed={p.speed ?? 60}
				streaming={p.streaming ?? true}
				size={p.size ?? "md"}
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
	const p = controlProps<ComponentProps<typeof Reasoning>>(props);
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
		<div className="w-full max-w-96">
			<Reasoning
				thinking={thinking}
				duration={thinking ? Math.round(step * 1.4) : (p.duration ?? 4)}
				defaultOpen={p.defaultOpen ?? false}
				variant={p.variant ?? "outline"}
				thinkingLabel={p.thinkingLabel || "Thinking"}
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
	const p = controlProps<ComponentProps<typeof TaskSteps>>(props);
	return (
		<div className="w-full max-w-80">
			<TaskSteps
				steps={STEPS}
				showConnector={p.showConnector ?? true}
				compact={p.compact ?? false}
				size={p.size ?? "md"}
			/>
		</div>
	);
}
