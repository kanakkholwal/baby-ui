"use client";

import {
	LiveTranscript,
	LiveTranscriptBody,
	LiveTranscriptNotice,
	LiveTranscriptStatus,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const WORDS =
	"Let's move the review to Thursday afternoon, and I'll send the revised draft to the whole design team before lunch so everyone has time to read it properly".split(
		" ",
	);

export function LiveTranscriptDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LiveTranscript>>(props);
	const [count, setCount] = useState(3);

	// The demo plays the engine: it settles one word at a time and guesses the next.
	useEffect(() => {
		const id = setInterval(() => setCount((n) => (n >= WORDS.length ? 3 : n + 1)), 450);
		return () => clearInterval(id);
	}, []);

	const done = count >= WORDS.length;
	return (
		<div className="w-full max-w-md">
			<LiveTranscript
				variant={p.variant}
				session="demo"
				committed={p.committed ?? WORDS.slice(0, Math.max(0, count - 1)).join(" ")}
				tentative={p.tentative ?? (done ? "" : (WORDS[count - 1] ?? ""))}
			>
				<LiveTranscriptBody>Say something to start.</LiveTranscriptBody>
				{done ? (
					<LiveTranscriptStatus>Transcribing…</LiveTranscriptStatus>
				) : count === 3 ? (
					<LiveTranscriptNotice tone="warning">
						The model is still loading, so this may lag.
					</LiveTranscriptNotice>
				) : null}
			</LiveTranscript>
		</div>
	);
}
