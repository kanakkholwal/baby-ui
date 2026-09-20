<script lang="ts">
import { cn } from "../lib/cn";

export type QuestionOption = { id: string; label: string };

let {
	question,
	options,
	answered = $bindable(false),
	multiple = false,
	class: classProp,
	onanswer,
}: {
	question: string;
	options: QuestionOption[];
	answered?: boolean;
	multiple?: boolean;
	class?: string;
	onanswer?: (ids: string[]) => void;
} = $props();

const id = $props.id();
let picked = $state<string[]>([]);

function toggle(optionId: string) {
	if (answered) return;
	if (!multiple) {
		picked = [optionId];
		answered = true;
		onanswer?.(picked);
		return;
	}
	picked = picked.includes(optionId)
		? picked.filter((p) => p !== optionId)
		: [...picked, optionId];
}
</script>

<div
	class={cn("flex flex-col gap-3 rounded-xl border border-border bg-card p-4", classProp)}
>
	<p {id} class="font-medium text-foreground text-sm">{question}</p>

	<div role="group" aria-labelledby={id} class="flex flex-wrap gap-2">
		{#each options as option (option.id)}
			<button
				type="button"
				aria-pressed={picked.includes(option.id)}
				disabled={answered && !picked.includes(option.id)}
				onclick={() => toggle(option.id)}
				class={cn(
					"inline-flex h-8 items-center rounded-lg border border-border px-3 text-sm transition-colors",
					"hover:bg-foreground/[0.06] disabled:pointer-events-none disabled:opacity-40",
					"aria-pressed:border-border-strong aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground",
				)}
			>
				{option.label}
			</button>
		{/each}
	</div>

	{#if multiple && !answered}
		<button
			type="button"
			disabled={picked.length === 0}
			onclick={() => {
				answered = true;
				onanswer?.(picked);
			}}
			class="self-start rounded-lg bg-primary px-3 py-1.5 font-medium text-primary-foreground text-xs disabled:opacity-40"
		>
			Submit
		</button>
	{/if}

	<span role="status" class="sr-only">{answered ? "Answer recorded" : ""}</span>
</div>
