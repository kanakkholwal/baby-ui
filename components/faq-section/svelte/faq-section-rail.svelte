<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { faqSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & { children?: Snippet } = $props();
const faq = faqSectionState();
</script>

<!-- The side column in columns and split: header, contact and, in columns, FaqSectionTopics. -->
<div data-slot="faq-section-rail" {...rest} class={cn(faq.styles.rail(), classProp)}>
	{@render children?.()}
</div>
