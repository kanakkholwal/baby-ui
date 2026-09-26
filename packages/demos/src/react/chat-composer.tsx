"use client";

import {
	ChatComposer,
	type ChatComposerSize,
	type ChatComposerVariant,
	type ChatMessage,
	type ChatStatus,
} from "@baby-ui/react";
import { useEffect, useRef, useState } from "react";

type Props = Record<string, unknown>;

const TOPICS = [
	{ key: "flavors", label: "Flavors" },
	{ key: "suppliers", label: "Suppliers" },
];

// Scripted replies live in the demo; the component only renders what it is given.
const REPLIES: Record<string, Omit<ChatMessage, "id" | "role">[]> = {
	flavors: [
		{
			author: "Sales History",
			meta: "for 4s",
			body: "Pulled 3 summers of mint chip sales for comparison.",
		},
		{
			author: "Comparison",
			meta: "for 2s",
			body: "Mint chip is up 12% with stronger weekend peaks.",
		},
	],
	suppliers: [
		{
			author: "Supplier Status",
			meta: "for 3s",
			body: "2 of 14 suppliers have shipments running late this week.",
		},
		{
			author: "Root Cause",
			meta: "for 5s",
			body: "Cone King's delay traces back to a packaging shortage, clear by Friday.",
		},
	],
};

const SEED: Record<string, ChatMessage[]> = {
	flavors: [
		{ id: "f0", role: "user", body: "Compare mint chip to last summer" },
		...(REPLIES.flavors ?? []).map((r, i) => ({
			...r,
			id: `f${i + 1}`,
			role: "assistant" as const,
		})),
	],
	suppliers: [
		{ id: "s0", role: "user", body: "Which suppliers are behind schedule?" },
		...(REPLIES.suppliers ?? []).map((r, i) => ({
			...r,
			id: `s${i + 1}`,
			role: "assistant" as const,
		})),
	],
};

export function ChatComposerDemo({ props }: { props: Props }) {
	const [topic, setTopic] = useState("flavors");
	const [threads, setThreads] = useState(SEED);
	const [status, setStatus] = useState<ChatStatus>("idle");
	const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

	useEffect(() => () => timers.current.forEach(clearTimeout), []);

	function push(key: string, message: ChatMessage) {
		setThreads((all) => ({ ...all, [key]: [...(all[key] ?? []), message] }));
	}

	function onSend(text: string, key = topic) {
		const stamp = Date.now();
		push(key, { id: `u${stamp}`, role: "user", body: text });
		setStatus("streaming");
		(REPLIES[key] ?? []).forEach((reply, i) => {
			timers.current.push(
				setTimeout(
					() => push(key, { ...reply, id: `a${stamp}-${i}`, role: "assistant" }),
					600 + i * 1300,
				),
			);
		});
		timers.current.push(
			setTimeout(() => setStatus("idle"), 600 + (REPLIES[key]?.length ?? 0) * 1300),
		);
	}

	return (
		<ChatComposer
			messages={threads[topic] ?? []}
			topics={TOPICS}
			topic={topic}
			onTopicChange={setTopic}
			onSend={onSend}
			onNew={() => setThreads((all) => ({ ...all, [topic]: [] }))}
			status={status}
			variant={(props.variant as ChatComposerVariant) ?? "framed"}
			size={(props.size as ChatComposerSize) ?? "sm"}
			labels={{ placeholder: "Prompt or tag a flavor with @" }}
		/>
	);
}
