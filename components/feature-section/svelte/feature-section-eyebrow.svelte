<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLParagraphElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<!-- A short kicker above the title. -->
<p
	data-slot="feature-section-eyebrow"
	{...rest}
	class={cn(section.styles.eyebrow(), classProp)}
>
	{@render children?.()}
</p>
