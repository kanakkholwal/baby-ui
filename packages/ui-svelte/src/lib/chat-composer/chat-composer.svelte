<script lang="ts">
import { cn } from "../lib/cn";
import type { ChatMessage } from "./types";

export type { ChatMessage } from "./types";

type Phase = "idle" | "sent" | "reply1" | "reply2" | "done";

let {
	initialPrompt,
	messages,
	suggestions = [],
	placeholder = "Send a message…",
	onSend,
}: {
	/** The pre-filled prompt shown in the first user bubble before sending. */
	initialPrompt: string;
	/** Scripted agent replies revealed in sequence after the user sends. */
	messages: ChatMessage[];
	/** Header chips (tabs) for switching context; omit for none. */
	suggestions?: string[];
	placeholder?: string;
	/** Fired with the trimmed prompt text when the user sends. */
	onSend?: (text: string) => void;
} = $props();

let phase = $state<Phase>("done");
let draft = $state("");
let submitted = $state(initialPrompt);
let tab = $state(suggestions[0] ?? "");
let inputEl: HTMLInputElement | null = null;

$effect(() => {
	let timer: ReturnType<typeof setTimeout>;
	if (phase === "sent") timer = setTimeout(() => (phase = "reply1"), 500);
	else if (phase === "reply1") timer = setTimeout(() => (phase = "reply2"), 1400);
	else if (phase === "reply2") timer = setTimeout(() => (phase = "done"), 1200);
	else return;
	return () => clearTimeout(timer);
});

const sent = $derived(phase !== "idle");
const canSend = $derived(draft.trim().length > 0);

const ACTIONS = [
	{ label: "New", d: "M12 5v14M5 12h14" },
	{ label: "History", d: null },
	{ label: "More", d: null },
] as const;

function send() {
	if (!canSend) return;
	const text = draft.trim();
	submitted = text;
	onSend?.(text);
	draft = "";
	phase = "sent";
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

<div
	data-slot="chat-composer"
	class="flex h-[288px] w-full max-w-sm flex-col self-start overflow-hidden rounded-2xl bg-card shadow-sm"
>
	<div class="flex shrink-0 items-center justify-between border-border border-b p-1.5">
		<div class="flex items-center">
			{#each suggestions as item (item)}
				<button
					type="button"
					aria-pressed={tab === item}
					onclick={() => (tab = item)}
					class={cn(
						"rounded-md px-2 py-[3px] text-[13px] text-foreground transition-[background-color,opacity] duration-100",
						tab === item ? "bg-input" : "opacity-50 hover:opacity-75",
					)}
				>
					{item}
				</button>
			{/each}
		</div>
		<div class="flex items-center gap-1">
			{#each ACTIONS as action (action.label)}
				<button
					type="button"
					aria-label={action.label}
					class="flex size-6 items-center justify-center rounded-md text-muted-foreground transition-colors duration-100 hover:bg-foreground/[0.06] hover:text-foreground"
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						{#if action.label === "New"}
							<path d={action.d} />
						{:else if action.label === "History"}
							<circle cx="12" cy="12" r="9" />
							<path d="M12 7v5l3 2" />
						{:else}
							<g fill="currentColor" stroke="none">
								<circle cx="5" cy="12" r="1.8" />
								<circle cx="12" cy="12" r="1.8" />
								<circle cx="19" cy="12" r="1.8" />
							</g>
						{/if}
					</svg>
				</button>
			{/each}
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

		{#if messages[0] && (phase === "reply1" || phase === "reply2" || phase === "done")}
			{@render section(messages[0].label, messages[0].sub, messages[0].time, messages[0].body)}
		{/if}
		{#if messages[1] && (phase === "reply2" || phase === "done")}
			{@render section(
				messages[1].label,
				messages[1].sub,
				messages[1].time,
				messages[1].body,
				phase === "reply2",
			)}
		{/if}
	</div>

	<div class="mt-auto shrink-0 p-1.5">
		<div
			role="presentation"
			onclick={() => inputEl?.focus()}
			class="flex cursor-text flex-col gap-2 rounded-lg border border-border bg-input p-2.5 shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-border-strong"
		>
			<input
				bind:this={inputEl}
				bind:value={draft}
				onkeydown={(event) => {
					if (event.key === "Enter") send();
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
					onclick={send}
					class={cn(
						"flex size-7 items-center justify-center rounded-lg transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]",
						canSend ? "bg-foreground text-background" : "bg-border-strong text-muted-foreground",
					)}
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.4"
						stroke-linecap="round"
						stroke-linejoin="round"
						aria-hidden="true"
					>
						<path d="M12 19V5M5 12l7-7 7 7" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
