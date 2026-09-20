<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCommand } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const command = getCommand();
let el = $state<HTMLDivElement>();

$effect(() => {
	command.setList(el);
	return () => command.setList(undefined);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<div
	{...rest}
	bind:this={el}
	id={command.listId}
	role="listbox"
	data-slot="command-list"
	class={cn("scroll-area min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5", classProp)}
>
	{@render children?.()}
</div>
