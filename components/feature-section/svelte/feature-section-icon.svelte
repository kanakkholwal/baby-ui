<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { featureSectionState } from "./context";

let {
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLSpanElement> & { children?: Snippet } = $props();
const section = featureSectionState();
</script>

<!-- The item's glyph; pass an inline `<svg>`. -->
<span
	data-slot="feature-section-icon"
	aria-hidden="true"
	{...rest}
	class={cn(section.styles.icon(), classProp)}
>
	<span class={section.styles.iconTile()}>{@render children?.()}</span>
</span>
