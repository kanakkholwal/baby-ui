<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAccordion, setAccordionItem } from "./context";

let {
	children,
	value,
	disabled = false,
	class: classProp,
	...rest
}: { children?: Snippet; value: string; disabled?: boolean; class?: string } & Omit<
	HTMLAttributes<HTMLDivElement>,
	"children"
> = $props();

const accordion = getAccordion();
const id = $props.id();
const open = $derived(accordion.isOpen(value));

setAccordionItem({
	get value() {
		return value;
	},
	get open() {
		return open;
	},
	get disabled() {
		return disabled;
	},
	triggerId: `${id}-trigger`,
	contentId: `${id}-content`,
});
</script>

<div
	{...rest}
	data-slot="accordion-item"
	data-state={open ? "open" : "closed"}
	data-disabled={disabled || undefined}
	class={cn(classProp)}
>
	{@render children?.()}
</div>
