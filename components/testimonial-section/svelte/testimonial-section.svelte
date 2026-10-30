<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type TestimonialSectionVariant, testimonialSection } from "../variants";
import { setTestimonialSection } from "./context";

let {
	variant = "masonry",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** A `masonry` wall of columns, or a `bento` grid where a featured quote spans 2x2. */
	variant?: TestimonialSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(testimonialSection({ variant }));
setTestimonialSection({
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- TestimonialSectionHeader, then a TestimonialSectionList of items, each holding a Testimonial. -->
<section
	data-slot="testimonial-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
