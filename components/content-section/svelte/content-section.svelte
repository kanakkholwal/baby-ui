<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ContentSectionVariant, contentSection } from "../variants";
import { setContentSection } from "./context";

let {
	variant = "split",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** `split` sets media beside the prose; `stacked` centres the prose over full-width media. */
	variant?: ContentSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(contentSection({ variant }));
setContentSection({
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- ContentSectionTitle, ContentSectionMedia and a ContentSectionBody with an optional quote. -->
<section
	data-slot="content-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
