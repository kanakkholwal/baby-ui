<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type FeatureSectionVariant, featureSection } from "../variants";
import { setFeatureSection } from "./context";

let {
	variant = "cards",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** `cards`, ruled `divided` cells, open `plain` columns, or a `split` list beside media. */
	variant?: FeatureSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(featureSection({ variant }));
setFeatureSection({
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- FeatureSectionHeader, a FeatureSectionList of items, and in split a FeatureSectionMedia. -->
<section
	data-slot="feature-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
