<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { type HeroSectionMediaVariant, heroSectionMedia } from "../variants";
import { heroSectionState } from "./context";

let {
	variant = "framed",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	/** `plain` as is, `framed` in a rim that fades out, `tilted` skewed over a plate. */
	variant?: HeroSectionMediaVariant;
	children?: Snippet;
} = $props();
const hero = heroSectionState();
const styles = $derived(heroSectionMedia({ variant, layout: hero.variant }));
</script>

<!-- The product shot; put an `<img>` or any visual inside. -->
<div
	data-slot="hero-section-media"
	data-variant={variant}
	{...rest}
	class={cn(styles.root(), classProp)}
>
	<div aria-hidden="true" class={styles.plate()}></div>
	<div class={styles.frame()}>{@render children?.()}</div>
</div>
