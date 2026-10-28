"use client";

import { Button, Markdown } from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const SAMPLE_MD = [
	"## Installing",
	"Components are **copied into your project**, not installed. Run `shadcn add` and the source is yours.",
	"",
	"1. You own the source",
	"2. Nothing is imported at runtime",
	"3. Updates are a [diff](https://git-scm.com/docs/git-diff), not a version bump",
	"",
	"| Port | Primitives |",
	"| --- | --- |",
	"| React | Base UI |",
	"| Svelte | bits-ui |",
	"",
	"```bash",
	"npx shadcn add @baby-ui/button",
	"```",
].join("\n");
// Whitespace stays on the chunk before it, so the joined text is the sample verbatim.
const SAMPLE_CHUNKS = SAMPLE_MD.split(/(?<=\s)/);

export function MarkdownDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Markdown>>(props);
	const [count, setCount] = useState(0);
	const [run, setRun] = useState(0);

	// The scripted stream lives here; the component only renders what it is given.
	useEffect(() => setCount(0), [run, p.animate]);
	useEffect(() => {
		if (count >= SAMPLE_CHUNKS.length) return;
		const timer = setTimeout(() => setCount((n) => n + 1), 40);
		return () => clearTimeout(timer);
	}, [count]);

	return (
		<div className="flex w-full max-w-md flex-col items-start gap-3">
			<Markdown
				content={SAMPLE_CHUNKS.slice(0, count).join("")}
				streaming={count < SAMPLE_CHUNKS.length}
				variant={p.variant ?? "default"}
				size={p.size ?? "default"}
				animate={p.animate ?? "fade"}
				caret={p.caret ?? true}
				className="w-full"
			/>
			<Button variant="outline" size="sm" onClick={() => setRun((n) => n + 1)}>
				Replay
			</Button>
		</div>
	);
}
