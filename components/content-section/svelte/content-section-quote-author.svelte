<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { contentSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & { children?: Snippet } = $props();
const section = contentSectionState();
</script>

<!-- svelte-ignore a11y_figcaption_parent -- composed under ContentSectionQuote's figure -->
<figcaption
	data-slot="content-section-quote-author"
	{...rest}
	class={cn(section.styles.quoteAuthor(), classProp)}
>
	{@render children?.()}
</figcaption>
