<script lang="ts">
import {
	ChatComposer,
	type ChatComposerSize,
	type ChatComposerVariant,
	type ChatMessage,
	type ChatStatus,
} from "@baby-ui/svelte";
import { onDestroy } from "svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

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

let topic = $state("flavors");
let status = $state<ChatStatus>("idle");
let threads = $state<Record<string, ChatMessage[]>>({
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
});
const timers: ReturnType<typeof setTimeout>[] = [];
onDestroy(() => timers.forEach(clearTimeout));

function push(key: string, message: ChatMessage) {
	threads = { ...threads, [key]: [...(threads[key] ?? []), message] };
}

function onSend(text: string, key = topic) {
	const stamp = Date.now();
	push(key, { id: `u${stamp}`, role: "user", body: text });
	status = "streaming";
	const replies = REPLIES[key] ?? [];
	replies.forEach((reply, i) => {
		timers.push(
			setTimeout(
				() => push(key, { ...reply, id: `a${stamp}-${i}`, role: "assistant" }),
				600 + i * 1300,
			),
		);
	});
	timers.push(setTimeout(() => (status = "idle"), 600 + replies.length * 1300));
}
</script>

<ChatComposer
	messages={threads[topic] ?? []}
	topics={TOPICS}
	bind:topic
	{onSend}
	onNew={() => (threads = { ...threads, [topic]: [] })}
	{status}
	variant={(props.variant as ChatComposerVariant) ?? "framed"}
	size={(props.size as ChatComposerSize) ?? "sm"}
	labels={{ placeholder: "Prompt or tag a flavor with @" }}
/>
