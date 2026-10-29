<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type HeroSectionVariant, heroSection } from "../variants";
import { setHeroSection } from "./context";

let {
	variant = "centered",
	class: className,
	children,
	...rest
}: HTMLAttributes<HTMLElement> & {
	/** `centered` stacks copy over the media; `split` sets them side by side. */
	variant?: HeroSectionVariant;
	children?: Snippet;
} = $props();

const titleId = $props.id();
const styles = $derived(heroSection({ variant }));
setHeroSection({
	get variant() {
		return variant;
	},
	titleId,
	get styles() {
		return styles;
	},
});
</script>

<!-- HeroSectionContent, then an optional HeroSectionMedia below it, or beside it in split. -->
<section
	data-slot="hero-section"
	data-variant={variant}
	aria-labelledby={titleId}
	{...rest}
	class={cn(styles.root(), className)}
>
	<div class={styles.inner()}>{@render children?.()}</div>
</section>
