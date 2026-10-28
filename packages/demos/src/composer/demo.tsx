"use client";

import { Composer } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

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
	const p = controlProps<ComponentProps<typeof Composer>>(props);
	const [value, setValue] = useState("");
	const [sent, setSent] = useState("");
	const [model, setModel] = useState("fast");
	const [loading, setLoading] = useState(p.loading ?? false);

	useEffect(() => setLoading(p.loading ?? false), [p.loading]);

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
				placeholder={p.placeholder || "Send a message…"}
				size={p.size ?? "default"}
				loading={loading}
				onStop={() => setLoading(false)}
				disabled={p.disabled ?? false}
				maxRows={p.maxRows ?? 8}
				models={COMPOSER_MODELS}
				model={model}
				onModelChange={setModel}
				actions={COMPOSER_ACTIONS}
			/>
			{sent ? <p className="text-muted-foreground text-xs">Sent: {sent}</p> : null}
		</div>
	);
}
