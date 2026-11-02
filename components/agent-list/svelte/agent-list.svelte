<script lang="ts">
import { Accordion as AccordionPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { type AgentListVariant, agentList } from "../variants";
import { setAgentList } from "./context";

let {
	value,
	onValueChange,
	variant = "framed",
	class: classProp,
	children,
}: {
	/** The agent whose steps are open; null folds every row. */
	value: string | null;
	onValueChange?: (value: string | null) => void;
	variant?: AgentListVariant;
	class?: string;
	children?: Snippet;
} = $props();

const styles = $derived(agentList({ variant }));
setAgentList({
	get styles() {
		return styles;
	},
});
</script>

<!-- The root: background agents as rows, one open to its steps. -->
<AccordionPrimitive.Root
	type="single"
	bind:value={() => value ?? "", (next) => onValueChange?.(next || null)}
>
	{#snippet child({ props })}
		<section {...props} data-slot="agent-list" data-variant={variant} class={cn(styles.root(), classProp)}>
			{@render children?.()}
		</section>
	{/snippet}
</AccordionPrimitive.Root>
