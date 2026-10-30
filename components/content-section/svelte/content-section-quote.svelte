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

<!-- A pull quote inside the body: ContentSectionQuoteText then ContentSectionQuoteAuthor. -->
<figure data-slot="content-section-quote" {...rest} class={cn(section.styles.quote(), classProp)}>
	{@render children?.()}
</figure>
