<script lang="ts">
import type { Snippet } from "svelte";
import { button } from "../../button/variants";
import DropdownMenu from "../../dropdown-menu/svelte/dropdown-menu.svelte";
import DropdownMenuContent from "../../dropdown-menu/svelte/dropdown-menu-content.svelte";
import DropdownMenuTrigger from "../../dropdown-menu/svelte/dropdown-menu-trigger.svelte";
import { cn } from "../../lib/cn";
import { composerState } from "./context";

let {
	open = $bindable(false),
	label = "Add to prompt",
	class: classProp,
	children,
}: {
	open?: boolean;
	/** Names the plus button. */
	label?: string;
	class?: string;
	children?: Snippet;
} = $props();
const ctx = composerState("ComposerActions");
</script>

<!-- The plus button and the menu behind it. Fill it with ComposerMenuLabel and ComposerMenuItem rows. -->
<DropdownMenu bind:open>
	<DropdownMenuTrigger data-composer="actions" aria-label={label} disabled={ctx.disabled || ctx.loading} class={cn(button({ variant: "ghost", size: "icon-sm" }), ctx.styles.actionsTrigger(), classProp)}>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
			<path d="M8 3.5v9M3.5 8h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
		</svg>
	</DropdownMenuTrigger>
	<DropdownMenuContent side="top" align="start" size="sm" class={ctx.styles.menu()}>
		{@render children?.()}
	</DropdownMenuContent>
</DropdownMenu>
