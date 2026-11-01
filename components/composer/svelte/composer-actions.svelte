<script lang="ts">
import { button } from "../../button/variants";
import DropdownMenu from "../../dropdown-menu/svelte/dropdown-menu.svelte";
import DropdownMenuContent from "../../dropdown-menu/svelte/dropdown-menu-content.svelte";
import DropdownMenuItem from "../../dropdown-menu/svelte/dropdown-menu-item.svelte";
import DropdownMenuTrigger from "../../dropdown-menu/svelte/dropdown-menu-trigger.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";
import type { ComposerAction } from "./types";

let {
	actions,
	onAction,
	label = "Add to prompt",
	class: classProp,
}: {
	actions: ComposerAction[];
	onAction: (value: string) => void;
	/** Names the plus button. */
	label?: string;
	class?: string;
} = $props();
const ctx = composerState("ComposerActions");
let open = $state(false);
</script>

<!-- A plus button that opens a menu of things to add, such as a file or an image. -->
<DropdownMenu bind:open>
	<DropdownMenuTrigger aria-label={label} disabled={ctx.disabled || ctx.loading} class={cn(button({ variant: "ghost", size: "icon-sm" }), ctx.styles.actionsTrigger(), classProp)}>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
		</svg>
	</DropdownMenuTrigger>
	<DropdownMenuContent side="top" align="start" class="w-56">
		{#each actions as action (action.value)}
			<DropdownMenuItem
				disabled={action.disabled}
				onclick={() => {
					onAction(action.value);
					open = false;
				}}
				class="items-start gap-2.5 py-2"
			>
				{#if action.icon}<span class={ctx.styles.actionIcon()}>{@render action.icon()}</span>{/if}
				<span class="min-w-0">
					<span class="block text-foreground text-sm">{action.label}</span>
					{#if action.description}<span class="mt-0.5 block text-muted-foreground text-xs leading-4">{action.description}</span>{/if}
				</span>
			</DropdownMenuItem>
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
