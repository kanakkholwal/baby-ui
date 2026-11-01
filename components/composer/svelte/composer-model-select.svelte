<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../../lib/cn";
import Select from "../../select/svelte/select.svelte";
import SelectContent from "../../select/svelte/select-content.svelte";
import SelectItem from "../../select/svelte/select-item.svelte";
import SelectTrigger from "../../select/svelte/select-trigger.svelte";
import { composerState } from "./context";
import type { ComposerModel } from "./types";

let {
	models,
	model = $bindable(untrack(() => models[0]?.value ?? "")),
	onModelChange,
	class: classProp,
}: {
	models: ComposerModel[];
	/** The chosen model's value; bindable. */
	model?: string;
	onModelChange?: (model: string) => void;
	class?: string;
} = $props();
const ctx = composerState("ComposerModelSelect");
const option = $derived(models.find((m) => m.value === model));
</script>

<!-- The model picker; it locks while a reply is being written. -->
<Select
	bind:value={
		() => model,
		(next) => {
			model = next;
			onModelChange?.(next);
		}
	}
	items={models}
	disabled={ctx.disabled || ctx.loading}
>
	<SelectTrigger class={cn(ctx.styles.modelTrigger(), classProp)}>
		<span class="flex min-w-0 items-center gap-1.5">
			{#if option?.icon}<span class={ctx.styles.modelIcon()}>{@render option.icon()}</span>{/if}
			<span class="truncate text-muted-foreground">{option?.label ?? "Choose model"}</span>
		</span>
	</SelectTrigger>
	<SelectContent align="start" class="w-52">
		{#each models as m (m.value)}
			<SelectItem value={m.value} disabled={m.disabled} class="py-2">
				<span class="flex min-w-0 items-center gap-2">
					{#if m.icon}<span class={ctx.styles.actionIcon()}>{@render m.icon()}</span>{/if}
					<span class="min-w-0 truncate text-foreground text-sm">{m.label}</span>
				</span>
			</SelectItem>
		{/each}
	</SelectContent>
</Select>
