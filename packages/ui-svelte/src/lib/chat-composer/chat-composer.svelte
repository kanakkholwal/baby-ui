<script lang="ts">
import { onDestroy } from "svelte";
import DropdownMenu from "../dropdown-menu/dropdown-menu.svelte";
import DropdownMenuContent from "../dropdown-menu/dropdown-menu-content.svelte";
import DropdownMenuItem from "../dropdown-menu/dropdown-menu-item.svelte";
import DropdownMenuLabel from "../dropdown-menu/dropdown-menu-label.svelte";
import DropdownMenuTrigger from "../dropdown-menu/dropdown-menu-trigger.svelte";
import { cn } from "../lib/cn";
import type { ChatTopic } from "./types";

export type { ChatMessage, ChatTopic } from "./types";

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done";

const ICON_BUTTON =
	"flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground data-[state=open]:bg-foreground/[0.06] data-[state=open]:text-foreground";

let {
	topics,
	placeholder = "Send a message…",
	onSend,
}: {
	/** Every switchable thread; the tabs ARE these topics. */
	topics: ChatTopic[];
	placeholder?: string;
	/** Fired with the trimmed prompt text and the active topic's key when the user sends. */
	onSend?: (text: string, topicKey: string) => void;
} = $props();

// svelte-ignore state_referenced_locally -- intentional one-time seed, like useState(initial) in React
let activeKey = $state(topics[0]?.key);
const topic = $derived(topics.find((t) => t.key === activeKey) ?? topics[0]);

let phase = $state<Phase>("done");
let draft = $state("");
// svelte-ignore state_referenced_locally -- intentional one-time seed, like useState(initial) in React
let submitted = $state(topic?.initialPrompt ?? "");
let history = $state<string[]>([]);
let inputEl = $state<HTMLInputElement>();
let copyStatus = $state("");

$effect(() => {
	let timer: ReturnType<typeof setTimeout>;
	if (phase === "sent") timer = setTimeout(() => (phase = "reply1"), 500);
	else if (phase === "reply1") timer = setTimeout(() => (phase = "reply2"), 1400);
	else if (phase === "reply2") timer = setTimeout(() => (phase = "done"), 1200);
	else return;
	return () => clearTimeout(timer);
});

let copyTimer: ReturnType<typeof setTimeout> | undefined;
onDestroy(() => clearTimeout(copyTimer));

const sent = $derived(phase !== "idle");
const canSend = $derived(draft.trim().length > 0);
const shownMessages = $derived(
	phase === "reply1" ? 1 : phase === "reply2" || phase === "done" ? 2 : 0,
);

function send(text: string) {
	const trimmed = text.trim();
	if (!trimmed || !topic) return;
	submitted = trimmed;
	onSend?.(trimmed, topic.key);
	draft = "";
	phase = "sent";
	history = [trimmed, ...history.filter((p) => p !== trimmed)].slice(0, 8);
}

function switchTopic(key: string) {
	const next = topics.find((t) => t.key === key);
	if (!next) return;
	activeKey = key;
	submitted = next.initialPrompt;
	phase = "done";
}

function startNew() {
	submitted = "";
	draft = "";
	phase = "idle";
	inputEl?.focus();
}

async function copyConversation() {
	if (!topic) return;
	const lines = [submitted, ...topic.messages.slice(0, shownMessages).map((m) => m.body)];
	try {
		await navigator.clipboard.writeText(lines.join("\n"));
		copyStatus = "Copied";
	} catch {
		copyStatus = "Couldn't copy";
	}
	copyTimer = setTimeout(() => {
		copyStatus = "";
	}, 1500);
}
</script>

{#snippet section(label: string, sub: string, time: string, body: string, resolving = false)}
	<div
		class="card-fade-up flex w-full flex-col gap-1.5 transition-[opacity,filter,transform] duration-400 ease-[var(--ease-out)]"
		style={`opacity: ${resolving ? 0.55 : 1}; filter: blur(${resolving ? 0.5 : 0}px); transform: scale(${resolving ? 0.985 : 1}); transform-origin: top left`}
	>
		<div class="flex items-center gap-1 text-[12px] leading-[1.3]">
			<span class="font-medium text-foreground">{label}</span>
			<span class="text-muted-foreground">{sub}</span>
			<span class="text-foreground">for {time}</span>
		</div>
		<p class="text-[13px] text-foreground leading-normal">{body}</p>
	</div>
{/snippet}

{#if topic}
	<div
		data-slot="chat-composer"
		class="flex h-[288px] w-full max-w-sm flex-col self-start overflow-hidden rounded-2xl bg-card shadow-sm"
	>
		<div class="flex shrink-0 items-center justify-between border-border border-b p-1.5">
			<div class="flex items-center">
				{#each topics as t (t.key)}
					<button
						type="button"
						aria-pressed={topic.key === t.key}
						onclick={() => switchTopic(t.key)}
						class={cn(
							"rounded-md px-2 py-[3px] text-[13px] text-foreground transition-[background-color,opacity] duration-100",
							topic.key === t.key ? "bg-input" : "opacity-50 hover:opacity-75",
						)}
					>
						{t.label}
					</button>
				{/each}
			</div>
			<div class="flex items-center gap-1">
				<button type="button" aria-label="New conversation" onclick={startNew} class={ICON_BUTTON}>
					<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<path d="M12 5v14M5 12h14" />
					</svg>
				</button>

				<DropdownMenu>
					<DropdownMenuTrigger aria-label="Prompt history" class={ICON_BUTTON}>
						<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<circle cx="12" cy="12" r="9" />
							<path d="M12 7v5l3 2" />
						</svg>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Recent prompts</DropdownMenuLabel>
						{#if history.length === 0}
							<div class="px-2.5 py-1.5 text-muted-foreground text-xs">Nothing sent yet</div>
						{:else}
							{#each history as entry (entry)}
								<DropdownMenuItem onclick={() => send(entry)}>
									<span class="min-w-0 flex-1 truncate">{entry}</span>
								</DropdownMenuItem>
							{/each}
						{/if}
					</DropdownMenuContent>
				</DropdownMenu>

				<DropdownMenu>
					<DropdownMenuTrigger aria-label="More actions" class={ICON_BUTTON}>
						<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
							<circle cx="5" cy="12" r="1.8" />
							<circle cx="12" cy="12" r="1.8" />
							<circle cx="19" cy="12" r="1.8" />
						</svg>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onclick={copyConversation}>
							{copyStatus || "Copy conversation"}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>

		<div class="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
			<div class="flex justify-end pl-14">
				<div
					class="rounded-xl bg-input px-3 py-1.5 text-[13px] text-foreground leading-[1.4] transition-[opacity,transform] duration-300 ease-[var(--ease-out)]"
					style={`opacity: ${sent ? 1 : 0}; transform: translateY(${sent ? 0 : 10}px)`}
				>
					{submitted}
				</div>
			</div>

			{#if topic.messages[0] && shownMessages >= 1}
				{@render section(topic.messages[0].label, topic.messages[0].sub, topic.messages[0].time, topic.messages[0].body)}
			{/if}
			{#if topic.messages[1] && shownMessages >= 2}
				{@render section(
					topic.messages[1].label,
					topic.messages[1].sub,
					topic.messages[1].time,
					topic.messages[1].body,
					phase === "reply2",
				)}
			{/if}
		</div>

		<div class="mt-auto shrink-0 p-1.5">
			<!-- svelte-ignore a11y_no_static_element_interactions -- mouse-only convenience click-through; the real input is independently focusable and labelled -->
			<!-- svelte-ignore a11y_click_events_have_key_events -- same reason, no keyboard functionality is gated on this click -->
			<div
				onclick={() => inputEl?.focus()}
				class="flex cursor-text flex-col gap-2 rounded-lg border border-border bg-input p-2.5 shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-border-strong"
			>
				<input
					bind:this={inputEl}
					bind:value={draft}
					onkeydown={(event) => {
						if (event.key === "Enter") send(draft);
					}}
					{placeholder}
					aria-label="Chat prompt"
					class="min-h-4.5 bg-transparent text-[13px] text-foreground leading-[1.4] outline-none placeholder:text-muted-foreground"
				/>
				<div class="flex items-center justify-end">
					<button
						type="button"
						aria-label="Send"
						disabled={!canSend}
						onclick={() => send(draft)}
						class={cn(
							"flex size-7 items-center justify-center rounded-lg transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]",
							canSend ? "bg-foreground text-background" : "bg-border-strong text-muted-foreground",
						)}
					>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
							<path d="M12 19V5M5 12l7-7 7 7" />
						</svg>
					</button>
				</div>
			</div>
		</div>
		<span role="status" class="sr-only">{copyStatus}</span>
	</div>
{/if}
