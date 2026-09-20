<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import MessageActions from "./message-actions.svelte";

let {
	children,
	role = "assistant",
	name = "Assistant",
	pending = false,
	showActions = true,
	class: classProp,
}: {
	children?: Snippet;
	role?: "user" | "assistant";
	name?: string;
	pending?: boolean;
	showActions?: boolean;
	class?: string;
} = $props();

const isUser = $derived(role === "user");
const initials = $derived(
	name
		.trim()
		.split(/\s+/)
		.slice(0, 2)
		.map((w) => w[0] ?? "")
		.join("")
		.toUpperCase(),
);
</script>

<article
	aria-label="{name} said"
	class={cn("group/message flex w-full gap-3", isUser && "flex-row-reverse", classProp)}
>
	<span
		aria-hidden="true"
		class="grid size-7 shrink-0 place-items-center rounded-full bg-card font-medium text-[11px] text-muted-foreground"
	>
		{initials}
	</span>

	<div class={cn("flex min-w-0 max-w-[85%] flex-col gap-1.5", isUser && "items-end")}>
		<div
			class={cn(
				"rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
				isUser
					? "rounded-tr-sm bg-primary text-primary-foreground"
					: "rounded-tl-sm border border-border bg-card text-foreground",
			)}
		>
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

		{#if showActions && !pending && !isUser}
			<MessageActions />
		{/if}
	</div>
</article>
