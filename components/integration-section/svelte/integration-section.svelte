<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type IntegrationSectionVariant, integrationSection } from "../variants";
import { setIntegrationSection } from "./context";

let {
	variant = "grid",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** A `grid` of cards, or a `cluster` of logo tiles above the header. */
	variant?: IntegrationSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(integrationSection({ variant }));
setIntegrationSection({
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- IntegrationSectionHeader and an IntegrationSectionList of items. -->
<section
	data-slot="integration-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
