<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type ContactSectionVariant, contactSection } from "../variants";
import { setContactSection } from "./context";

let {
	variant = "split",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** `split` sets the form beside the copy; `stacked` centres everything in one column. */
	variant?: ContactSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const formTitleId = `${titleId}-form`;
const styles = $derived(contactSection({ variant }));
setContactSection({
	titleId,
	formTitleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- ContactSectionHeader, ContactSectionChannels, and a ContactSectionForm with your fields. -->
<section
	data-slot="contact-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
