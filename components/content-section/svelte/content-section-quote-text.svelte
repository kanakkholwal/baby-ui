<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLBlockquoteAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contentSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLBlockquoteAttributes & { children?: Snippet } = $props();
const section = contentSectionState();
</script>

<blockquote
	data-slot="content-section-quote-text"
	{...rest}
	class={cn(section.styles.quoteText(), classProp)}
>
	{@render children?.()}
</blockquote>
