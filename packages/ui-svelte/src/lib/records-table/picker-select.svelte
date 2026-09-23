<script lang="ts">
import type { Snippet } from "svelte";
import Select from "../select/select.svelte";
import SelectContent from "../select/select-content.svelte";
import SelectItem from "../select/select-item.svelte";
import SelectTrigger from "../select/select-trigger.svelte";
import SelectValue from "../select/select-value.svelte";

let {
	value,
	options,
	onChange,
	icon,
	iconClass = "text-muted-foreground",
	itemIcon,
}: {
	value: string;
	options: { value: string; label: string }[];
	onChange: (value: string) => void;
	icon?: Snippet;
	iconClass?: string;
	itemIcon?: Snippet<[string]>;
} = $props();
</script>

<Select bind:value={() => value, onChange} items={options}>
	<SelectTrigger
		class="h-7 w-auto min-w-0 gap-1.5 border-none bg-transparent px-1.5 font-medium text-[13px] text-foreground hover:bg-foreground/[0.06]"
	>
		{#if icon}<span class={iconClass}>{@render icon()}</span>{/if}
		<SelectValue />
	</SelectTrigger>
	<SelectContent align="start">
		{#each options as option (option.value)}
			<SelectItem value={option.value}>
				<span class="flex items-center gap-1.5">
					{#if itemIcon}{@render itemIcon(option.value)}{/if}
					{option.label}
				</span>
			</SelectItem>
		{/each}
	</SelectContent>
</Select>
