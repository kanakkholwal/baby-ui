"use client";

import {
	Attachment,
	CodeBlock,
	ColorPicker,
	Composer,
	Conversation,
	CopyButton,
	FileDiff,
	Markdown,
	Message,
	Question,
	type ReorderItem,
	ReorderList,
	TagInput,
	Tool,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

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
		<div className="w-96">
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
			<Markdown content={(props.content as string) || SAMPLE_MD} />
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

export function ComposerDemo({ props }: { props: Props }) {
	const [value, setValue] = useState("");
	const [sent, setSent] = useState("");
	return (
		<div className="flex w-96 flex-col gap-2">
			<Composer
				value={value}
				onValueChange={setValue}
				onSubmit={setSent}
				placeholder={(props.placeholder as string) || "Send a message…"}
				busy={Boolean(props.busy)}
				disabled={Boolean(props.disabled)}
				maxRows={Number(props.maxRows ?? 8)}
			/>
			{sent ? <p className="text-muted-foreground text-xs">Sent: {sent}</p> : null}
		</div>
	);
}

const TURNS = [
	{ role: "user" as const, text: "Why does the dock measure the wrong centre?" },
	{
		role: "assistant" as const,
		text: "Because the item's own width grows as it magnifies.",
	},
	{ role: "user" as const, text: "So measure the resting rect instead?" },
	{
		role: "assistant" as const,
		text: "Yes. Cache it on pointerenter and reuse it for the whole gesture.",
	},
	{ role: "user" as const, text: "And on resize?" },
	{
		role: "assistant" as const,
		text: "Invalidate the cache from a ResizeObserver on the dock.",
	},
];

export function ConversationDemo({ props }: { props: Props }) {
	return (
		<div className="w-96 rounded-xl border border-border bg-card/40 p-2">
			<Conversation maxHeight={(props.maxHeight as string) || "16rem"}>
				{TURNS.map((turn, i) => (
					<Message
						key={i}
						role={turn.role}
						name={turn.role === "user" ? "You" : "Assistant"}
						showActions={false}
					>
						{turn.text}
					</Message>
				))}
			</Conversation>
		</div>
	);
}

export function ToolDemo({ props }: { props: Props }) {
	return (
		<div className="flex w-96 flex-col gap-2">
			<Tool
				name={(props.name as string) || "search_docs"}
				status={(props.status as "pending" | "running" | "done" | "error") ?? "running"}
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

const ANSWERS = [
	{ id: "edge", label: "Edge" },
	{ id: "node", label: "Node" },
	{ id: "both", label: "Both" },
];

export function QuestionDemo({ props }: { props: Props }) {
	const [picked, setPicked] = useState<string[]>([]);
	return (
		<div className="w-96">
			<Question
				key={String(props.multiple)}
				question={(props.question as string) || "Which runtime should this target?"}
				options={ANSWERS}
				multiple={Boolean(props.multiple)}
				onAnswer={setPicked}
			/>
			{picked.length ? (
				<p className="mt-2 text-muted-foreground text-xs">
					Answered: {picked.join(", ")}
				</p>
			) : null}
		</div>
	);
}
