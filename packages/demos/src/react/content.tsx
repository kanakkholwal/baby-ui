"use client";

import {
	Attachment,
	CodeBlock,
	ColorPicker,
	Composer,
	Conversation,
	ConversationContent,
	ConversationScrollButton,
	CopyButton,
	FileDiff,
	Markdown,
	Message,
	MessageBubble,
	MessageContent,
	Question,
	type QuestionAnswers,
	type QuestionItem,
	Reasoning,
	type ReorderItem,
	ReorderList,
	type ReorderListVariant,
	TagInput,
	Tool,
	type ToolState,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";

type Props = Record<string, unknown>;
type MarkdownSize = NonNullable<ComponentProps<typeof Markdown>["size"]>;

const SAMPLE_CODE =
	"export function cn(...inputs: ClassValue[]) {\n\treturn twMerge(clsx(inputs));\n}";
const SAMPLE_MD =
	"## Installing\nComponents are copied into your project rather than installed.\n\n- You own the source\n- Nothing is imported at runtime\n- Updates are a diff, not a version bump\n\n```\nnpx shadcn add button\n```";

export function CopyButtonDemo({ props }: { props: Props }) {
	const text = (props.text as string) || "npx shadcn@latest add button";
	return (
		<div className="flex w-[22rem] items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2">
			<code className="truncate font-mono text-foreground text-xs">{text}</code>
			<CopyButton
				text={text}
				label={(props.label as string) || "Copy"}
				copiedLabel={(props.copiedLabel as string) || "Copied"}
				iconOnly={props.iconOnly !== false}
			/>
		</div>
	);
}

export function CodeBlockDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-md">
			<CodeBlock
				code={SAMPLE_CODE}
				language={(props.language as string) || "ts"}
				filename={(props.filename as string) || "lib/cn.ts"}
				showLineNumbers={Boolean(props.showLineNumbers)}
				maxHeight={(props.maxHeight as string) || "24rem"}
			/>
		</div>
	);
}

export function MarkdownDemo({ props }: { props: Props }) {
	return (
		<div className="w-96">
			<Markdown
				content={(props.content as string) || SAMPLE_MD}
				size={(props.size as MarkdownSize) ?? "md"}
			/>
		</div>
	);
}

const DIFF = [
	{ kind: "context" as const, text: "export function Button(props: ButtonProps) {" },
	{ kind: "remove" as const, text: "  const classes = button({ variant });" },
	{
		kind: "add" as const,
		text: "  const classes = cn(button({ variant, size }), className);",
	},
	{ kind: "context" as const, text: "  return <button className={classes} />;" },
	{ kind: "context" as const, text: "}" },
];

export function FileDiffDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-lg">
			<FileDiff
				filename={(props.filename as string) || "src/button.tsx"}
				lines={DIFF}
				showLineNumbers={props.showLineNumbers !== false}
			/>
		</div>
	);
}

export function TagInputDemo({ props }: { props: Props }) {
	const [tags, setTags] = useState(["svelte", "react"]);
	return (
		<div className="w-80">
			<TagInput
				tags={tags}
				onTagsChange={setTags}
				placeholder={(props.placeholder as string) || "Add a tag…"}
				max={Number(props.max ?? 6)}
				disabled={Boolean(props.disabled)}
				label="Tags"
			/>
		</div>
	);
}

export function ColorPickerDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("#7dd3fc");
	const [format, setFormat] = useState<"hsv" | "hsl" | "rgb">("hsv");
	useEffect(() => {
		if (typeof props.value === "string") setValue(props.value);
	}, [props.value]);
	useEffect(
		() => setFormat((props.format as "hsv" | "hsl" | "rgb") ?? "hsv"),
		[props.format],
	);
	return (
		<ColorPicker
			value={value}
			onValueChange={setValue}
			format={format}
			onFormatChange={setFormat}
			label={(props.label as string) || "Accent"}
		/>
	);
}

const STEPS: ReorderItem[] = [
	{ id: "spec", label: "Write the ComponentSpec" },
	{ id: "svelte", label: "Author the Svelte port" },
	{ id: "react", label: "Author the React port" },
	{ id: "docs", label: "Write the doc page" },
];

export function ReorderListDemo({ props }: { props: Props }) {
	const [items, setItems] = useState(STEPS);
	return (
		<div className="w-80">
			<ReorderList
				items={items}
				onItemsChange={setItems}
				disabled={Boolean(props.disabled)}
				label={(props.label as string) || "Build steps"}
				variant={(props.variant as ReorderListVariant) ?? "card"}
			/>
		</div>
	);
}

export function AttachmentDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-80 flex-col gap-2">
			<Attachment
				name={(props.name as string) || "spec-draft.md"}
				size={(props.size as string) || "18 KB"}
				status={(props.status as "uploading" | "ready" | "error") ?? "ready"}
				progress={Number(props.progress ?? 40)}
				onRemove={() => {}}
			/>
			<Attachment name="screenshot.png" status="uploading" progress={62} />
			<Attachment name="huge-video.mov" status="error" />
		</div>
	);
}

const COMPOSER_MODELS = [
	{
		value: "fast",
		label: "Fast",
		icon: (
			<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
				<path d="M8.5 1 3 9h4l-.5 6L13 7H9z" />
			</svg>
		),
	},
	{
		value: "reasoning",
		label: "Reasoning",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.6"
				aria-hidden
			>
				<path d="M12 2.8a5 5 0 0 0-2.8 9.1c.4.3.6.8.6 1.3v.4h4.4v-.4c0-.5.2-1 .6-1.3A5 5 0 0 0 12 2.8Z" />
				<path d="M9.6 16.2h4.8" strokeLinecap="round" />
			</svg>
		),
	},
];

const COMPOSER_ACTIONS = [
	{
		value: "attach",
		label: "Attach file",
		description: "Upload a document for context",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<path d="M17 3a2.8 2.8 0 1 1 4 4L9.5 18.5a3 3 0 0 1-4.24-4.24L15 4.5" />
			</svg>
		),
	},
	{
		value: "image",
		label: "Add image",
		description: "Attach a screenshot or photo",
		icon: (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden
			>
				<rect x="3" y="4" width="18" height="16" rx="2" />
				<circle cx="8.5" cy="9.5" r="1.5" />
				<path d="m21 15-5-5-9 9" />
			</svg>
		),
	},
];

export function ComposerDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("");
	const [sent, setSent] = useState("");
	const [model, setModel] = useState("fast");
	const [loading, setLoading] = useState(Boolean(props.loading));

	useEffect(() => setLoading(Boolean(props.loading)), [props.loading]);

	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Composer
				value={value}
				onValueChange={setValue}
				onSubmit={(text) => {
					setSent(text);
					setValue("");
					setLoading(true);
				}}
				placeholder={(props.placeholder as string) || "Send a message…"}
				size={(props.size as "sm" | "md" | "lg") ?? "md"}
				loading={loading}
				onStop={() => setLoading(false)}
				disabled={Boolean(props.disabled)}
				maxRows={Number(props.maxRows ?? 8)}
				models={COMPOSER_MODELS}
				model={model}
				onModelChange={setModel}
				actions={COMPOSER_ACTIONS}
			/>
			{sent ? <p className="text-muted-foreground text-xs">Sent: {sent}</p> : null}
		</div>
	);
}

const INLINE_CODE =
	"rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs";
const USER_BUBBLE = "rounded-xl bg-input text-foreground px-4 py-2.5";

export function ConversationDemo({ props }: { props: Props }) {
	return (
		<div
			className="w-96 rounded-xl border border-border bg-card/40 p-2"
			style={{ height: (props.maxHeight as string) || "22rem" }}
		>
			<Conversation className="h-full">
				<ConversationContent>
					<Message align="end" animated={false}>
						<MessageContent>
							<MessageBubble variant="ghost" className={USER_BUBBLE}>
								Investigate why checkout latency rose after 14:00 UTC. Focus on the latest
								release and give me a safe mitigation.
							</MessageBubble>
						</MessageContent>
					</Message>

					<Reasoning duration={4.8}>Compared traces with the release timeline</Reasoning>

					<div className="flex flex-col gap-3 text-sm leading-relaxed">
						<h3 className="font-heading font-semibold text-base text-foreground">
							What changed
						</h3>
						<p className="text-muted-foreground">
							The latency increase starts in{" "}
							<code className={INLINE_CODE}>POST /checkout</code> immediately after
							release <code className={INLINE_CODE}>web-2418</code>.
						</p>
						<ul className="flex list-disc flex-col gap-1 pl-5 text-muted-foreground">
							<li>
								Address validation added{" "}
								<strong className="text-foreground">430 ms</strong> at p95.
							</li>
							<li>The provider timed out for 8% of non-US requests.</li>
							<li>Database and inventory spans stayed within baseline.</li>
						</ul>
						<blockquote className="border-border border-l-2 pl-3 text-muted-foreground">
							Roll back the synchronous validation call, then keep the rule behind the
							existing review queue.
						</blockquote>
					</div>

					<Message align="end" animated={false}>
						<MessageContent>
							<MessageBubble variant="ghost" className={USER_BUBBLE}>
								Show me the smallest rollback and how to verify it.
							</MessageBubble>
						</MessageContent>
					</Message>

					<p className="text-foreground text-sm">Use the targeted flag first:</p>

					<CodeBlock
						language="ts"
						code={
							"await flags.disable('checkout.address-verification');\nawait assertLatencyBelow('checkout', { p95: 300 });"
						}
					/>
				</ConversationContent>
				<ConversationScrollButton />
			</Conversation>
		</div>
	);
}

export function ToolDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Tool
				name={(props.name as string) || "search_docs"}
				status={(props.status as ToolState) ?? "running"}
				input={'{ "query": "dock magnification" }'}
				output={'{ "matches": 3 }'}
				defaultOpen={Boolean(props.defaultOpen)}
			/>
			<Tool
				name="read_file"
				status="done"
				input={'{ "path": "dock.tsx" }'}
				output="248 lines"
			/>
		</div>
	);
}

const QUESTIONS: QuestionItem[] = [
	{
		id: "runtime",
		title: "Which runtime should this target?",
		options: [
			{ value: "edge", label: "Edge" },
			{ value: "node", label: "Node" },
			{ value: "both", label: "Both" },
		],
	},
	{
		id: "features",
		title: "Which features does it need?",
		description: "Pick any that apply, or add your own.",
		multiple: true,
		allowCustom: true,
		customPlaceholder: "Add another requirement…",
		options: [
			{ value: "streaming", label: "Streaming responses" },
			{ value: "auth", label: "Auth middleware" },
			{ value: "caching", label: "Response caching" },
		],
	},
	{
		id: "priority",
		title: "How urgent is this?",
		options: [
			{ value: "now", label: "Ship this week" },
			{ value: "soon", label: "Next sprint" },
			{ value: "later", label: "No rush" },
		],
	},
];

export function QuestionDemo({ props }: { props: Props }) {
	const [submitted, setSubmitted] = useState<QuestionAnswers | null>(null);
	return (
		<div className="w-full max-w-sm">
			<Question
				key={String(props.layout)}
				layout={(props.layout as "card" | "inline") ?? "card"}
				questions={QUESTIONS}
				onSubmit={setSubmitted}
			/>
			{submitted ? (
				<p className="mt-2 text-muted-foreground text-xs">
					Submitted: {JSON.stringify(submitted)}
				</p>
			) : null}
		</div>
	);
}
