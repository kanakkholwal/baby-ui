<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import {
	type MessageLayout,
	type MessageMotion,
	type MessageTone,
	message,
} from "./variants";

let {
	children,
	align = "start",
	name = "Assistant",
	pending = false,
	showActions = true,
	onRetry,
	tone = "surface",
	layout = "default",
	motion = "none",
	class: classProp,
	bubbleClass,
}: {
	children?: Snippet;
	align?: "start" | "end";
	name?: string;
	pending?: boolean;
	showActions?: boolean;
	onRetry?: () => void;
	tone?: MessageTone;
	layout?: MessageLayout;
	motion?: MessageMotion;
	class?: string;
	bubbleClass?: string;
} = $props();

const isEnd = $derived(align === "end");
const compact = $derived(layout === "compact");
const initials = $derived(
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase(),
);
const slots = $derived(message({ tone, layout, motion }));

let bubbleEl = $state<HTMLDivElement>();
let copied = $state(false);
let copyFailed = $state(false);

async function copyText() {
	try {
		await navigator.clipboard.writeText(bubbleEl?.textContent?.trim() ?? "");
		copied = true;
	} catch {
		// Clipboard access can be denied outside a secure context; say so rather than doing nothing.
		copyFailed = true;
	}
	setTimeout(() => {
		copied = false;
		copyFailed = false;
	}, 1500);
}
</script>

<article
	aria-label="{name} said"
	class={cn(
		slots.root(),
		isEnd && (compact ? "justify-end" : "flex-row-reverse"),
		classProp,
	)}
>
	{#if !compact}
		<span
			aria-hidden="true"
			class="grid size-7 shrink-0 place-items-center rounded-full bg-card font-medium text-[11px] text-muted-foreground"
		>
			{initials}
		</span>
	{/if}

	<div class={cn(slots.stack(), isEnd && "items-end")}>
		<div bind:this={bubbleEl} class={cn(slots.bubble(), bubbleClass)}>
			{#if pending}
				<span role="status" class="flex items-center gap-1 py-1">
					<span class="sr-only">Thinking</span>
					{#each [0, 1, 2] as dot (dot)}
						<span
							class="typing-dot size-1.5 rounded-full bg-current opacity-40"
							style:animation-delay="{dot * 160}ms"
						></span>
					{/each}
				</span>
			{:else}
				{@render children?.()}
			{/if}
		</div>

		{#if showActions && !pending && !compact}
			<div
				class="flex items-center gap-0.5 opacity-0 transition-opacity duration-150 group-focus-within/message:opacity-100 group-hover/message:opacity-100 motion-reduce:transition-none"
			>
				<button
					type="button"
					onclick={copyText}
					aria-label={copied ? "Copied" : copyFailed ? "Press Ctrl+C" : "Copy message"}
					class="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
				>
					{#if copied}
						<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
							<path d="M3.5 8.4 6.4 11 12.5 4.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					{:else}
						<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
							<rect x="5.5" y="5.5" width="8" height="8" rx="1.8" stroke="currentColor" stroke-width="1.3" />
							<path d="M10.5 2.5H3.6A1.6 1.6 0 0 0 2 4.1V11" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
						</svg>
					{/if}
				</button>
				{#if onRetry}
					<button
						type="button"
						onclick={onRetry}
						aria-label="Retry"
						class="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
					>
						<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
							<path d="M13 8a5 5 0 1 1-1.6-3.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
							<path d="M13 2.5V5h-2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				{/if}
			</div>
		{/if}
	</div>
</article>
